<?php

@header("Content-Type:text/json;charset=utf-8");

@require_once("conn.php");   // 在一个php中引入另一个php
@require_once("common.php");   // 在一个php中引入另一个php


// 获取前端接收的参数
if (!(isset($_POST["user"]) && isset($_POST["pwd"]) && isset($_POST["phone"]) && isset($_POST["email"]))) {
    paramsError();
}


// 必选
$user = $_POST["user"];
$pwd = $_POST["pwd"];
$phone = $_POST["phone"];
$email = $_POST["email"];

// 注册之前 再次验证 用户名,手机号 邮箱是否存在
$msg = array();

if (isExistUser($user)) {
    $msg["status"] = false;
    $msg["message"] = "该用户已被注册!";
} else if (isExistPhone($phone)) {
    $msg["status"] = false;
    $msg["message"] = "该手机号已被注册!";
} else if (isExistEmail($email)) {
    $msg["status"] = false;
    $msg["message"] = "该邮箱已被注册!";
} else {  // 用户名,手机号 邮箱 都不存在
    // 注册
    // mysqli_query()   
    //   查询:  成功 => 查询的结果对象(mysqli_result)  失败=>false
    // 增删改:  成功 => true(语句执行成功)  失败 =>false

    $sql = "insert into `userinfo`(user,pwd,phone,email) value('$user','$pwd','$phone','$email')";

    $result = mysqli_query($conn, $sql);
    // echo $result;

    if ($result) {  // $result  == true 成功  (语句执行成功(rows>0) => 有可能存在语句执行成功但是对数据库没有影响的情况 rows==0)

        $rows = mysqli_affected_rows($conn); // 返回受影响的行数
        // $rows > 0   增删改成功 
        // $rows == 0  语句执行成功,但是对表没有影响(新增没有此选项)
        // $rows == -1 语句执行失败(sql语句有误) 

        if ($rows > 0) {
            $msg["status"] = true;
            $msg["message"] = "注册成功";
        } else {
            $msg["status"] = false;
            $msg["message"] = "注册成功,数据未改变";
        }
    } else {
        $msg["status"] = false;
        $msg["message"] = "sql语句有误";
        $msg["sql"] = $sql;
    }
}

echo json_encode($msg);

<?php
@header("Content-Type:text/html;charset=utf-8");

@require_once("conn.php");
@require_once("./common.php");


// 更新 => 更新之前需要判断数据是否存在

// 对应字段名接收 =>前端

if (!(isset($_POST["id"]) && isset($_POST["ch"]) && isset($_POST["mh"]) && isset($_POST["eh"]))) {
    paramsError();
}

$id = $_POST["id"];
$ch = $_POST["ch"];
$mh = $_POST["mh"];
$eh = $_POST["eh"];

$sql = "update `grade` set chinese = $ch,math=$mh,english=$eh where id = $id";

$result = mysqli_query($conn, $sql);


if ($result) {  // $result  == true 成功  (语句执行成功(rows>0) => 有可能存在语句执行成功但是对数据库没有影响的情况 rows==0)

    $rows = mysqli_affected_rows($conn); // 返回受影响的行数
    // $rows > 0   增删改成功 
    // $rows == 0  语句执行成功,但是对表没有影响(新增没有此选项)
    // $rows == -1 语句执行失败(sql语句有误) 

    if ($rows > 0) {
        $msg["status"] = true;
        $msg["message"] = "更新成功";
    } else {
        $msg["status"] = true;
        $msg["message"] = "更新成功,数据未改变!";
    }
} else {
    $msg["status"] = false;
    $msg["message"] = "sql语句有误";
    $msg["sql"] = $sql;
}

echo json_encode($msg);

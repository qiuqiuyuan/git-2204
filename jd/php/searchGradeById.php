<?php
@header("Content-Type:text/html;charset=utf-8");

@require_once("conn.php");   // 在一个php中引入另一个php

// 接收前端传来的参数

// $user = $_GET["user"];  // 接收数据  (不严谨 => 对于必填参数 判断是否存在  => isset())

// isset($_GET["user"])   // 确定是否声明了一个变量并且与NULL不同  有值 => true 否则 => false;


if (!isset($_GET["id"])) { //如果没有接收到user  !isset($_GET["user"]) == true
    $msg = array();
    $msg["status"] = false;
    $msg["message"] = "请传入完整参数";
    exit(json_encode($msg));
}


$id = $_GET["id"]; // 有字段id =>再接收




// 查询  
// mysqli_query($conn, $sql)   => 查询成功:结果对象(mysqli_result =>指针对象 =>需要解析)  失败(sql语句有误) => false

$sql = "select id,user,class,chinese,math,english,chinese + math + english as total from `grade`  where id = '$id'";
$result = mysqli_query($conn, $sql);

// print_r($result);
// echo $result->num_rows; // 查询的数据的数量

$msg = array();
if ($result) {  // 成功  结果对象



    $item = mysqli_fetch_assoc($result);  //当前仅有一条数据  => 解析成
    // print_r($item);

    // 数据预处理  
    $item["chinese"] = $item["chinese"] * 1;
    $item["math"] = $item["math"] * 1;
    $item["english"] = $item["english"] * 1;
    $item["total"] = $item["total"] * 1;


    if ($item) {
        $msg["status"] = true;
        $msg["message"] = "OK";
        $msg["data"] = $item;
    } else {
        $msg["status"] = false;
        $msg["message"] = "查询数据不存在";
    }
} else {
    $msg["status"] = false;
    $msg["message"] = "sql语句有误";
    $msg["sql"] = $sql;
}

echo json_encode($msg);

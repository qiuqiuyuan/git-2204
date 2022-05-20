<?php
@header("Content-Type:text/html;charset=utf-8");

@require_once("conn.php");   // 在一个php中引入另一个php


// 查询
// 单数据 => 直接解析
// 多数据 => 循环解析,创建新的集合存放数据



// 接收前端传来的参数

// 查询  
// mysqli_query($conn, $sql)   => 查询成功:结果对象(mysqli_result =>指针对象 =>需要解析)  失败(sql语句有误) => false

$sql = "select id,user,class,chinese,math,english,chinese + math + english as total from `grade`";
$result = mysqli_query($conn, $sql);

// print_r($result);   // {num_rows:83}
// echo $result->num_rows; // 查询的数据的数量

$msg = array();
if ($result) {  // 成功  结果对象

    $list = array();
    while ($item = mysqli_fetch_assoc($result)) {  // 将解析的结果赋值给 $item => 成功(数据) 失败=>null

        // 数据预处理  
        $item["chinese"] = $item["chinese"] * 1;
        $item["math"] = $item["math"] * 1;
        $item["english"] = $item["english"] * 1;
        $item["total"] = $item["total"] * 1;

        array_push($list, $item);
    }


    if (count(($list)) > 0) {
        $msg["status"] = true;
        $msg["message"] = "OK";
        $msg["list"] = $list;
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

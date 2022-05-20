<?php
@header("Content-Type:text/html;charset=utf-8");

@require_once("conn.php");   // 在一个php中引入另一个php
@require_once("common.php");



if (!(isset($_GET["wd"]) && isset($_GET["col"]) && isset($_GET["type"]))) {
    paramsError();
}

// 1. 模糊查询  =>  接收前端传入的搜索关键词
$wd = $_GET["wd"];   // 接收搜索的关键词
$col = $_GET["col"];  // 接收排序的列名 (id,chinese math english)
$type = $_GET["type"]; // 接收排序的方式 (asc desc)

$sql = "select id,user,class,chinese,math,english,chinese + math + english as total from `grade` where user like '%$wd%' order by $col $type";
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

    $msg["status"] = true;
    $msg["message"] = "OK";
    $msg["list"] = $list;
} else {
    $msg["status"] = false;
    $msg["message"] = "sql语句有误";
    $msg["sql"] = $sql;
}

echo json_encode($msg);

<?php
@header("Content-Type:text/html;charset=utf-8");

@require_once("conn.php");   // 在一个php中引入另一个php
@require_once("common.php");



if (!(isset($_GET["wd"]) && isset($_GET["col"]) && isset($_GET["type"]) && isset($_GET["page"]) && isset($_GET["size"]))) {
    paramsError();
}

// 1. 模糊查询  =>  接收前端传入的搜索关键词
$wd = $_GET["wd"];   // 接收搜索的关键词
$col = $_GET["col"];  // 接收排序的列名 (id,chinese math english)
$type = $_GET["type"]; // 接收排序的方式 (asc desc)
$page = $_GET["page"]; // 接收 页码 (限制范围  最小值:1  最大值: 总数据/showNum => 向上取值)
$size = $_GET["size"]; // 接收 每页显示多少条  



// 后端分页   pageIndex = 页码    showNum = 10;
// 第1页   limit showNum*0,showNum   => [1,10]
// 第2页   limit showNum*1,showNum   => [10,10]
// 第3页   limit showNum*2,showNum   => [20,10]
// 第4页   limit showNum*3,showNum   => [30,10]
// pageIndex     limit showNum*(pageIndex-1),showNum


// 页码 (限制范围  最小值:1  最大值: 满足条件总数据/showNum => 向上取值)

// 获取 满足条件的数据
$sql = "select id,user,class,chinese,math,english,chinese + math + english as total from `grade` where user like '%$wd%' order by $col $type";

$resAll =  mysqli_query($conn, $sql);

if ($resAll) {
    $total = $resAll->num_rows;
    $maxPage = ceil($total / $size); // 0

    // 页码限制
    if ($page > $maxPage) $page = $maxPage;
    if ($page < 1) $page = 1;


    $skip = $size * ($page - 1);

    $sql = "select id,user,class,chinese,math,english,chinese + math + english as total from `grade` where user like '%$wd%' order by $col $type limit $skip,$size";
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

        // 前端分页展示时需要  => 给它
        $msg["maxPage"] = $maxPage;  //最大页
        $msg["total"] = $total;  //总数据
        $msg["current"] = $page;  // 当前页

        $msg["list"] = $list;
    } else {
        $msg["status"] = false;
        $msg["message"] = "sql语句有误";
        $msg["sql"] = $sql;
    }
} else {
    $msg["status"] = false;
    $msg["message"] = "sql语句有误";
    $msg["sql"] = $sql;
}





echo json_encode($msg);

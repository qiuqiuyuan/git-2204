<?php
@header("Content-Type:text/html;charset=utf-8");

@require_once("conn.php");   // 在一个php中引入另一个php
@require_once("common.php");


if (!isset($_GET["email"])) { //如果没有接收到email  !isset($_GET["email"]) == true
    paramsError();
}


$email = $_GET["email"]; // 有字段email =>再接收


$sql = "select * from `userinfo` where email = '$email'";
$result = mysqli_query($conn, $sql);


$msg = array();
if ($result) {  // 成功  结果对象
    $item = mysqli_fetch_assoc($result);  //当前仅有一条数据  => 解析成
    if (!$item) { // 没有该数据
        $msg["status"] = true;
        $msg["message"] = "可以使用的邮箱!";
    } else { // 有该数据
        $msg["status"] = false;
        $msg["message"] = "该邮箱已被注册!";
    }
} else {
    $msg["status"] = false;
    $msg["message"] = "sql语句有误";
    $msg["sql"] = $sql;
}

echo json_encode($msg);

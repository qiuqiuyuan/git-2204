<?php
@header("Content-Type:text/html;charset=utf-8");

@require_once("conn.php");   // 在一个php中引入另一个php
@require_once("common.php");


if (!(isset($_POST["user"]) && isset($_POST["pwd"]))) {
    paramsError();
}




// 接收  前端传入的用户名和密码
// $user = "a123123";
// $pwd = "1231231";

$user = $_POST["user"]; // 有字段user =>再接收
$pwd = $_POST["pwd"]; // 有字段user =>再接收



$sql = "select * from `userinfo` where user = '$user'";
$result = mysqli_query($conn, $sql);


$msg = array();
if ($result) {  // 成功  结果对象
    $item = mysqli_fetch_assoc($result);  //当前仅有一条数据  => 解析成
    if ($item) { // 没有该数据
        $realPwd = $item["pwd"];
        if ($pwd == $realPwd) {
            $msg["status"] = true;
            $msg["message"] = "登录成功!";
        } else {
            $msg["status"] = false;
            $msg["message"] = "用户名或密码有误!";
        }
    } else { // 有该数据
        $msg["status"] = false;
        $msg["message"] = "该用户未注册!";
    }
} else {
    $msg["status"] = false;
    $msg["message"] = "sql语句有误";
    $msg["sql"] = $sql;
}

echo json_encode($msg);

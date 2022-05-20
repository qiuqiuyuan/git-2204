<?php
@header("Content-Type:text/html;charset=utf-8");


@require_once("conn.php");   // 在一个php中引入另一个php
@require_once("common.php");   // 在一个php中引入另一个php




// 获取前端接收的参数
if (!(isset($_GET["user"]) && isset($_GET["pwd"]) && isset($_GET["phone"]) && isset($_GET["email"]))) {
    paramsError();
}


// 必选
$user = $_GET["user"];
$pwd = $_GET["pwd"];
$phone = $_GET["phone"];
$email = $_GET["email"];







// 注册
// mysqli_query()   
//   查询:  成功 => 查询的结果对象(mysqli_result)  失败=>false
// 增删改:  成功 => true(语句执行成功)  失败 =>false

$sql = "insert into `userinfo`(user,pwd,phone,email) value('$user','$pwd','$phone','$email')";

$result = mysqli_query($conn, $sql);

// echo $result;
$msg = array();
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

echo json_encode($msg);

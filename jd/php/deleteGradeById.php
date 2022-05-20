<?php
@header("Content-Type:text/html;charset=utf-8");

@require_once("conn.php");
@require_once("common.php");

if (!isset($_GET["id"])) {
    paramsError();
}

$id = $_GET["id"]; // // 对应字段id,接收数据  (如果传入多个,用逗号分隔)

// $sql = "delete from `grade` where id = 85"; // 单删
// $sql = "delete from `grade` where id in (85,86,87)"; // 多删 (多个用逗号分隔)
$sql = "delete from `grade` where id in ($id)"; // 多删 (多个用逗号分隔)

$result = mysqli_query($conn, $sql);


if ($result) {  // $result  == true 成功  (语句执行成功(rows>0) => 有可能存在语句执行成功但是对数据库没有影响的情况 rows==0)

    $rows = mysqli_affected_rows($conn); // 返回受影响的行数
    // $rows > 0   增删改成功 
    // $rows == 0  语句执行成功,但是对表没有影响(新增没有此选项)
    // $rows == -1 语句执行失败(sql语句有误) 

    if ($rows > 0) {
        $msg["status"] = true;
        $msg["message"] = "删除成功";
    } else {
        $msg["status"] = false;
        $msg["message"] = "删除失败,数据不存在!";
    }
} else {
    $msg["status"] = false;
    $msg["message"] = "sql语句有误";
    $msg["sql"] = $sql;
}

echo json_encode($msg);

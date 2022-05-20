<?php

@require_once("conn.php");
/**
 * 
 * paramsError  
 * 参数有误是报错
 * 
 * @param $status  参数错误时指定的状态
 * @param $tips    提示信息
 * @param $list    如果需要附加额外信息,传入一个关联数组
 * 
 */

function paramsError($status = false, $tips = "请传入完整参数", $list = [])
{
    $msg = array();
    $msg["status"] = $status;
    $msg["message"] = $tips;

    if ($list) {
        foreach ($list as $key => $val) {
            $msg[$key] = $val;
        }
    }

    exit(json_encode($msg));
}




function isExistUser($user)
{
    global $conn;
    $sql = "select * from `userinfo` where user = '$user'";
    $result = mysqli_query($conn, $sql);


    $msg = array();
    if ($result) {  // 成功  结果对象
        $item = mysqli_fetch_assoc($result);  //当前仅有一条数据  => 解析成
        if ($item) {
            return true;
        }
    }
    return false;
}

function isExistPhone($phone)
{
    global $conn;
    $sql = "select * from `userinfo` where phone = '$phone'";
    $result = mysqli_query($conn, $sql);


    $msg = array();
    if ($result) {  // 成功  结果对象
        $item = mysqli_fetch_assoc($result);  //当前仅有一条数据  => 解析成
        if ($item) {
            return true;
        }
    }
    return false;
}

function isExistEmail($email)
{
    global $conn;
    $sql = "select * from `userinfo` where email = '$email'";
    $result = mysqli_query($conn, $sql);


    $msg = array();
    if ($result) {  // 成功  结果对象
        $item = mysqli_fetch_assoc($result);  //当前仅有一条数据  => 解析成
        if ($item) {
            return true;
        }
    }
    return false;
}

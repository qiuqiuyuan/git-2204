<?php

const HOST = "localhost:3306";
const USER = "root";
const PASSWORD = "123456";
const DATABASE = "2115";

$conn = mysqli_connect(HOST, USER, PASSWORD, DATABASE);   // 链接mysql   => 成功:链接对象(mysqli对象) 失败

if (!$conn) {  // !$res == true  => $res = false
    exit("链接失败");
}



// 4. 转码设置   => 对数据库执行查询(执行sql语句)
mysqli_query($conn, "set names utf8"); // 从数据库取数据时  将编码转为utf-8;  
mysqli_query($conn, "set character set utf-8"); // 向数据库存数据时  将编码转为utf-8


// if (!($_SERVER['REMOTE_ADDR'] == "::1" || $_SERVER['REMOTE_ADDR'] == "192.168.1.161")) {
//     // die(message)   exit(message)   终止脚本执行(遇到此方法后面的代码就不执行了)
//     exit("你在干什么!!!");
// }

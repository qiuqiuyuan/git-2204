<?php
$conn=mysqli_connect("localhost:3306","root","123456","2204");
// mysqli_select_db($coon,"2204");

if (!($conn)) {  // !$res == true  => $res = false
    exit("链接失败");
}
//转码
// mysqli_query($conn,"set names utf8"); // 从数据库取数据时  将编码转为utf-8;  
// mysqli_query($conn,"set character set utf-8"); // 向数据库存数据时  将编码转为utf-8
?>
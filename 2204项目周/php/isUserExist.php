<?php

@header("Content-Type:text/html;charset=utf-8");

// @require_once("$common.php");

$conn=mysqli_connect("localhost:3306","root","123456","2204");
// // mysqli_select_db($coon,"2204");

// // $user="DHC";
// if (!$conn) {  // !$res == true  => $res = false
//     echo("链接失败");
// };

$user=$_GET["user"];



$res=[];
if($user){
	
$sql = "select * from `userinfor` where user = '$user'";
$result = mysqli_query($conn, $sql);

$item=mysqli_fetch_array($result);

if(!$item){
	$res["status"]=true;
	$res["msg"]="用户名可用";
}else{
	$res["status"]=false;
	$res["msg"]="用户名已存在";
}


}
// // var_dump($result);

// $res=[];
// if
// if($result){
// 	$item = mysqli_fetch_assoc($result);
// 	if(!$item){
// 		$res["status"]=true;
// 		$res["msg"]="用户名可以使用";
// 	}else{
// 		$res["status"]=false;
// 		$res["msg"]="用户名已存在";
// 	};
// }else{
// 	$res["status"]=false;
// 	$res["msg"]="sql语句出现错误";
	
// };



echo(json_encode($res));




?>
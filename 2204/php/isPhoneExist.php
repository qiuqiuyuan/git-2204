<?php

@header("Content-Type:text/html;charset=utf-8");
$conn=mysqli_connect("localhost:3306","root","123456","2204");


$phone=$_GET["phone"];
// $nickname=


// if (!(isset($_GET["nickname"]))) {
//     paramsError();
// }


$res=[];

if($phone){
	
$sql = "select * from `userinfor` where phone = '$phone'";
$result = mysqli_query($conn, $sql);
	 $item = mysqli_fetch_array($result);
	
	if(!$item){
		$res["status"]=true;
		$res["msg"]="手机号可用";
	}else{
		$res["status"]=false;
		$res["msg"]="手机号已存在";
	}
}
// var_dump($result);




echo(json_encode($res));




?>
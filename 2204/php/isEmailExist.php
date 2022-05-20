<?php

@header("Content-Type:text/html;charset=utf-8");
$conn=mysqli_connect("localhost:3306","root","123456","2204");


$email=$_GET["email"];
// $nickname=


// if (!(isset($_GET["nickname"]))) {
//     paramsError();
// }


$res=[];

if($email){
	
$sql = "select * from `userinfor` where email = '$email'";
$result = mysqli_query($conn, $sql);
	 $item = mysqli_fetch_array($result);
	
	if(!$item){
		$res["status"]=true;
		$res["msg"]="邮箱可用";
	}else{
		$res["status"]=false;
		$res["msg"]="邮箱已存在";
	}
}
// var_dump($result);




echo(json_encode($res));




?>
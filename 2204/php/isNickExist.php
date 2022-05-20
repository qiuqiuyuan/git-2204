<?php

@header("Content-Type:text/html;charset=utf-8");
$conn=mysqli_connect("localhost:3306","root","123456","2204");


$nickname=$_GET["nickname"];
// $nickname=


// if (!(isset($_GET["nickname"]))) {
//     paramsError();
// }


$res=[];

if($nickname){
	
$sql = "select * from `userinfor` where nickname = '$nickname'";
$result = mysqli_query($conn, $sql);
	 $item = mysqli_fetch_array($result);
	
	if(!$item){
		$res["status"]=true;
		$res["msg"]="昵称可用";
	}else{
		$res["status"]=false;
		$res["msg"]="昵称已存在";
	}
}
// var_dump($result);




echo(json_encode($res));




?>
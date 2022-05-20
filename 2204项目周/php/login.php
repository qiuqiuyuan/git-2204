<?php
$conn=mysqli_connect("localhost:3306","root","123456","2204");

if(!$conn){
	die("链接失败");
}



$user=$_POST["user"];
$pwd=$_POST["pwd"];

$sql="select * from `userinfor` where user='$user'";
$result=mysqli_query($conn,$sql);


$res=[];

if($result){
	
	$arr=mysqli_fetch_assoc($result);
	
	if($arr){
		$realpwd=$arr["pwd"];
		if($pwd===$realpwd){
			$res["status"]=true;
			$res["msg"]="密码正确";
		}else{
			$res["status"]=false;
			$res["msg"]="密码错误";
		}
	}else{
		$res["status"]=false;
		$res["msg"]="用户名不存在";
	}

}else{
	$res["status"]=false;
	$res["msg"]="sql语句有错误";
	$res["list"]=$sql;
}



echo(json_encode($res));



?>
<?php
$conn=mysqli_connect("localhost:3306","root","123456","2204");



// $user="a12312312";
// $newpwd="1231231";
$user=$_GET["user"];
$newpwd=$_GET["newpwd"];
$res=[];

$sql="update  `userinfor` set pwd ='$newpwd' where user = '$user'";
$data=mysqli_query($conn,$sql);
//得到结果集  转数组



if($data){
	
	$rows=mysqli_affected_rows($conn);//受影响的
     if($rows>0){
	$res["status"]=true;
	$res["msg"]="更新成功";
     }else{
	$res["status"]=false;
	$res["msg"]="更新失败";
      };
	
}else{
	$res["status"]=false;
	$res["msg"]="sql语句错误";
};

echo(json_encode($res));







?>
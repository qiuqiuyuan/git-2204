<?php
$conn=mysqli_connect("localhost:3306","root","123456","2204");



$id=$_GET["id"];
$res=[];

$sql="delete from `shoppingcar` where cartId = '$id'";
$data=mysqli_query($conn,$sql);
//得到结果集  转数组



if($data){
	$rows=mysqli_affected_rows($conn);//受影响的
	// $rows=mysqli_query($conn,);//受影响的
if($rows>0){
	$res["status"]=true;
	$res["msg"]="删除成功";
}else{
	$res["status"]=false;
	$res["msg"]="删除失败";
}
}else{
	$res["status"]=false;
	$res["msg"]="sql语句错误";
}
// $arr=mysqli_fetch_assoc($list);
echo(json_encode($res));







?>
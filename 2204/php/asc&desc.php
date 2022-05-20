<?php
$conn=mysqli_connect("localhost:3306","root","123456","2204");
$res=[];

$sort=$_GET["sort"];



$sql = "SELECT * from goodslist order by goodsPrice ${sort}" ;
$data=mysqli_query($conn,$sql);
//得到结果集  转数组
$list=[];
while($arr=mysqli_fetch_array($data)){
	array_push($list,$arr);
}
if($list){
	$res["status"]=true;
	$res["msg"]="数据请求成功";
	$res["list"]=$list;
}else{
	$res["status"]=false;
	$res["msg"]="数据库有错误";
}
// $arr=mysqli_fetch_assoc($list);
echo(json_encode($res));

?>
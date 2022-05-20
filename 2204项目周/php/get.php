<?php

//接收前端传来的数据

$uname=$_GET['aa'];
$pwd=$_GET['bb'];


$res=[];
if($uname&&$pwd){
	$res['status']=true;
	$res['msg']='ok';
	
	
}else{
	$res['status']=false;
	$res['msg']='前端数据有误';
}

echo(json_encode($res));
?>
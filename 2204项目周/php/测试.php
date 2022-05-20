<?php
/* echo "hello","world","today","is","sunday",
"<br>";
print "你好php";

print_r([1,2,3,4]); */

/* 
$a=100;
$str="hello world";
$bool=true; */

/* $x=5;
$y=5;
$z=$x+$y;
echo $z;
echo "<br>" */

/* function fn(){
	$x=1;
	$y=2;
	return $x+$y;
}
$result=fn();

echo $result; */

// 函数内局部变量变为全局变量 1.global

/* $x=5;
function fn(){
	global $x; 
	$x=10;
	return $x;
}
echo fn();
echo "<br>";
echo $x; */


// 2.借助超级全局变量 $GLOBALS[index]

/* $x=4;
function fn(){
	// $x=9;
	
	$GLOBALS['x']=9;
	return $x;
}
echo fn();
echo "<br>";
echo $x;
 */

// 3.参数作用域(形参也是局部变量);

/* $a=10;$b=20;

function fn($a,$b){
	// global $a;
	// global $b;
	$a=100;
	$b=200;
	echo $a."|".$b;
}
fn(100,200);
echo $a."|".$b; */

// php常量
// 1.定义常量 const
// 2.define(name,value)


/* const a=100;
echo a;
define("b",10);
echo b."<br>"; */

 // var_dump() 函数返回变量的数据类型和值;









?>
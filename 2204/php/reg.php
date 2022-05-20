<?php
$conn=mysqli_connect("localhost:3306","root","123456","2204");
//接收前端传来的数据


// if (!(isset($_POST["user"]) && isset($_POST["pwd"]) && isset($_POST["phone"]) && isset($_POST["email"])&&isset($_POST["nickname"]))) {
//     paramsError();
// }
$uname=$_POST['user'];

$pwd=$_POST['pwd'];
$phone=$_POST['phone'];
$email=$_POST['email'];

// $uname="daihui";
// $nickname="哦哦哦";
// $pwd="123456";
// $phone="13516402558";
// $email="15454@qq.com";

$sql="insert into `userinfor` (user,pwd,phone,email) value ('$uname','$pwd','$phone','$email') ";
$result=mysqli_query($conn,$sql);

$res=[];
if($uname&&$pwd&&$phone&&$email){
	if($result){
		
		
		$rows=mysqli_affected_rows($conn);
		if($rows>0){
			$res['status']=true;
			$res['msg']="新增成功";
		}else{
			$res['status']=false;
			$res['msg']="新增失败";
		}
	}else{
		$res['status']=false;
		$res['msg']="sql语句有误";
	}
}else{
	$res['status']=false;
	$res['msg']="未接收到数据";
}
echo(json_encode($res));
?>
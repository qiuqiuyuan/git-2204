<?php

  $conn=mysqli_connect("localhost:3306","root","123456","2204");

    // 接受前端数据

    $id=$_POST['id'];
    $buyNum = $_POST['buyNum'] ;
    $subTotalPrice = $_POST['subTotalPrice'] ;
    // $goodsName = $_POST['goodsName'] ;
    // $goodsImg = $_POST['goodsImg'] ;
    // $goodsPrice = $_POST['goodsPrice'] ;
    // $smallPicList = $_POST['smallPicList'] ;
    // $bigPicList = $_POST['bigPicList'] ;
    // $goodsDetail = $_POST['goodsDetail'] ;

						

    // 返回给前端的数据
    $res = [] ;

    // 判断是否接受成功 
    if($buyNum&&$id&&$subTotalPrice) {
            $sql = "update shoppingcar set buyNum =$buyNum,subTotalPrice=$subTotalPrice where cartId = '$id'";
            $rows = mysqli_query($conn , $sql) ;
            if($rows > 0) {
                $res['status'] = true ;
                $res['msg'] = '加入成功' ;
            } else {
                $res['status'] = false ;
                $res['msg'] = '数据库有误';
            }

      
        }else {
        $res['status'] = false ;
        $res['msg'] = '前端数据有误' ;
    }

    echo(json_encode($res)) ;
	
	
	// <!-- ,goodsName,goodsImg,goodsPrice,smallPicList,goodsDetail,bigPicList -->
	// <!-- , '$goodsName','$goodsImg','$goodsPrice','$smallPicList','$goodsDetail','$bigPicList' -->
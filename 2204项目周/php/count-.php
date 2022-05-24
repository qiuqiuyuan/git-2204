<?php

  $conn=mysqli_connect("localhost:3306","root","123456","2204");

    // 接受前端数据

    $user = $_POST['user'] ;
    $goodsId = $_POST['goodsId'] ;
    $buyNum = $_POST['buyNum'] ;
    // $goodsName = $_POST['goodsName'] ;
    // $goodsImg = $_POST['goodsImg'] ;
    // $goodsPrice = $_POST['goodsPrice'] ;
    // $smallPicList = $_POST['smallPicList'] ;
    // $bigPicList = $_POST['bigPicList'] ;
    // $goodsDetail = $_POST['goodsDetail'] ;

						

    // 返回给前端的数据
    $res = [] ;

    // 判断是否接受成功 
    if($user && $goodsId && $buyNum) {
        // &&$goodsName&&$goodsImg&&$goodsPrice&&$smallPicList&&$bigPicList&&$goodsDetail
        // 看用户是否买过该商品
        //    如果没有买过，就添加一条新的数据
        //    如果已经买过了，只需要修改数据就可以了
        $sql = "select * from shoppingcar where user = '$user' and goodsId = $goodsId" ;
        
        $data = mysqli_query($conn , $sql) ;

        $data = mysqli_fetch_array($data) ;

        if($data) {
            // 说明已经买过了
            // 修改数量   在原来的基础上增加
            $sql = "update shoppingcar set buyNum = buyNum + $buyNum where user = '$user' and goodsId = $goodsId" ;
            $rows = mysqli_query($conn , $sql) ;
            if($rows > 0) {
                $res['status'] = true ;
                $res['msg'] = '加入成功' ;
            } else {
                $res['status'] = false ;
                $res['msg'] = '数据库有误' ;
            }

        } else {
            $sql="insert into `shoppingcar` (user, goodsId, buyNum) values ('$user' , '$goodsId' ,' $buyNum')";
            $rows = mysqli_query($conn , $sql) ;
            if($rows > 0) {
                $res['status'] = true ;
                $res['msg'] = '加入成功' ;
            } else {
                $res['status'] = false ;
                $res['msg'] = '1' ;
            }
        }


    } else {
        $res['status'] = false ;
        $res['msg'] = '前端数据有误' ;
    }

    echo(json_encode($res)) ;
	
	
	// <!-- ,goodsName,goodsImg,goodsPrice,smallPicList,goodsDetail,bigPicList -->
	// <!-- , '$goodsName','$goodsImg','$goodsPrice','$smallPicList','$goodsDetail','$bigPicList' -->
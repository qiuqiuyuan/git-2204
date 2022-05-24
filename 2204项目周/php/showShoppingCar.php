<?php

    // 连接数据库

 $conn=mysqli_connect("localhost:3306","root","123456","2204");

    $res = [] ;

    $user = $_GET['user'] ;


    // 定义sql   like模糊查询
    $sql = "select * from shoppingcar , goodslist where shoppingcar.user = '$user' and shoppingcar.goodsId=goodslist.goodsId " ;
    // 运行
    $data = mysqli_query($conn , $sql) ;
    // 得到的是一个结果集   转数组
    
    $list = [] ;
    while($aa = mysqli_fetch_array($data)) {
        // 第一个参数是数组，第二个参数是值
        $arr = [] ;
        // 把需要的数据重新存入arr这个数组中
        $arr['goodsImg'] = $aa['goodsImg'] ;
        $arr['goodsPrice'] = $aa['goodsPrice'] ;
        $arr['goodsName'] = $aa['goodsName'] ;
        // $arr['cart_id'] = $aa['cart_id'] ;
        $arr['buyNum'] = $aa['buyNum'] ;
        $arr['cartId'] = $aa['cartId'] ;
        array_push($list , $arr) ;
    }

    if($list) {
        $res['status'] = true ;
        $res['msg'] = '数据请求成功' ;
        $res['list'] = $list ;
    } else {
        $res['status'] = false ;
        $res['msg'] = '数据库错误' ;
    }

    echo(json_encode($res));


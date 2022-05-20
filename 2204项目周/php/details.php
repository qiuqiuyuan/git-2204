<?php


$conn=mysqli_connect("localhost:3306","root","123456","2204");


    // 接受前端传来的数据

    $id = $_GET['id'] ;

    // $uname = 'yqy' ;
    // $upwd = '666' ;

    // 返回给前端
    $res = [] ;

    if($id) {
        // 去数据库中查询是否有用户名

        // 声明一个sql语句
        $sql = "select * from goodslist where goodsId = $id " ;
        // 执行sql语句  第一个参数表示连接  第二个参数表示sql语句
        $data = mysqli_query($conn , $sql) ;
        // 数据库中的结果集转成关联数组
        $data = mysqli_fetch_array($data) ;
        if($data) {
            $res['status'] = true ;
            $res['msg'] = 'ok' ;
            $res['list'] = $data ;
        } else {
            $res['status'] = false ;
            $res['msg'] = '数据不存在' ;
        }


    } else {
        $res['status'] = false ;
        $res['msg'] = '前端数据有误' ;
    }

    echo(json_encode($res)) ;


<?php

    // 连接数据库

    @include_once('connect.php') ;

    // 接受前端数据

    $id = $_POST['id'] ;

    // 返回给前端的数据
    $res = [] ;

    // 判断是否接受成功 
    if($id) {

        // 删除
        $sql = "delete from cart where cart_id = $id" ;
        // 执行   受影响的行数
        $rows = mysqli_query($conn , $sql) ;
        if($rows > 0) {
            $res['status'] = true ;
            $res['msg'] = '删除成功' ;
        } else {
            $res['status'] = false ;
            $res['msg'] = '数据库错误' ;
        }


    } else {
        $res['status'] = false ;
        $res['msg'] = '前端数据有误' ;
    }

    echo(json_encode($res)) ;
<?php

    // 分页？

    //   数据总共有多少 ，  dataLen

    //   每一页显示多少条数据  size

    //   总共有多少页   page = dataLen / size



    // 前端   
    //    默认 显示第一页  showPage = 1 
    //    上翻页  showPage--
    //    下翻页  showPage++ 


    // 前端请求数据的时候   参数
    //   要第几页的
    //   每页显示的条数


    $conn=mysqli_connect("localhost:3306","root","123456","2204");

    // 每页显示几条数据
    $size = $_GET['size'] ;
    // 第几页的数据
    $page = $_GET['page'] ;

    // 搜索的关键字  --- 此参数可以没有
    $kw = $_GET['kw'] ;


    if($size && $page) {
        // 查询数据的总数量
        $sql = "SELECT count(*) pageLen from goodslist where goodsName like '%$kw%'" ;
        $data = mysqli_query($conn , $sql) ;
        $data = mysqli_fetch_array($data) ;
        // 拿到数据的长度
        $pageLen = $data['pageLen'] ;


        $start = $size*($page-1) ;
    
        $sql = "select * from goodslist where goodsName like '%$kw%' limit $start,$size" ;
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
            // $arr['goods_des'] = $aa['goods_des'] ;
            $arr['goodsName'] = $aa['goodsName'] ;
            $arr['goodsId'] = $aa['goodsId'] ;
            array_push($list , $arr) ;
        }

        if($list) {
            $res['status'] = true ;
            $res['msg'] = '数据请求成功' ;
            $res['list'] = $list ;
            // 后端需要把总数据的长度返回给前端
            $res['pageLen'] = $pageLen ;
        } else {
            $res['status'] = false ;
            $res['msg'] = '数据库错误' ;
        }
    } else {
        $res['status'] = false ;
        $res['msg'] = '前端数据有误' ;
    }


    echo(json_encode($res)) ;
    

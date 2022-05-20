	
// function ajax(options){

//     var {type,url,data={},async=true,dataType="text",success}=options;

//     if(data instanceof Object){
//         var list=[];
//         for(let key in data){
//             let val=data[key];
//             let item=key+"="+val;
//             list.push(item);
//         }
//         let data=list.join("&");
//         console.log(data);


//     }??????

//     const xhr=new XMLHttpRequest();
//     if(type.toLowerCase()=="get"){
//         xhr.open("get",data?url+"?"+data:url,async);
//         xhr.send();
//     }else if(type.toLowerCase()=="post"){
//         xhr.open("post",url,async);
//         xhr.setRequestHeader("conten-type","application/x-www-form-urlencoded");
//         xhr.send(data);
//     }

//     xhr.onreadystatechange=function(){
//                  if(xhr.readyState===4&&xhr.status===200){
//                 let result=JSON.parse(xhr.responseText);
//                 // console.log(result);
//             if(success){
//                 success(result);
//             }
//             }
//     }


// }
function ajax(options) {
    // 解构
    const {
        data = {} , 
        type , 
        url , 
        dataType = 'JSON' , 
        async = true ,
        success
    } = options ;

    // 拼接数据
    let params = '' ;
    // 遍历data
    for(let key in data) {
        // console.log(key);  // username   userpwd
        // console.log(data[key]);   // yy   666
        params += `${key}=${data[key]}&` ;
    }

    // 去掉最后一个&
    params = params.substring(0 , params.length - 1) ;

    const xhr = new XMLHttpRequest() ;

    // 判断请求方式
    if(type.toLowerCase() === 'get') {
        xhr.open(type , url + '?' + params , async) ;
        xhr.send() ;
    }
    else {
        xhr.open(type , url , async) ;
        xhr.setRequestHeader('content-type' ,'application/x-www-form-urlencoded') ;
        xhr.send(params) ;
    }

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            // 获取了后端返回的数据
            let res = xhr.responseText ; 
            if(dataType.toLowerCase() === 'json') {
                res = JSON.parse(res) ;
                
            }
            success(res) ;
        }
    }

}


// 切割地址栏  拿到指定的字段名
function queryString(name) {
    const url = location.search.replace('?' , '') ;
    let arr = url.split('&');
    // console.log(arr);
    arr = arr.map( v=> {

        return {
            name : v.split('=')[0] ,
            content : v.split('=')[1]
        }
    })
    // console.log(arr);

    const res = arr.filter( v => v.name === name)[0] ;
    if(res) {
        return res.content
    }
    return ''
}
const  oUser=document.querySelector('#user');
const  oPwd=document.querySelector("#pwd");
const oBtn=document.querySelector('#btn');

oBtn.addEventListener('click',function(){
    const user=oUser.value.trim();
    const pwd=oPwd.value.trim();
    let date = new Date();
    date.setDate(date.getDate() + 1);
    if(user&&pwd){
        ajax({
            type:'post',
            url:'../php/login.php',
            data:{
                user,
                pwd,
            },
            success:res=>{
                const {status}=res;

                if(status){
                    document.cookie = `lgc=${user}; expires=" +${date}+ ";path=/`;
                    location.href='../html/index.html';

                }
            }
        })
    }






})
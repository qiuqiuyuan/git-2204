let keyWord=document.querySelector('.searchBarBox input');
const oBtn=document.querySelector('.search_btn');
let kw='';

oBtn.onclick=function(){
    let kw=keyWord.value;
    location.href=`../html/goodslist.html?kw=${kw}`;
}
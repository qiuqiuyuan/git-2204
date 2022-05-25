	//轮播图
	var tabBar = document.querySelector(".tabBar");
    var aList = document.querySelectorAll(".tabNav a"); 
    var liList = document.querySelectorAll(".tabList li");

    var index = 0; // 全局变量  记录自动轮播时的下标
    var timer = null;

    autoPlay();
    // autoPlay();
     
    for(var i=0;i<aList.length;i++){
        var a = aList[i];
        a.onclick = function(){

            // 先清除所有的
            for(var j=0;j<aList.length;j++){
                aList[j].className = "";
                liList[j].className = "";
            }

            index = Array.from(aList).indexOf(this);  //局部变量 被点击的元素的下标

            // 对应下标将 导航和tab栏 变为活跃状态
            aList[index].className = "active";  // 当前的导航变成活跃状态 
            liList[index].className = "show";

           
        }
    }

    tabBar.onmousemove = function(){
        // console.log("鼠标移入");
        clearInterval(timer);
    }
    tabBar.onmouseout = function(){
        // console.log("鼠标移出");
        autoPlay();
    }



    function autoPlay(){
        clearInterval(timer);
        timer = setInterval(function(){
            index ++;
            if(index >= aList.length){
                index = 0;
            }
            
            // 先清除所有的
            for(var j=0;j<aList.length;j++){
                aList[j].className = "";
                liList[j].className = "";
            }

            // 对应下标将 导航和tab栏 变为活跃状态
            aList[index].className = "active";  // 当前的导航变成活跃状态 
            liList[index].className = "show";

        },2000)
    }






    //倒计时
    showtime();
    var time=setInterval(showtime,1000);
    function showtime(){

    var hourSpan = document.getElementById("hour");
    var minuteSpan = document.getElementById("minute");
    var secondSpan = document.getElementById("second");

    var dateStart = new Date();
    // console.log(dateStart);
    var dateEnd = new Date("2022-6-18,0:0:0");
    // console.log(dateEnd);
    var time = parseInt((dateEnd.getTime() - dateStart.getTime()) / 1000); //间隔时间;
    // console.log(time);
    

    var hours = parseInt((time / 60 / 60) % 24);

    var minutes = parseInt((time / 60) % 60);
    var seconds = parseInt(time % 60);
    // console.log( hours, minutes, seconds);
    

    hourSpan.innerText = beauty(hours) + "时";
    minuteSpan.innerText = beauty(minutes) + "分";
    secondSpan.innerText = beauty(seconds) + "秒";

    function beauty(num){
        return num<10?"0"+num:num
    }
    }
    box.onclick=function(){
        clearInterval(time);
    }




    //randomPhoto
    const  oCountdown_GL=document.querySelector('.countdown_GL');
setList1();
function setList1(){
    
    ajax({
        type:'get',
        url:'../php/goodslist.php',
        success:res=>{
            const {status,list}=res;
            if(status){
                 let html='';
				 console.log(list);
				list.forEach(v => {
					const{goodsId, goodsName, goodsPrice, goodsImg, goodsDetail}=v;
					html+=`
					
					<li>
                <a href="" ><img
                        src="${goodsImg}"
                        alt=""></a>
                <p class="title">${goodsName}</p>
                <p class="price">
					${goodsPrice}
                </p>
            </li>
					
					`
					
					
					oCountdown_GL.innerHTML=html;
				});
			 }
		 }
	 })
 }

 //recommend

 const oRecommendImg=document.querySelector('.recommend_img');
setList2();
function setList2(){
	ajax({
		type:'get',
		url:'../php/goodslist.php',
		success:res=>{
			const {status,list}=res;
			
			if(status){
				let html1='';
				list.forEach(v => {
					const{goodsId, goodsName, goodsPrice, goodsImg, goodsDetail}=v;
					html1+=`
					
					<li>
                <a href="./detail.html?id=${goodsId}" ><img
                        src="${goodsImg}"
                        alt=""></a>
                <p class="title1">${goodsName}</p>
                <p class="price1">
					${goodsPrice}
                </p>
            </li>
					
					`
					oRecommendImg.innerHTML=html1;
				});
			}
		}
	})
}

//搜索栏

let keyWord=document.querySelector('.searchBarBox input');
const oBtn=document.querySelector('.search_btn');
let kw='';

oBtn.onclick=function(){
    let kw=keyWord.value;
    location.href=`../html/goodslist.html?kw=${kw}`;
}

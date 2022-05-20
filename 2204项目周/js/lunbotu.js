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
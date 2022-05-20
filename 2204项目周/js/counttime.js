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
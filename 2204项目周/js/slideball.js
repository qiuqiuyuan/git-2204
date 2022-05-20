let dragJudge=document.querySelector('.drag-judge');
let judgeWrap = document.getElementsByClassName("judge-wrap")[0];
let slideWrap = document.getElementsByClassName("slide-wrap")[0];
let followA = document.getElementsByClassName("follow-A")[0];
let randB = document.getElementsByClassName("rand-B")[0];
let ball = document.getElementsByClassName("ball")[0];

// 问题:图片加载需要时间 => 在图片没有加载完毕之前 =>无法撑开父元素(导致父元素高度有问题)
// 怎么解决
// 1. 给父元素judgeWrap 或 img定高度
// 2. 等图片加载完毕,在执行JS

let maxLeft = slideWrap.clientWidth - ball.clientWidth;
let maxTop = judgeWrap.clientHeight - randB.clientHeight;
console.log(judgeWrap.clientHeight, randB.clientHeight);

// 页面加载时=>随机位置
randPos();

ball.onmousedown = function (e) {
    var e = e || window.event;
    // if(e.button!=0) return false;
    var posX = e.offsetX;

    document.onmousemove = function (e) {
        var e = e || window.event;
        var x = e.pageX - slideWrap.offsetLeft - posX;

        x = Math.min(Math.max(0, x), maxLeft);

        ball.style.left = x + "px";
        followA.style.left = x + "px";
    }
    document.onmouseup = function () {
        document.onmousemove = null;
        // 松开时验证:  followA,randB重叠(left值相同)

        // followA.offsetLeft == randB.offsetLeft  理想情况下(对于手残党不友好)
        // 设置误差允许范围  [randB.offsetLeft-2,randB.offsetLeft+2]

        if(followA.offsetLeft){  // 之后之后再验证
            if (followA.offsetLeft >= randB.offsetLeft - 2 && followA.offsetLeft <= randB.offsetLeft + 2) {
                dragJudge.style.display='none';
            } else {
                ball.style.left = 0 + "px";
                followA.style.left = 0 + "px";

                 // 验证失败 => 重新随机位置
                randPos();
            }
        }

    }

}

function randPos() {
    // 验证失败 => 重新随机位置
    var randX = 200 + Math.round(Math.random() * (maxLeft - 200));
    var randY = 50 + Math.round(Math.random() * (maxTop - 50));

    randB.style.left = randX + "px";
    randB.style.top = randY + "px";
    followA.style.top = randY + "px";

    // followA.style.backgroundPosition = `-${randX}px -${randY}px`;
    followA.style.backgroundPositionX = -randX + "px";
    followA.style.backgroundPositionY = -randY + "px";
}


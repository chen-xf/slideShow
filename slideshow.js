var wrap = document.querySelector(".wrap");//获取wrap，为了设置其left才能控制轮播图
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");//获取左右箭头，并实现手动轮播
// 点击左右箭头时，使用onclick事件确定left的值
next.onclick = function () {
    next_pic();
}
prev.onclick = function () {
    prev_pic();
}
/*当left为0px时，为第五张图片，再点击上一张为空白，left为-3600px时是第一张图片，再点击下一张为空白
    但为了实现第一张图片与最后一张图片的无缝连接，当点击下一张到-3600px（第一张图片）时，需要下次跳转到第二张（-1200px）
    同理，点击上一张到0px（第五张图）时，希望下次跳转到第四张（-2400px）
*/
// function next_pic () {
//     var newLeft = parseInt(wrap.style.left)-600;
//     wrap.style.left = newLeft + "px";
// }
// function prev_pic () {
//     var newLeft = parseInt(wrap.style.left)+600;
//     wrap.style.left = newLeft + "px";

//     // index--;
//     // if(index < 0){
//     //     index = 4;
//     // }
//     // showCurrentDot();
// }

// 按照上述希望的结果对next_pic和prev_pic进行修改，实现循环播放
function next_pic () {
    var newLeft;
    if(wrap.style.left === "-3600px"){
        newLeft = -1200;
    }else{
        newLeft = parseInt(wrap.style.left)-600;
    }
    wrap.style.left = newLeft + "px";

    index++;
    if(index > 4){
        index = 0;
    }
}
function prev_pic () {
    var newLeft;
    if(wrap.style.left === "0px"){
        newLeft = -2400;
    }else{
        newLeft = parseInt(wrap.style.left)+600;
    }
    wrap.style.left = newLeft + "px";

    index--;
    if(index < 0){
        index = 4;
    }
    showCurrentDot();
}


// 实现自动播放
var timer = null;//设定计时器
function autoPlay () {
    timer = setInterval(function () {
        next_pic();
    },1000);//使用setInterval()每隔1秒显示一张图片
}
autoPlay();//调用自动播放函数

var container = document.querySelector(".container");
container.onmouseenter = function () {
    clearInterval(timer);//当鼠标停在图片上时，使用clearInterval()停止轮播图播放
}
container.onmouseleave = function () {
    autoPlay(); //鼠标离开图片区域时，继续自动播放   
}

//设置原点点击某一张图片时，显示为该图片
var index = 0;
var dots = document.getElementsByTagName("span");//获取小圆点
function showCurrentDot () {
    for(var i = 0, len = dots.length; i < len; i++){
        dots[i].className = "";
    }
    dots[index].className = "on";//设置第一个span的class为on，然后触发next_pic函数时，index加1，触发prev_pic函数时，index减1，并设置当前index的小圆点的class为on
}
//当点击小圆点时，可以跳转到相应图片
for (var i = 0, len = dots.length; i < len; i++){
    (function(i){
        dots[i].onclick = function () {
            var dis = index - i;
            if(index == 4 && parseInt(wrap.style.left)!==-3000){
                dis = dis - 5;     
            }
            //和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
            if(index == 0 && parseInt(wrap.style.left)!== -600){
                dis = 5 + dis;
            }
            wrap.style.left = (parseInt(wrap.style.left) +  dis * 600)+"px";
            index = i;
            showCurrentDot();
        }
    })(i);            
}
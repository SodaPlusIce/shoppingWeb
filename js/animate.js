function animate(obj, target,callback) {
    clearInterval(obj.timer);//先清除之前的定时器
    obj.timer = setInterval(function () {
        var step=(target-obj.offsetLeft)/10;//步长计算
        step=step>0?Math.ceil(step):Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if(callback){
            //     callback();//回调函数
            // }
            callback && callback();//短路运算
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}
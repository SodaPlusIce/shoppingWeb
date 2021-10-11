window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth=focus.offsetWidth;
    focus.addEventListener('mouseover', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer=null;
    })
    focus.addEventListener('mouseout', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer=setInterval(function(){
            arrow_r.click();
        },2000);
    })

    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index',i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index=this.getAttribute('index');
            //当我们点击了某个小li 就要把这个li的索引号给num
            num=index;
            circle=index;
            animate(ul,-index*focusWidth);
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张图片(li)
    var first=ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮，滚动一张图片
    var num=0;
    var circle=0;
    //flag 节流阀
    var flag=true;
    arrow_r.addEventListener('click',function(){
        if(flag){
            flag=false;
            if(num==4){
                ul.style.left=0;
                num=0;
            }
            num++;
            animate(ul,-num*focusWidth,function(){
                flag=true;
            });
            circle++;
            if(circle==ol.children.length){
                circle=0;
            }
            circleChange();
        }
    })
    arrow_l.addEventListener('click',function(){
        if(flag){
            flag=false;
            if(num==0){
                num=ul.children.length-1;
                ul.style.left=-num*focusWidth+'px';
            }
            num--;
            animate(ul,-num*focusWidth,function(){
                flag=true;
            });
            circle--;
            if(circle<0){
                circle=ol.children.length-1;
            }
            circleChange();
        }
    })
    function circleChange(){
        for(var i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        ol.children[circle].className='current';
    }
    //自动播放轮播图
    var timer=setInterval(function(){
        arrow_r.click();
    },2000);
})
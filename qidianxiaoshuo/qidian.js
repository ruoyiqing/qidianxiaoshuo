
window.onload=function(){
    var mainClass = document.getElementsByClassName("mainClass");
    var subClass = document.getElementsByClassName("subClass");
    var classic = document.getElementById("classic");

    showMultiLevelCategary(mainClass,subClass);
    showSlides("#board");
    showClassicBookInfo(classic);
}

function showClassicBookInfo(classic){
    var abook = classic.getElementsByClassName("oneBook");
    $(abook).hover(function(){
//        var info = $(this).children().eq(1);
//        info.stop(true,false).animate({left:"0px"},500);
         var info = this.getElementsByClassName("bookInfo")[0];
        $(info).stop(true,false).animate({left:"0px"},500);
    },function(){
        var info = this.getElementsByClassName("bookInfo")[0];
        $(info).stop(true,false).animate({left:"-100%"},"slow");
    });
}

function showMultiLevelCategary(firstLevel,secondLevel){
    var first = firstLevel;
    var second = secondLevel;
    for(var i=0;i<first.length;i++){
        first[i].index=i;
        second[i].style.top = parseInt(second[0].style.top)+
            i*parseInt(first[i].clientHeight)+"px";

        first[i].onmouseover = function(){
            second[this.index].style.display="block";
        }
        first[i].onmouseout = function(){
            second[this.index].style.display="none";
        }
    }
}
function showSlides(slideWindow){

    var windowWidth = $(slideWindow).width();//获取幻灯片放映窗口的宽度
    var slideNum = $(slideWindow).find("ul li").length;//幻灯片即图片的个数
    addUpLayer();
    var imgList = $(slideWindow+" ul");//注意有个空格
    var numSpans = $(slideWindow+" .numTip span");
    var index = 0;
    imgList.css("width",slideNum*windowWidth);//让所有<li>元素都float在一行，实现左右移动
    setUpLayer();

    //添加自动放映功能
    var interval;
    $(slideWindow).hover(function(){
        $(slideWindow+" .leftRight").css("opacity",0.2);
        clearInterval(interval);
    },function(){
        $(slideWindow+" .leftRight").css("opacity",0);
        interval = setInterval(function(){
            index++;
            if(index == slideNum)index=0;
            showEachPic(index);
        },4000);
    }).trigger("mouseleave");

    function addUpLayer(){
        //添加幻灯片下方的数字提示区域，以及上一张、下一张按钮
        var upLayer = "<div class='numTip'>";
        for(var i=0;i<slideNum;i++){
            upLayer += "<span>"+(i+1)+"</span>";
        }
        upLayer +="</div><div class='leftRight leftOne'></div><div class='leftRight rightOne'></div>";
        $(slideWindow).append(upLayer);
    }

    function setUpLayer(){
        numSpans.mouseenter(function(){
                index = numSpans.index(this);
                showEachPic(index);
            });//若没有自动放映功能，可以添加“.eq(0).trigger("mouseenter")”使其开始从第一张幻灯片开始

        $(slideWindow+" .leftRight").hover(function(){
            $(this).css("opacity",0.4);},
            function(){$(this).css("opacity",0.2)
        })

        $(slideWindow+" .leftOne").click(function(){
            --index;
            if(index == -1){index = slideNum-1};
            showEachPic(index);
        });

        $(slideWindow+" .rightOne").click(function(){
            ++index;
            if(index == slideNum){index = 0};
            showEachPic(index);
        })
    }
    function showEachPic(index){
        var leftOffset = -index*windowWidth;
        imgList.stop(true,false).animate({"left":leftOffset},300);//停止当前动画让<ul>元素向左移动
        numSpans.stop(true,false).animate({"opacity":0.5},300)
            .eq(index).stop(true,false).animate({"opacity":1},300);
    }

}

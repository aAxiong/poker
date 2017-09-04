/*
*  手机端布局 rem
*
*  相对HTML font-size
*/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;  //clientHeight
            var clientHeight = docEl.clientHeight;
            //   console.log(2);
            if (!clientWidth) return;

            var scale =  clientHeight/clientWidth;
            if(scale<0.54){
                docEl.style.fontSize = 54 + 'px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 1000) + 'px';
            }
           // if(clientWidth>1000){clientWidth=1000}
           
        };
    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


/*
*  注册命名空间
*
*  PRO.Fun = function(){  }
*/

var PRO = PRO || {};
var NetProblemBool = true,KCount = true;


(function () {
    PRO.namespace = function (str) {
        var parts = str.split("."),
        parent = PRO,
        i = 0,
        l = 0;

        if (parts[0] === "PRO") {
            parts = parts.slice(1);
        }
        for (i = 0, l = parts.length; i < l; i++) {
            if (typeof parent[parts[i]] === "undefined") {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    }
})();


/*
*  ajax 向后台取数据
*
*  @param url 后台接口方法
*  @param data 参数
*  @param fn 回调函数
*/


PRO.Requeset3 = function (url,time, data, fn,fncomplete) {
    $.ajax({
        url: 'http://139.199.6.159/fpjadmin/admin.php/proxy/' + url,
        type: "post",
        timeout:time,
        data: data,
        success: function (r) {
            fn.apply(fn, [r]);
        },
        error:function(r){
          fn.apply(fn, [r]);
        },
        complete:function(XMLHttpRequest,status){
            if(status == 'timeout' || status == 'error'){   //超时和断网和链接不上 都统一算超时
                fncomplete.apply(fncomplete);
            }
        }
    })
}



PRO.Requeset2 = function (url,time, data, fn,fncomplete) {
    $.ajax({
        url: 'http://139.199.6.159/fpjadmin/admin.php/admin/' + url,
        type: "post",
        timeout:time,
        data: data,
        success: function (r) {
            fn.apply(fn, [r]);
        },
        error:function(r){
          fn.apply(fn, [r]);
        },
        complete:function(XMLHttpRequest,status){
            if(status == 'timeout' || status == 'error'){   //超时和断网和链接不上 都统一算超时
                fncomplete.apply(fncomplete);
            }
        }
    })
}





PRO.Requeset6 = function (url,time, data, fn,fncomplete) {
    var b = "";
    url == "version" ? b = "http://139.199.6.159/fpj/index.php/Home/Redis/"+url : b = 'http://139.199.6.159/fpj/index.php/Home/Game/'+url+'?token='+user.token;

    // var defer = $.Deferred();
    $.ajax({
        url: b,
        type: "post",
        timeout:time,
        data: data,
        // async: false,
        success: function (r) {
            fn.apply(fn, [r]);
        },
        error:function(r){
          fn.apply(fn, [r]);
        },
        complete:function(XMLHttpRequest,status){
            if(status == 'timeout' || status == 'error'){   //超时和断网和链接不上 都统一算超时
                fncomplete.apply(fncomplete);
            }
        }
    })
}



PRO.Requeset = function (url,time, data, fn,fncomplete) {
    var b = "";
    url == "version" ? b = "http://139.199.6.159/fpj/index.php/Home/Redis/"+url : b = 'http://139.199.6.159/fpj/index.php/Home/Game/'+url+'?token='+user.token;

    $.ajax({
        url: b,
        type: "post",
        timeout:time,
        data: data,
        success: function (r) {
            fn.apply(fn, [r]);
        },
        error:function(r){
          fn.apply(fn, [r]);
        },
        complete:function(XMLHttpRequest,status){
            if(status == 'timeout' || status == 'error'){   //超时和断网和链接不上 都统一算超时
                fncomplete.apply(fncomplete);
            }
        }
    })
}


/*
*  
*  游戏提示框
*
*  @param  CONTENT 内容 提示框内容
*/
PRO.Prompt  = function(CONTENT){
    if(KCount){
      KCount = false;
      var arg = arguments[1];
      var html = '<div class="prompt ">'+CONTENT+'</div>'; 
      var op = 0;
      if(arg != undefined) {  html = '<div class="prompt hg">'+CONTENT+'<span class="dotting"></span></div>'; op = 1;   };
      if($(".prompt").length==0){
        $(html).appendTo($("body")).delay(800).animate({"opacity":op,"bottom":"0.7rem"},800,function(){
               if(arg != undefined) {   }
                else{$(this).remove(); KCount = true; }
                
        });         
      }
    }
}


/*
*
*  加载中提示
*  
*
*/
PRO.Loading = function(){
    var html = '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
    $(html).appendTo($("body"));
}

PRO.RmLoading = function(fn){
   var rm = null;
   clearTimeout(rm);
   rm = setTimeout(function(){
       $(".spinner").remove();
       fn.apply(fn);
   },1000);
}


var px;
var px2 = [];   //这里放入5s 内刚出现的消息。提前出现;
var gCount = 0;
var bt = 0;
var Xcount = 0;  //消息第一次的数量



/*世界消息*/

//user.token

var lunxun = true;

PRO.gongxi = function(data){  // data 内容    user_id : 'HUA01',  wutiao : '200'//根据倍率判断是同花顺还是五条
    px = [];
        lunxun  = true;
     
        PRO.voucher(msg.status);
            if(data.length !=0){
             for(var i = 0; i <data.length;i++){
                    var time = GetDateDiff(data[i].message_date, new Date().format("yyyy-MM-dd hh:mm:ss"), "second");
                    if(time<2){
                        px2.push(data[i]);
                    }
                    if(data.length==1 && time < 180){  //如果只有一条信息  时间小于3分钟
                        px.push(data[i]);
                    }
                    else if(time < 120 ){             //时间小于2分钟
                        px.push(data[i]);
                    }
                    if(data[i].type == 10){  //一直循环播放type=10 的消息
                        px.push(data[i]);
                    }
              
              }
              if(px.length < 5) gCount = 0;
              if(px.length > 10 && gCount > 2 ){   //如果消息过多 滚动减少
                
                  if((gCount+4)>px.length){
                      gCount = gCount;
                  }
                  px.splice(0, gCount);
              }
              if(bt == 0){
              
                  Xcount = data.length;
                  bt++;
                  PRO.Gungongxi();  // 每秒发送消息
                 // PRO.GDXIAO();    //  每秒发送消息
                  
              }
            }
}


var word = [];   //这里世界消息放入的地方  
var word2 = [];  //5秒内出现的数据。。 滚动的时候出现消息  提前出现
var gcount = 3;   //默认都滚动3次    //滚动3次消失
var num = 0;     //记录数组滚动到的条目

PRO.wordInf = function(data){   //user_id : 'HUA01',  wutiao : '200'//根据倍率判断是同花顺还是五条
    // word = data;

    // if(data.length !=0){  //获取到世界消息
      // var data=data.data;
      //数据每次只存在单条  
      //一来消息全部放在 第二个数组  word2  然后滚动过后消失、、word2 数组没有数据就滚动word  数组
      word2.push(data);       // word2 = [0,0]; 

      //消息存入第二个数组  并且记录次数
      word.push([data,0]);    

      //执行滚动函数
       if(word2.length<=1){   //此时第二条数据追加   
           PRO.wordqu(data);   //传入数据
      }
   // }
};

PRO.wordqu = function(data){
     var  d = data,html,user,content; 

     user = d.user_id;  //用户
     content = d.wutiao =="200"?'同花大顺':'五条';  //内容

     html = '<span class="zw">恭喜<span>'+user+'</span>中了<span>'+content+'</span>';

     //下面函数 处理滚动次数  消息提前 
     PRO.wordmove(html);
}

PRO.wordmove = function(HTML){
    $(".gongxi").remove();
     var WinWidth = $(window).width();   //获取到屏幕宽度
     var htmlcon = HTML;                 //获取到内容
     var htmllen = parseInt(($(htmlcon)[0].innerHTML.length) * 16);    //获取到内容的长度 
     var htmlTime = (WinWidth + htmllen) * 7 ;                         //滚完这条内容的时间
     var htmlDiv  = $('<div class="gongxi"></div>').appendTo($("body"));
     $(htmlcon).appendTo(htmlDiv).css({"marginLeft":WinWidth}).stop().animate({"marginLeft":-htmllen+"px"},htmlTime,"linear",function(){
          if(word2.length>=1) {    // 
              word2.splice(0,1);    //滚动完  删除第一个 

              //删除完判断word2 还有没有数据  这里的操作就是能消息提前推送
              if(word2.length>0){  
                  PRO.wordqu(word2[0]);   //再次执行
              }
              else{
                  if(word.length>0){       //模拟数据  num = 1     word = [["222",2],["4444",2],["55555",3],["6666",3]]  
                      if(word[num][1] == 3){    //如果等于3
                          word.splice(0,1);    //删除掉第一个  此时num = 0; 

                      }
                      //可能出现这是最后一个
                      if(word.length>0){
                            PRO.wordqu(word[num][0]);   //重复执行   直到滚动3次
                            word[num][1] +=1;        //滚动次数增加 
                            ++num;   //滚动完++  
                            if(num>word.length){  //重复滚动  第二次执行
                               num  = 0;
                            }
                      }
                  }
                  else{   
                    $(".gongxi").remove();
                  }
              }
          }
          $(".gongxi").remove();
     }); 
}



// PRO.gMOVE = function(html,k){
//     var WinWidth = $(window).width();
//     var html = html; 
//      var Whtml = parseInt(($(html)[0].innerHTML.length) * 16);
//      var Totime = (WinWidth+Whtml) * 7;
//      var gongxi = $('<div class="gongxi"></div>').appendTo($("body"));
//      $(html).appendTo(gongxi).css({"marginLeft":WinWidth}).stop().animate({"marginLeft":-Whtml+"px"},Totime,"linear",function(){
//          gongxi.remove();
//          if(k==0){
//             ++y;
//          }else if(k==1){
//              px2.splice(0,1);
//          }
         
//          gCount++;  //如果gCount = 2  消息过多 不滚动多次
//          PRO.Gungongxi();
//      });
// }


var GDTime = null;          





// PRO.GDXIAO = function(){         //这里需要修改，最后放在数据获取完后调用
//     clearInterval(GDTime);
//     GDTime = setInterval(function(){
//      PRO.Gungongxi();
//     },5020);
// }

var y = 0;



PRO.Gungongxi = function(){
    
    

    if(px.length>0){

        var id,ib,html,da,by,k = 0;
        y >= px.length ? y = 0 : y = y; 
        da = px;
        by = y;         //等于外部变量

        if(px2.length>0 && y==0){   //有新消息进入   
            px2.splice(0,1);
        }else if(px2.length>0){
            da = px2;   
            by = 0;   //有新消息   让by = 0; 
            k = 1;  //如果k == 1 ;
        }

        if(da[by].type == 1){
            id = da[by].creator_id;
            da[by].content == "200" ? ib = "同花大顺" : ib ="五条";
            html = '<span class="zw">恭喜<span>'+id+'</span>中了<span>'+ib+'</span>';
        }else{
             html = '<span class="zw">'+da[by].content+'</span>';
        } 

        PRO.gMOVE(html,k);

    }else{
        
        bt = 0;
    }

}



  // $(html).appendTo($("body")).animate({"right":"0%"},1002,function(){
  //           $(this).delay(3004).animate({"right":"100%"},501,function(){
  //               $(this).remove();
  //               ++y;
  //           });
  //       }); 

PRO.gMOVE = function(html,k){
    var WinWidth = $(window).width();
    var html = html; 
     var Whtml = parseInt(($(html)[0].innerHTML.length) * 16);
     var Totime = (WinWidth+Whtml) * 7;
     var gongxi = $('<div class="gongxi"></div>').appendTo($("body"));
     $(html).appendTo(gongxi).css({"marginLeft":WinWidth}).stop().animate({"marginLeft":-Whtml+"px"},Totime,"linear",function(){
         gongxi.remove();
         if(k==0){
            ++y;
         }else if(k==1){
             px2.splice(0,1);
         }
         
         gCount++;  //如果gCount = 2  消息过多 不滚动多次
         PRO.Gungongxi();
     });
}


PRO.voucher = function(S){
  if(S == 109){
      clearInterval(continuedTime);
      $('<div class="chaoshi"><div class="chaobg"><p>您的账号在别处登录,请重新登录</p><div class="chaobtn">确定</div></div></div>').appendTo($("body"));
               $(".chaobtn").click(function(){
              
                PRO.removeforget();
              // window.location.href=window.location.href+"?id="+10000*Math.random();

               //  window.location.href="IOS:shareToTest";  IOS 重新刷新失败 现在用其他方法来解决

      }) 
  }
}




PRO.removeforget = function(){
      $(".chaoshi").remove();
      $(".login").show();
      $(".forpwd").hide();
      $(".RoomData").hide();
      $(".table_index").hide();
      $(".startGame").hide();
       $(".hisPage").hide();

      StartAgain();
      y = 0;GDTime = null;Xcount = 0;bt = 0;gCount = 0;px2 = [];px;four = true;NetProblemBool = true;
      KCount = true;k = 0;bk = 0;elemet =""; poker.bool=true;
      $("#logon_co").val("");
}
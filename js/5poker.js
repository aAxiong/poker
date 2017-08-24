
/*
*   @game      poker
*   @edition   1.0
*   @author    
*/

var user = {  //用户信息
    id: 0,              //用户id
    accounts: "",       //用户帐号
    room: 0,            //房间
    tableNum: 0,        //桌号
    Chips: 0,           //  你的总资产    
    online:0,            //目前的状态 
    token:""
}

var table = {  //用户所在桌子信息   
    roomNum: 1,         //房间分值
    Upper: 0,       //房间押分上线
    the: 0,             //上把玩家筹码
    tableCount: 0,     //桌子的输赢情况
    count: 0,           //当前输赢情况
    ng: 0,               //当前局数
    credit: 0,          //经过输赢之后的筹码   
    bet: 0,             //当前投币情况
    wp: 0,              //个人输赢情况   百分比来记
    Wins: 0,            //在这张桌子赢了多少局
    type: 0             //牌的类型
}


var mon = { //赔率
    Five: 300,       // 五条
    RFlush: 200,    // 同花大顺
    SFlush: 100,    // 同花顺
    four: 65,       // 四条   
    FullHoust: 15,  // 葫芦
    Flush: 7,        // 同花
    stra: 5,         // 顺子
    three: 3,       // 三条
    two: 2,         // 两对
    tenBetter: 1,      // 一对10以上
    JP: 4           //遇到JP  就翻倍 倍数 为..
}


var kongge = 0;          //记录开始游戏点击次数
var betCount = 2;
var four = true;





var poker = {
    pkcode: [],//  装牌
    pokerFilp: [],  //将没选中的牌装这里
    heldArray: [],
    clickCode: "",
    tables: [],
    Recount: 0,    // 按需加载次数
    bool: true,     // 按钮能点击处在true  不能点击处于false   // 发牌需要更改
    bool2 :true,
    jp:0
}


/*
* 游戏开始函数
*/

$(function(){
      // audiojs.events.ready(function() {
      //   audiojs.createAll();
      // });
     PRO.PKstartGame();

})

PRO.PKstartGame = function(){
    
    FastClick.attach(document.body);   //处理click 300ms 的延迟


     PRO.Requeset("version",0,{name:user.id},function(msg){
            if(msg.status == 404){ four = false;  }
            if(msg.status == 100){
                 if(msg.version == "2.0.0"){   //版本号正常 可以进入
                       PRO.EventTrigger();     // 事件触发函数                             
                       PRO.LocalStorage();     //h5本地存储
                       PRO.LoginGame();        //游戏登录函数
                 }else{
                      $('<div class="chaoshi"><div class="chaobg"><p>版本号已经更新,请下载最新版本</p><div class="chaobtn">确定</div></div></div>').appendTo($("body"));
                      $(".chaobtn").click(function(){
                             $(".chaoshi").remove();
                      })   
                 }
            }   
       },function(){
            if(four){
               PRO.Prompt('网络太慢,正在努力加载中',2);
                // PRO.Version();
             }else{
                PRO.Prompt('服务器出现故障,请稍后再试',2); 
             }
     });
     
    // PRO.Requeset("version",0,{name:user.id},function(msg){
    //         if(msg.status == 404){ four = false;  }
    //         if(msg.status == 100){
    //              if(msg.version == "2.0.0"){   //版本号正常 可以进入
    //                    PRO.EventTrigger();     // 事件触发函数                             
    //                    PRO.LocalStorage();     //h5本地存储
    //                    PRO.LoginGame();        //游戏登录函数
    //              }else{
    //                   $('<div class="chaoshi"><div class="chaobg"><p>版本号已经更新,请下载最新版本</p><div class="chaobtn">确定</div></div></div>').appendTo($("body"));
    //                   $(".chaobtn").click(function(){
    //                          $(".chaoshi").remove();
    //                   })   
    //              }
    //         }   
    //    },function(){
    //         if(four){
    //            PRO.Prompt('网络太慢,正在努力加载中',2);
    //             // PRO.Version();
    //          }else{
    //             PRO.Prompt('服务器出现故障,请稍后再试',2); 
    //          }
    //  });

   


    // PRO.gongxi();
     //playSound(); //播放声音
    // StartGame();  //点击开始游戏
 }


 // PRO.Version = function(){
 //      //version
       


 // }


/*
*   h5 本地存储
*   
*   @effect 游戏起始页面 第一次显示
*/


 PRO.LocalStorage = function(){
     $(".startPage").delay(2000).transition({"opacity":0},500,function(){
         $(".startPage").hide();
          // var value = localStorage.getItem("key"); 
          // var valuep = localStorage.getItem("keyp"); 
          // if(value&&valuep){
          //      $("#login_co").val(value);   
          //      $("#logon_co").val("*******");
          //      PRO.Requeset2("autologin",2000,{id:value,password:valuep},function(msg){
          //        console.log(msg);
          //         if(msg.code == 200){
          //             if(NetProblemBool==false){
          //                 NetProblemBool = true;
          //                 KCount = true;
          //                 $(".prompt").remove();
          //            }
          //              user.token = msg.token;
          //             PRO.Prompt('登录成功');
          //             user.Chips = msg.integral; user.id = msg.user_id; PRO.Loading(); PRO.GetRoom();   $(".idfra .inum").text(user.id);  $(".idfra .icount").text(user.Chips);    $(".login").hide(); $(".RoomData").show(); 
          //             PRO.StartGame();
          //             PRO.playSound();
          //         }else{
          //            PRO.Prompt('密码已修改,请重新登录');
          //         }
          //      },function(){
          //            PRO.Prompt('网络太慢,请过会再试');
          //        })
          // }
     });
    

//     if (localStorage.startpage)     {  $(".startPage").hide(); } 
//     else { localStorage.startpage = 1; $(".startPage").show(); }
 }



PRO.LoginGame = function(){

    $("#loginRight").unbind("click").click(function(){
        if(poker.bool){
            var username = $("#login_co").val();   
            var userpaw = $("#logon_co").val();
            var userpawT = userpaw;     //$.sha1(userpaw) 最初有的前端登录加密,现在去掉了。！

            poker.bool = false;
            if(username == "" || userpaw == "") {  PRO.Prompt('账号或密码不能为空'); poker.bool = true; } 
            else { 
                   
                   PRO.Requeset2("user_login", 2000 ,{ id:username,password:userpawT }, function (msg) {      //id:username,password:userpaw \
                      
                     if(msg.status == 404 || msg.status == 0 ){ four = false;  }   
                      poker.bool = true;
                      var code = msg.code; 
                      if     (code == 0)    { PRO.Prompt('账号或密码不能为空');} 
                      else if(code == 30)    { PRO.Prompt('账号不存在');}
                      else if(code == 40)    { PRO.Prompt('密码错误');}
                      else if(code == 200 )   { PRO.Prompt('登录成功'); 
                          if(NetProblemBool==false){  //断网
                                NetProblemBool = true;
                                KCount = true;
                                $(".prompt").remove();
                          }
                          user.token = msg.token;
                          // localStorage.setItem("key", msg.user_id);
                          // localStorage.setItem("keyp",msg.password);
                          // console.log(msg);
                          user.Chips = msg.integral; user.id = msg.user_id; PRO.Loading(); PRO.GetRoom();   $(".idfra .inum").text(user.id);  $(".idfra .icount").text(user.Chips);    $(".login").hide(); $(".RoomData").show(); 
                          PRO.StartGame();
                          PRO.playSound();
                     }
                      
                         

                 },function(){
                    if(four){
                       NetProblemBool = false;
                      poker.bool = true;
                      $("#loginRight").click();
                      PRO.Prompt('网络太慢,正在努力加载中',2);
                    }else{
                      PRO.Prompt('服务器出现故障,请稍后再试'); 
                    }
                   
                 })              
            }
        }
    });
}


/*
*
* 获取房间
*
*/

PRO.GetRoom = function () {

    var q = "区", f = "分";
    var IRoom = $(".IRoom .Ioul");
    IRoom.html("");

    PRO.Requeset("getroom", 0 ,{name:user.id}, function (msg) {
        PRO.RmLoading(function(){
            console.log(msg);
             // if(msg.status == 104){

             // }

             if (msg.status == 100) {

               PRO.GetOneTable(); //每秒发送请求
                
                // PRO.Gungongxi();  // 每秒发送消息
                // PRO.GDXIAO();    //  每秒发送消息

                var room = msg.data.rooms;
                for (var i = 0; i < room.length; i++) {

                    
                    $('<li id="' + room[i].id + '" level = "' + room[i].level + '"><span>' + room[i].level + f + (room[i].id).slice(2) + q + '</span></li>').appendTo(IRoom).click(function () {
                         


                         if ($(this).attr("level") == 5 && user.Chips <= 20000) {
                            PRO.Prompt("分数不足,无法进入");
                         //  alert("你的分数没有到达进入这个房间的权利！");
                           return false;
                          }

                        var aid = $(this).attr("id");
                        var alvl = $(this).attr("level");
                        user.room = aid;
                        table.roomNum = parseInt(alvl);
                        PRO.Requeset("roomStatus",0,{ name:user.id,room:user.room },function(msg){
                             if(msg.status == 100){
                                PRO.GetTable();
                             }else if(msg.status == 104){
                                PRO.Prompt("房间已经关闭,请选择其他房间");
                                $("#"+user.room).hide();
                             }
                             //
                        })
                        
                    });

                    if(i+1<room.length){

                      if(room[i].level != room[i+1].level){
                       
                         $('<li class="cla"></li>').appendTo(IRoom);
                      }
                    }

                }
            }

        });
       
    });

}


/*
*  1秒向服务器请求目前桌子的状态
*  
*/

var continuedTime  = null;   //  每秒发送请求的计时器

PRO.GetOneTable = function(){
    clearInterval(continuedTime);
    continuedTime = setInterval(function(){
     
       if(lunxun){
           lunxun = false;
           PRO.gongxi();
            
         }
      
       
        if(user.tableNum== 0 && user.room !=0 && k == 1 ){

             var tables2 = [];
             var arr = [];
             var arr2 = [];
             PRO.Requeset("gettable", 0 ,{name:user.id, room: user.room }, function (msg) { 
                   console.log(msg);
                    tables2 = msg.data.tables;
                    for(var key = 0; key<tables2.length;key++){
                       
                        var keya = poker.tables[key]["status"];
                        var keyb = tables2[key].status;
                        if(keya!=keyb){
                            if(keyb == 1 ) arr.push(key);  //  桌子进人了
                            if(keyb == 0 ) arr2.push(key); //  桌子人离开了
                        }
                    }
                    if(arr!=""){
                         for(var i = 0; i < arr.length;i++){
                                if(arr[i]==undefined){
                                    return;
                                }else{
                                    $(".table_content ul li").eq(arr[i]).addClass("hp");
                                }
                          } 
                    }
                     if(arr2!=""){
                         for(var i = 0; i < arr2.length;i++){
                                if(arr2[i]==undefined){
                                    return;
                                }else{
                                    $(".table_content ul li").eq(arr2[i]).removeClass("hp");
                                }
                          } 
                    }
                    poker.tables = msg.data.tables;
               });        
        }
    },15000);
    
}


/*
*
* 获取桌子
*
*/



var k = 0; k2 = 0;
PRO.GetTable = function(){

    $(".RoomData").hide();
    $(".table_index").show();
    PRO.Loading();
    $(".titboxnb").text(table.roomNum);
    $(".table_content ul").html("");
    PRO.Requeset("gettable", 0 ,{name:user.id, room: user.room }, function (msg) {
          PRO.RmLoading(function(){
             if (msg.status == 100) {
                  k = 1;
                  poker.tables = msg.data.tables;  //装桌子
                  poker.Recount = 0;
                  poker.bool = false;
                  PRO.Deskdata();
                  $(window).scroll(function () {
                      if (($(window).height() + $(window).scrollTop()) > $("body").height() - 1) {
                          PRO.Deskdata();
                      }
                  });
             }
            
          })           
    });
   
}

/*
*
* 桌子加载
* 
*/
PRO.Deskdata = function(){
    var table_content = $(".table_content ul");
    var table = poker.tables,tclass = "";
    var folz = parseInt(poker.Recount) * 50;
    var tolz = parseInt(poker.Recount + 1) * 50;

    tolz >= table.length ? tolz = table.length : poker.Recount++;

    if (poker.bool) { return; }
        for (var i = folz ; i < tolz ; i++) {
            table[i].status == 1 ? tclass = "hp" : tclass = "";
            $('<li id="' + user.room + "-" + table[i].num + '" class="' + tclass + '"><span>' + table[i].num + '</span></li>').appendTo(table_content).click(function () {
                var cl = $(this).attr("class");
                var cid = $(this).attr("id");
                var Rd = cid.split("-");

                if (cl != "hp") {
                   user.tableNum = Rd[1];  
                  
                   PRO.GameUi();
                }
            });
    }

    (tolz == table.length) && (poker.bool = true);
}

/*
*
* 进入桌子
* 
*/
PRO.GameUi = function(){
 

    //clearInterval(continuedTime);

    PRO.Requeset("jointable", 0 ,{ room: user.room, num: user.tableNum,name:user.id }, function (msg) {

        if (msg.status == 100) { 
              if(msg.data.status == 1){
                  PRO.Prompt('房间已经有人了,请选择其他房间');
                 
                  $("#"+user.room+"-"+user.tableNum).addClass("hp");
                 user.tableNum = 0;
              }else{
                    $(".table_index").hide();
                    $(".startGame").show();
                    $(".usezi .p1").text(user.Chips);
                    $(".usezi .p4").text(user.Chips);
                    $(".usezi .p2").text(user.room+"-"+user.tableNum);
                    $(".cbtn a").eq(1).text("加" + table.roomNum + "积分");
                    $(".cbtn a").eq(2).text("加" + (table.roomNum * 10) + "积分");
                  //进人游戏界面  
                  k2 = 1;
              };
            
        }
    });  
}





/*
*
* 事件触发函数
* 
*/
PRO.EventTrigger = function(){

    $(".aaab").click(function(){
        saf();
    })

    $(".startPage").click(function () {   //起始页面按钮
        $(".startPage").hide();
    });

    $(".table_return").click(function () {  //返回房间事件
        $(".table_index").hide();
        $(".RoomData").show();
    })

    $(".guanbi").click(function(){
        $(".login").show();
         $(".forpwd").hide();
    });

    $(".goutxt").click(function(){
        $(".login").hide();
        $(".forpwd").show();
    });

    $(".gooutchu").click(function(){
        localStorage.clear();
        PRO.removeforget();
    });

    $(".table_null").click(function () {    //全部桌子或空桌子
      console.log(1);
        if ($(".table_null").text() == "全部") {       //$(".table_content ul li").is(":hidden")
            $(".hp").show();
            $(".table_null").text("空桌");
        }
        else {
            $(".hp").hide();
            $(".table_null").text("全部");
        }
    })

    $("#arrayfix").click(function(){
        var yid =  $("#forgetid").val();
        var ymm =  $("#forgetpwd").val();
        var nmm =   $("#newspwd").val();
        var nmmt =  $("#newspwdtwo").val();

        if(nmm != nmmt ){
             PRO.Prompt("2次密码输入的不同,请重新输入");
        }else{
            PRO.Requeset3("user_update_password",0,{id:yid,password:ymm,new_password:nmm},function(msg){
                if(msg.code == 40){
                  PRO.Prompt("原密码错误");
                }
                if(msg.code==50){
                    PRO.Prompt("密码不足6位");
                }
                if(msg.code==200){
                    $("#forgetid").val("");
                    $("#forgetpwd").val("");
                    $("#newspwd").val("");
                    $("#newspwdtwo").val("");
                    PRO.Prompt("修改成功");
                }
                if(msg.code == 30){
                    PRO.Prompt("账号不存在");
                }
            });
        }
        
    })

    $(".cardbtn #goout").click(function () {  //退出游戏按钮
         var tp = parseInt($(".usezi .p5 span").text());
        if (kongge == 0 ) {
            PRO.Requeset("outTable",0, { name:user.id,room: user.room, tableNo: user.tableNum }, function (msg) {
                    if(msg.status == 100 ){
                        user.Chips = parseInt(user.Chips+tp);
                        user.tableNum = 0;
                        table.bet = 0;
                        
                        StartAgain();
                        $(".startGame").hide();
                        $(".table_index").show();
                         $(".idfra .icount").text(user.Chips);
                       
                       // PRO.GetOneTable();
                    }
            })
       }
        else {
            PRO.Prompt("游戏已经开始了，暂时无法退出");
           // alert("游戏已经开始了，暂时无法退出");
        }

    })

    $(".cardbtn .cbtn a").eq(3).click(function () {    //查分按钮
        $(".startGame").hide();
        $(".hisPage").show();
        PRO.CheckPoints();

    })

    $(".intReturn").click(function () {         // 查发返回按钮
        $(".startGame").show();
        $(".hisPage").hide();
    })
}   



PRO.CheckPoints = function () { //查分
    PRO.Requeset("checkpoints",0 ,{name:user.id, room: user.room, tableNo: user.tableNum }, function (msg) {
        if (msg.status == 100) {
            var ts = user.room + user.tableNum;
            var msg = msg.data[ts];
            var f1 = $(".plusBarnd").eq(0).find(".intUl").find("li");
            var f2 = $(".plusBarnd").eq(1).find(".intUl").find("li");
            var f3 = $(".plusBarnd").eq(2).find(".intUl").find("li");

            f1.eq(0).find("span.lb").text(msg.type_five);
            f1.eq(1).find("span.lb").text(msg.type_royalflush);
            f1.eq(2).find("span.lb").text(msg.type_strflush);
            f1.eq(3).find("span.lb").text(msg.type_four);
            f1.eq(4).find("span.lb").text(msg.type_fullhouse);
            f2.eq(0).find("span.lb").text(msg.type_flush);
            f2.eq(1).find("span.lb").text(msg.type_straight);
            f2.eq(2).find("span.lb").text(msg.type_three);
            f2.eq(3).find("span.lb").text(msg.type_twopair);
            f2.eq(4).find("span.lb").text(msg.type_pair);

            f3.eq(1).find("span.lb").text(msg.success_integral);
            f3.eq(2).find("span.lb").text(msg.lost_integral);
            f3.eq(4).find("span.lb").text(msg.total);

            var ss = (msg.lost_integral - msg.success_integral) > 0 ? "+" + (msg.lost_integral - msg.success_integral) : (msg.lost_integral - msg.success_integral);
            f3.eq(5).find("span.lb").text(ss);
        }
    });
}



PRO.playSound = function(){         //加分
    if(poker.bool2){
        $(".usezi .p4").text(user.Chips);
            $(".cbtn a").eq(1).unbind("click").click(function () {  //加1分
             
                PRO.Plus(table.roomNum);
           
            });
            $(".cbtn a").eq(2).unbind("click").click(function () {  //加1分
                PRO.Plus((table.roomNum * 10));
            });  
    }

}

PRO.Plus = function(NUB){
      if(poker.bool2){
             var thebest = table.roomNum == 5 ? 2500 : (800 * table.roomNum);
             if(user.Chips == 0 || user.Chips < NUB) { 
                 PRO.Prompt("积分不够，请及时充分");

                 return false;
             }

             // else if(table.bet >= thebest) {
                 
             //     user.Chips +=table.bet;
             //     table.bet = 0;
               
             //     $(".usezi .p4").text(user.Chips);
             //     $(".usezi .p5 span").text(table.bet);
             //     PRO.Prompt("积分超过" + thebest + "上限了"); 
             //     return false;
             // }

             else{
                if(betCount == 0){  //重新计算筹码
                    table.bet = 0;
                }
                table.bet += NUB;
                user.Chips -= NUB;
                
                if(table.bet > thebest){
                    user.Chips +=table.bet;
                    table.bet = 0;
                    $(".usezi .p4").text(user.Chips);
                    $(".usezi .p5 span").text(table.bet);
                    PRO.Prompt("积分超过" + thebest + "上限了"); 
                     PRO.typePlus();
                    return false;
                }else{
                    PRO.typePlus();
                    sound = $("#pokerSound")[0];
                    sound.src= "audio/BET.mp3";
                    sound.play();
                    $(".usezi .p5 span").text(table.bet);
                    $(".usezi .p4").text(user.Chips);
                    betCount = 1;
                }
              }
       }
}


var io = 0;
var sound = "";
PRO.StartGame = function(){   //防止2次点击 需要做  手机网络不行
    $(".cbtn a").eq(0).click(function(){
        var _that = this;
        if(kongge == 0){  //开始游戏
            if(table.bet>0){
                if(betCount != 1 && NetProblemBool){ 
                    user.Chips -= table.bet;
                    if(user.Chips<=0){
                        PRO.Prompt("积分不够，请及时充分");
                        user.Chips += table.bet;
                        betCount = 0;  poker.bool2 = true;
                        return;
                    }else{
                        
                        $(".usezi .p5 span").text(table.bet);
                        $(".usezi .p4").text(user.Chips);
                      }
                 }
                if (table.bet < (table.roomNum * 10)) {       //判断他的最小押分是否合格
                     PRO.Prompt("积分不到" + (table.roomNum * 10) + "分");
                }else{
                    poker.bool2 = false;    //防止继续加分操作
                    kongge = 9;
                    PRO.typePlus();

                  //  var u = 0;
                  //  var soundb = new Audio("audio/123.mp3");

                   // setInterval(function(){
                    //    soundb.src = "audio/"+u+".mp3";
                    //soundb.play();
                     //   u++;
                   // },200);



                    // var onEnded = function() {
                    //     u++;
                    //     this.src= "audio/"+u+".mp3";
                    //     this.play();
                    // };
                    // soundb.addEventListener('ended', onEnded, false);
                    //var u = 0;
                    // var baudio = setInterval(function(){

                    //     if(u>=5){
                    //       clearInterval(baudio);
                    //       return ;
                    //     }
                    //     if(u==0){
                    //       sound = new Audio("audio/"+u+".mp3");
                    //     }else{
                    //        sound.src = "audio/"+u+".mp3"
                    //     }
                    //     sound.load();
                    //     sound.play();  
                    //     u++;
                       
                        
                      
                       
                        
                    // },200);



                 //    function getData3(){
                 //           var defer = $.Deferred();
                 //            $.ajax({
                 //                url : 'http://yifa2017.uk/fpj/index.php/Home/Game/gameStart?token='+user.token,
                 //                 type: "post",
                 //                timeout:2000,
                 //                data:{ name: user.id, itg: table.bet,room: user.room, tableNo: user.tableNum },
                 //                success: function(data){
                 //                   defer.resolve(data)
                 //                }
                 //                // ,
                 //                // error:function(r){
                 //                //    PRO.Prompt('网络太慢,正在努力加载中',2);
                 //                // },
                 //                // complete:function(XMLHttpRequest,status){
                 //                //     if(status == 'timeout' || status == 'error'){   //超时和断网和链接不上 都统一算超时
                 //                //         PRO.Prompt('网络异常,请稍后再试',2);
                 //                //     }
                 //                // }
                 //      });
                 //        return defer.promise();
                 //    }  
                    
                 
                 //    //var soundb = new Audio("audio/123.mp3");
                 // //   soundb.play();
                 //    $.when(getData3()).done(function(msg){
                 //          if(msg.status==100){
                 //                 if(NetProblemBool==false){
                 //                        NetProblemBool = true;
                 //                        KCount = true;
                 //                        $(".prompt").remove();
                 //                  }

                 //                 PRO.initGame();  //初始化游戏
                 //                 poker.bool2 = false;
                 //                 kongge = 9;
                 //                 poker.pkcode = "";

                 //                 poker.pkcode = msg.data.pkcode;
                                
                 //                 PRO.shengyiFUCK();
                                 
                               
                 //                 var faulimg = $(".faul li div img");
                 //                 PRO.FlipPoker(faulimg,poker.pkcode.length,1);     
                 //            }
                 //    });
                 //    console.log(1);


              

                    PRO.Requeset6("gameStart", 2000 ,{ name: user.id, itg: table.bet,room: user.room, tableNo: user.tableNum }, function (msg) {   //获取牌
                            if(msg.status==100){
                                 if(NetProblemBool==false){
                                        NetProblemBool = true;
                                        KCount = true;
                                        $(".prompt").remove();
                                  }

                                 PRO.initGame();  //初始化游戏
                                 poker.bool2 = false;
                                 kongge = 9;
                                 poker.pkcode = "";

                                 poker.pkcode = msg.data.pkcode;

                                 var faulimg = $(".faul li div img");
                                 // var soundb = new Audio("audio/123.mp3");
                                 // soundb.play();
                                 
                                PRO.shengyiFUCK(); 
                                 PRO.FlipPoker(faulimg,poker.pkcode.length,1);   

                            }
                            else if(msg.status==101){
                                 PRO.Prompt('积分不足,请及时充值');
                            }
                    },function(){
                            NetProblemBool = false;
                            kongge = 0;
                            $(".cbtn a").eq(0).click();
                            kongge = 9;
                            PRO.Prompt('网络太慢,正在努力加载中',2);
                    })
                } 
            }
            else{
                PRO.Prompt("请上分");
            }
        }else if(kongge == 1){
             PRO.HCard();  //获取换牌 
        }else if(kongge == 5){  //没分
            PRO.Prompt("请退出游戏充值分数")
        }
    })
}


PRO.typePlus = function () {
    $(".intUl").eq(0).find("li").eq(0).find("span").eq(1).text(mon.Five * table.bet);   //五条
    $(".intUl").eq(0).find("li").eq(1).find("span").eq(1).text(mon.RFlush * table.bet);  // 同花大顺
    $(".intUl").eq(0).find("li").eq(2).find("span").eq(1).text(mon.SFlush * table.bet);  // 同花顺
    $(".intUl").eq(0).find("li").eq(3).find("span").eq(1).text(mon.four * table.bet);  // 四条   
    $(".intUl").eq(0).find("li").eq(4).find("span").eq(1).text(mon.FullHoust * table.bet);   // 葫芦
    $(".intUl").eq(1).find("li").eq(0).find("span").eq(1).text(mon.Flush * table.bet);   // 同花
    $(".intUl").eq(1).find("li").eq(1).find("span").eq(1).text(mon.stra * table.bet);  // 顺子
    $(".intUl").eq(1).find("li").eq(2).find("span").eq(1).text(mon.three * table.bet);  // 三条
    $(".intUl").eq(1).find("li").eq(3).find("span").eq(1).text(mon.two * table.bet);   // 两对
    $(".intUl").eq(1).find("li").eq(4).find("span").eq(1).text(mon.tenBetter * table.bet);  //一对10以上
}

var bk = 0; 
PRO.FlipPoker = function(faulimg,NUM,COUNT){
    var faulimg = faulimg ;
    var i = 0;
  //  if(i == 0){ }

    if(bk<NUM){   
         
             i = bk;
            
            faulimg.eq(i).transition({"opacity":"1"},200,function(){
                 faulimg.eq(i).attr("src", "images/" + poker.pkcode[i] + ".jpg");
                 faulimg.eq(i).attr("id", poker.pkcode[i]); 

                  bk++;
                 


                 if(i>=NUM-1){
                     if(COUNT == 1 ){                     //   开始发牌
                       
                        $(".cbtn a").eq(0).text("开始换牌");
                        PRO.changgePoker();
                        kongge = 1;  //此时可以换牌操作
                        heldArray = selected(poker.pkcode);
                        PRO.Selheld(heldArray);
                        
                 }
                 else if(COUNT == 2 ){              //开始换牌

                       
                        PRO.CanCelTwi();
                        PRO.pokerType(table.type);  //牌型闪动
                        heldArray = selected(poker.pkcode);
                        PRO.Selheld(heldArray); 
                        if(poker.jp == 1){
                            elemet.find(".lb").text((elemet.find(".lb").text()*2));
                            PRO.JPInter();
                            poker.jp = 0 ;
                        }
                        PRO.seMethod();  //结算
                     }
                 }
               
                 PRO.FlipPoker(faulimg,NUM,COUNT);
            });         
        }else{
          bk = 0;
        }
}

PRO.Selheld = function(heldArray){
   // var 
    $(".faul img").removeAttr("held");
     $(".faul span").css("visibility","hidden");

    if(heldArray!=0){
        for(var m = 0;m< heldArray.length - 1; m++){
             $("#" + heldArray[m]).attr("held","true").next().css("visibility", "visible");
        }
        table.type = parseInt(heldArray[heldArray.length - 1]);

      

        PRO.pokerType(table.type);

    }
}

var interTime = null,interTime2 = null;
var elemet ="";

//开始闪动
PRO.integralTwi = function (NUM) {//没有jp
    if(typeof NUM == "number" && NUM < 10 ){
        elemet = $(".intUlGAME").find("li").eq(NUM);
        //zh.attr("blink", "blink");
        clearInterval(interTime);

        interTime = setInterval(function () {
            if (elemet.css("visibility") == "visible") {
                elemet.css("visibility", "hidden");
            } else {
                elemet.css("visibility", "visible");
            }
        }, 300);    
    } 
}

//取消闪动 
PRO.CanCelTwi = function(){ 
    clearInterval(interTime);
    if(elemet) elemet.css("visibility", "visible");
    
}

//JP 闪动
PRO.JPInter = function(){
    var jp = $(".intbarndP p");
    var zh = $(".intbarndP a");
    var ph = elemet.find(".la").text();        
    $(".intbarndP a").text(ph);
    $("#intbarndJp").show();
    

    // interTime = setInterval(function () {
    //         if (jp.css("visibility") == "visible") {
    //             jp.css("visibility", "hidden");
    //         } else {
    //             jp.css("visibility", "visible");
    //         }
    // }, 300); 
    clearTimeout(interTime2);
    interTime2 = setTimeout(function () {
        jp.css("visibility", "visible"); zh.css("visibility", "visible");  $(".intbarndP").css("background","#0402fc");   
            interTime2 && clearTimeout(interTime2);
            interTime2 = setTimeout(function () {
                jp.css("visibility", "hidden"); 
                zh.css("visibility", "hidden");
                $(".intbarndP").css("background","");
                interTime2 && clearTimeout(interTime2);
                PRO.JPInter();

        }, 300);
    }, 300);
}

//取消JP闪动
PRO.CanJPInter = function(){
    clearTimeout(interTime2);
    $("#intbarndJp").hide();
}


PRO.pokerType = function(type){
    var liNo = 10;
    switch (type) {
        case 300: liNo = 0; break;
        case 200: liNo = 1; break;
        case 100: liNo = 2; break;
        case 65:  liNo = 3; break;
        case 15:  liNo = 4; break;
        case 7:   liNo = 5; break;
        case 5:   liNo = 6; break;
        case 3:   liNo = 7; break;
        case 2:   liNo = 8; break;
        case 1:   liNo = 9; break;
    }
    
    PRO.integralTwi(liNo);
}




//换牌
PRO.HCard  = function(){
    if(kongge==1){
        kongge = 8;
        var pokerBox = $(".faul li div img").not($(".faul li div img[held=true]"));  

        if(pokerBox.length != 0){   //没选中
            poker.clickCode = "";
            for (var i = 0 ; i < pokerBox.length; i++) {
                poker.clickCode += i > 0 ? "," + pokerBox[i].id : pokerBox[i].id;
            }  
        }
         if(pokerBox.length == 0){
            poker.clickCode = ""; 
        }

        
      

         PRO.Requeset("cardDel", 2000,{ name: user.id, str: poker.clickCode, room: user.room, tableNo: user.tableNum }, function (msg) {   //获取换的牌
                console.log(msg.status);
                if(msg.status == 100 ) {
                        if(NetProblemBool==false){
                              NetProblemBool = true;
                              KCount = true;
                              $(".prompt").remove();
                         }
                        poker.pkcode = msg.data.pkcode;
                        table.count = msg.data.iswin;    //获得当前得分
                        table.type = msg.data.pktype;     //获得当前牌型
                         //poker.pkcode= [3,26,14,27,13];  //'20', '48', '7', '17', '4'  //['20', '48', '7', '17', '4'];
                        poker.jp = msg.data.pkjp;       //是否Jp? msg.data.pkjp;
                        kongge = 8;
                         //$("#pokerSound1")[0].play();
                        if(pokerBox.length != 0){
                            for (var i = 0; i < pokerBox.length; i++) {      //翻转之前 先盖牌
                                 pokerBox.eq(i).attr("src", "images/pg.png");
                                 
                              
                            }
                            
                            PRO.shengyiFUCK();
                            PRO.FlipPoker(pokerBox,pokerBox.length,2);  
                        }else{
                            PRO.seMethod();  //结算
                        }
                }
           else if(msg.status == 101){
                   PRO.Prompt('服务器异常，重新发牌');
                   PRO.initGame();  //重新开始
                }
         },function(){
                 NetProblemBool = false;
                 kongge = 1;
                 PRO.HCard();
                 kongge = 8;
                 PRO.Prompt('网络太慢,正在努力加载中',2);
                 
                 
         });         
    }
}
        





//选牌 
PRO.changgePoker = function () {  //选牌初始化
    $(".faul li div img").unbind("click").click(function () {
        if (kongge == 1) {
            if ($(this).attr("held") != "true") {
                $(this).attr("held", "true").siblings().css("visibility", "visible");
            }
            else {
                $(this).attr("held", "false").siblings().css("visibility", "hidden");
            }
        }
    })
}

var LostTime;

PRO.seMethod = function(){
   user.Chips = table.count + user.Chips;
   if (table.count > 0) {  //赢了

        $(".cbtn a").eq(0).text("开始结算");
        PRO.settlementChip();

   }else{                 //输了  
        clearTimeout(LostTime); 
        LostTime = setTimeout(function(){
            PRO.initGame();
            $(".intUl li").find("span.lb").text(0);    //加倍提示分数小时
        },500);
        
       $(".usezi .p5 span").text(0);

      sound = $("#pokerSound")[0];

      sound.src= "audio/LOSE.mp3";
    
      sound.play();

       if (user.Chips == 0) {  //如果没有筹码了
            kongge = 5;
       }
   }
}
var zero = null;


PRO.shengyiFUCK = function(){
      sound = $("#pokerSound")[0];
      sound.src= "audio/123.mp3";
      sound.play();
};

PRO.settlementChip = function(){

      sound = $("#pokerSound")[0];
      sound.src= "audio/Win.mp3";
      sound.play();

     kongge = 2;
     $(".cbtn a").eq(0).one("click", function () {
        
        if (kongge == 2) {

            kongge = 3;

            sound = $("#pokerSound")[0];
            sound.src= "audio/ADD.mp3";
            sound.loop = true;
            sound.play();
             clearInterval(zero);
             zero = setInterval(function () {

                var chip = parseInt($(".usezi .p4").text());  
                var blink = parseInt(elemet.find(".lb").text());

                $(".usezi .p4").text(chip + 1);
                //if()
                elemet.find(".lb").text(blink - 1);

                
               

                // src="audio/ADD.mp3"

                table.count--;

                if (table.count <= 0) {
                    clearInterval(zero);
                    sound.loop = false;
                    PRO.CanJPInter();
                    PRO.initGame();
                    $(".usezi .p5 span").text(0);
                    sound = $("#pokerSound")[0];
                    sound.src= "audio/Win.mp3";
                    sound.play();
                  

                    $(".intUl li").find("span.lb").text(0);    //加倍提示分数小时
                }
            }, 60);

            $(".cbtn a").eq(0).one("click", function () {
                if (kongge == 3) {
                    clearInterval(zero);
                    sound.loop = false;
                    table.count = 0;
                    PRO.CanJPInter();
                    PRO.initGame();
                    $(".usezi .p5 span").text(0);
                    sound = $("#pokerSound")[0];
                    sound.src= "audio/Win.mp3";
                    sound.play();
                    $(".intUl li").find("span.lb").text(0);    //加倍提示分数小时
                }
            })

        }



     });
}



PRO.initGame = function(){
    $(".faul .peimg").attr("src", "images/pg.png");
    $(".faul span").css("visibility","hidden");
    $(".faul img").removeAttr("held");
    $(".cbtn a").eq(0).text("开始游戏");
    $(".usezi .p4").text(user.Chips);
    PRO.CanCelTwi();
    PRO.CanJPInter();
    LostTime && clearTimeout(LostTime);
    kongge = 0;
    betCount = 0;
    poker.bool2 = true;
    
}


StartAgain = function () {  //换个房间再来  归零
    $(".usezi .p5 span").text(0);   //筹码归零
    $(".intUl li").find("span.lb").text(0);  //分数显示面板归零
    table.bet = 0;
    user.tableNum = 0;
    table = {  //用户所在桌子信息   
    roomNum: table.roomNum,         //房间分值
    Upper: 0,       //房间押分上线
    the: 0,             //上把玩家筹码
    tableCount: 0,     //桌子的输赢情况
    count: 0,           //当前输赢情况
    ng: 0,               //当前局数
    credit: 0,          //经过输赢之后的筹码   
    bet: 0,             //当前投币情况
    wp: 0,              //个人输赢情况   百分比来记
    Wins: 0,            //在这张桌子赢了多少局
    type: 0             //牌的类型
    }
    k2=0; 

    poker.pkcode = [];
    poker.pokerFilp  = [];
    poker.heldArray = [];
    poker.clickCode = [];

    PRO.initGame();
}



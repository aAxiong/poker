function selected(selarr) {
    var pokers = selarr;
    var c_pk_color = new Array();
    var c_pk_point = new Array();
    var c_obj = {};
    var c_key = 0;
    var key3 = 0;
    var key4 = 0;
    var c_a = 0;
    var n_joker = [];
    var new_pokers = [];
    var ab = [];
    return card();

    function bbb() {
        for (var i = 0; i < pokers.length; i++) {
            if (pokers[i] > 140) {
                new_pokers.push(pokers[i]);
            }
        }
    }

    function ccc(arr) {
        for (var i = 0 ; i < arr.length; i++) {
            new_pokers.push(n_joker[arr[i]]);
        }
        return new_pokers;
    }
    
    function card() {
        var pk_color = [];//存储扑克花色
        var pk_point = [];//存储扑克点数
        var njoker = [];
        for (var key in pokers) {
            if (pokers[key] < 141) {
                var z=pokers[key].substring(0,pokers[key].length-1); //牌
                var h=pokers[key].substr(-1,1); //花色
                njoker.push(pokers[key]);
                z=Number(z);
                h=Number(h);
                pk_color.push(h);
                pk_point.push(z);
            }
        }
        n_joker = njoker;
        bbb(n_joker);
        c_pk_color = pk_color.concat();//保存 花色
        c_pk_point = pk_point.concat();//保存 点数
        var is_Th = cardTh(pk_color);
        var type = cardType(pk_point, is_Th);//判断牌型
        return type;

    }
    //是否是同花
    function cardTh(arr) {
        var is_Th = false;
        var Th = arr[0];
        for (var key in arr) {
            if (arr[key] == Th) {
                is_Th = true;
            } else {
                is_Th = false;
                break;
            }
        }
        if (is_Th) {
            return 1;
        } else {
            return 0;
        }
    }
    function sortNumber(a, b) {
        return a - b
    }

        function ato14(arr){
        var d;
        if(arr[0]==1){
            d=14-arr[1];
        }else{
            d=end(arr)-arr[0];
        }
        return d;
    }
    //判断牌型
    var copyArr = [];
    function cardType(arr, is_Th) {
        var oneto4 = [0, 1, 2, 3, 4];
        arr.sort(sortNumber);//点数从小到大排序
        copyArr = arr.concat();
        var num = pointjl(arr);//点数的次数 数组 从小到大
        var D_value = end(copyArr) - copyArr[0];//差值=数组最大-数组最小
        var c_arr = copyArr.length;
        var des;
        if (copyArr[0] == end(copyArr)) {
            des = ccc(oneto4);
            des.push('300');
            return des;
        } else if ((is_Th == 1 && ato14(copyArr) <= 4 && end(num) == 1 && copyArr[0] == 1 && copyArr[1] > 9)||(is_Th == 1 && ato14(copyArr) <= 4 && end(num) == 1 && copyArr[0] > 9) ) { // 10 J Q K A 同花大顺200
            des = ccc(oneto4);
            des.push('200');
            return des;
        } else if (is_Th == 1 && D_value <= 4 && end(num) == 1 || is_Th == 1 && AtoOne(copyArr) <= 4 && end(num) == 1) {//同花顺 100
            des = ccc(oneto4);
            des.push('100');
            return des;
        } else if (end(num) == 4 || (end(num) == 3 && c_arr == 4) || (end(num) == 2 && c_arr == 3) || (c_arr == 2 && end(num) == 1)) {//四条---四条
            if (c_arr == 4) {
                des = ccc(aaa(key3));
            } else if (c_arr == 3) {
                des = ccc(aaa(c_key));
            } else if (c_arr == 2) {
                des = ccc(aaa(end(copyArr)));
            } else {
                des = ccc(aaa(key4));
            }
            des.push('65');
            //return ''.$value=end($num)>1?array_search(end($num), $num_c):end($arr);
            return des;
        } else if ((end(num) == 3 && num[0] == 2) || (end(num) == 2 && num[0] == 2) || (end(num) == 2 && c_arr == 3)) {//葫芦
            des = ccc(oneto4);
            des.push('15');
            return des;
        } else if (is_Th == 1) {//同花7
            des = ccc(oneto4);
            des.push('7');
            return des;
        } else if ((D_value <= 4 && end(num) == 1) || (AtoOne(copyArr) <= 4 && end(num) == 1)) {//'顺子'5
            des = ccc(oneto4);
            des.push('5');
            return des;
        } else if (end(num) == 3 || (end(num) == 2 && c_arr == 4) || (end(num) == 1 && c_arr == 3)) {//三条
            if (c_arr == 4) {
                des = ccc(aaa(c_key));
            } else if (c_arr == 3) {
                des = ccc(aaa(end(copyArr)));
            } else {
                des = ccc(aaa(key3));
            }
            des.push('3');
            return des;
        }
        else if (end(num) == 2 && num[num.length - 2] == 2) {//'两对'2
            //aaa(end(c_a))
            //aaa(c_a[num.length - 2])
             //console.log(aaa(end(c_a)));
             //console.log(aaa(c_a[num.length - 2]));
            // var arrb1 = aaa(end(c_a));   

            // var arrb2 = aaa(c_a[num.length - 1]);


            // console.log(c_a);
            var arrb1 = aaa(end(d));
            var arrb2 = aaa(d[0]);

           

            var ss = arrb1.concat(arrb2);
            des = ccc(ss);
            des.push('2');
            return des;
        } else if((end(num) == 2 && c_key > 10)||(end(num) == 2 && c_key == 1) || (end(num) == 1 && c_arr == 4 && end(copyArr) > 10)||(end(num) == 1 && c_arr == 4 && copyArr[0] == 1)) {
                if (c_arr == 4) {
                if(copyArr[0] == 1)
                    des = ccc(aaa(copyArr[0]));
                else
                    des = ccc(aaa(end(copyArr)));
            } else {
                des = ccc(aaa(c_key));
            }
            des.push('1');
            return des;
        }
        else {
            return 0;
        }
    }

    function aaa(key) {
        var a = [];
        jQuery.each(c_pk_point, function (i, val) {
            if (val == key) {
                a.push(i);
            }
        });
        return a;
    }

    //遍历值为2的key值
    function valtwo(c_obj, num) {
        jQuery.each(c_obj, function (i, val) {
            if (val == 2) {
                c_key = i;
            }
            if (val == 3) {
                key3 = i;
            }
            if (val == 4) {
                key4 = i;
            }
        });
    }

    function AtoOne(arr) {//把A本为14 转为1
        var difference;
        //var A = end(arr);
        var A = arr[0];
        if (A == 1) {
            A = 14;
            //difference = arr[arr.length - 2] - A;
            difference = A - arr[1];
        } else {
            difference = end(arr) - arr[0];
        }
        return difference;
    }

    function end(arr) {//数组最后一个
        return arr[arr.length - 1];
    }

    function pointjl(array) {//点数记录 并排序
        var a = new Array();//记录点数
        var b = new Array();//记录次数

        var c = [];
        d = [];

        var temp = null, count = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] != -1) {
                temp = array[i];
                for (var j = 0; j < array.length; j++) {

                    if (temp == array[j]) {
                        count++;
                        array[j] = -1;
                       
                    }
                }
                //a.push(temp+":"+count);
                a.push(temp);//点数
                b.push(count);//次数
                c.push({a:temp,b:count});
                count = 0;

                

            }
        }
        c_a = a;



        //console.log("我是b--"+b);
        //console.log("我是a--"+a);
        // console.log(a);
        // console.log(b);


       

        c_obj = objpx(a, b);
        valtwo(c_obj, 2);
        valtwo(c_obj, 3);
        b.sort(sortNumber);//点数从小到大排序
        if(end(b)==2&&b[b.length-2]==2){
             for(x in c){
                  if(c[x].b == 2){
                     d.push(c[x].a);
                  }
             }
        }

      
        return b;
    }

    //对象排序
    function objpx(arryA, arryB) {
        //var arryA =['A','B','C','D'];
        //var arryB =[1,1,2,1];
        var object = new Object();
        for (var i = 0; i < arryA.length; i++) {
            object[arryA[i]] = arryB[i];
        }
        //点数从小到大排序
        return sortObj(object);
    }
    function sortObj(obj) {//对象排序
        var arr = [];
        for (var i in obj) {
            arr.push([obj[i], i]);
        };
        arr.sort(function (a, b) {
            return a[0] - b[0];
        });
        var len = arr.length,
            obj = {};
        for (var i = 0; i < len; i++) {
            obj[arr[i][1]] = arr[i][0];
        }
        return obj;
    }

}


Date.prototype.format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  


function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");

    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      //开始时间
    var eTime = new Date(endTime);  //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}




// var result = GetDateDiff("2017-03-07 22:16:00", new Date().format("yyyy-MM-dd hh:mm:ss"), "second");
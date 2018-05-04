var stime,etime,stimeNum,etimeNum,nowFormatDateNum,strStartTime;
var url=location.search;
var id;
var Request = new Object();
if(url.indexOf("?")!=-1)
{
    var str = url.substr(1);
    strs= str.split("&");
    for(var i=0;i<strs.length;i++)
    {
        Request[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
    }
}
id = Request["adId"];
id = decodeURIComponent(id);
console.log("要修改的这篇广告信息的id是："+id);
setTimeout(selectAdDetail(), 200);
function selectAdDetail() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/ad/selectAdDetail",
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        data:{id:id},
        success:function(data){
            if (data.message=="Success"){
                console.log(">>>>>>>>>>"+data.dataObject.adTitle)
                $("#L_title").val(data.dataObject.adTitle);
                var E = window.wangEditor;
                var editor = new E('#editor');
                // 或者 var editor = new E( document.getElementById('editor') )
                editor.create();
                editor.txt.html(data.dataObject.adHtml);
                var date = new Date(data.dataObject.adStartTime);
                var month = date.getMonth()+1;
                stime=date.getFullYear()+"-"+month+"-"+date.getDate();
                var date2 = new Date(data.dataObject.adEndTime);
                var month2 = date2.getMonth()+1;
                etime=date2.getFullYear()+"-"+month2+"-"+date2.getDate();
                isAdOn();
                $("#updateAd").on('click',(function () {
                    console.log($("#startTime").val());
                    console.log($("#endTime").val());
                    if($("#startTime").val()!=null&&$("#startTime").val().length>0){
                        strStartTime = $("#startTime").val();
                    }
                    console.log("新的广告开始时间是："+strStartTime);
                    var endTime = $("#endTime").val();
                    var money = 0;
                    if (endTime == "") {
                        layui.use('layer', function(){
                            layui.layer.msg('时间不能为空！', { shade: 0.1, time:1000,anim:6});
                        });
                        return false;
                    }else if(strStartTime==endTime){
                        money = AdTypeToMoney($("#type").val());
                    }else {
                        var startNum = parseInt(strStartTime.replace(/-/g, ''), 10);
                        var endNum = parseInt(endTime.replace(/-/g, ''), 10);
                        if (startNum > endNum) {
                            layui.use('layer', function(){
                                layui.layer.msg('结束时间不能在开始时间之前！', { shade: 0.1, time:1000,anim:6});
                            });
                            return false;
                        }

                        if (endNum<nowFormatDateNum){
                            layui.use('layer', function(){
                                layui.layer.msg('请选择今天以及今天之后的时间！', { shade: 0.1, time:1000,anim:6});
                            });
                            return false;
                        }
                        else if(endNum>nowFormatDateNum){
                            if (etimeNum>nowFormatDateNum){//延迟结束时间
                                money = AdTypeToMoney($("#type").val())*DateDiff(etime, endTime);
                            }else {
                                money = AdTypeToMoney($("#type").val())*DateDiff(getNowFormatDate(), endTime);
                            }
                        }
                        else if(endNum<=etimeNum){
                            console.log("00000000000000000000000");
                            money = 0;
                        }
                    }
                    if (money>userMoney){
                        layui.use('layer', function(){
                            layui.layer.msg('余额不足，请先充值！', { shade: 0.1, time:1000,anim:6});
                        });
                        return false;
                    }
                    layer.open({
                        title:'订单确认',
                        content: '<p style="color: #4F99CF">共计价格：'+money+'币</p>\n' +
                        '    <p style="color: #5FB878">使用余额（'+userMoney+'币）</p>'
                        ,btn: ['确认', '取消']
                        ,yes: function(index, layero){
                            //按钮【按钮一】的回调
                            console.log($("#type option:selected"));
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:3002/ad/updateAd",
                                data:{id:id,
                                    type:$("#type").val(),
                                    title:$("#L_title").val(),
                                    html:editor.txt.html(),
                                    text:editor.txt.text(),
                                    price:$("#price").val(),
                                    startTime:strStartTime,
                                    endTime:$("#endTime").val(),
                                    money:money
                                },
                                dataType:'json',
                                xhrFields: {
                                    withCredentials: true
                                },
                                crossDomain: true,
                                success:function(data){
                                    if (data.message=="Success"){
                                        layui.use('layer', function(){
                                            layui.layer.msg('修改成功！');
                                        });
                                    }else{
                                        alert(data.message);
                                    }
                                },
                                error:function(XMLHttpRequest, textStatus, errorThrown){
                                    alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
                                }
                            });
                        }
                        ,btn2: function(index, layero){
                            //按钮【按钮二】的回调
                            //return false 开启该代码可禁止点击该按钮关闭
                        }
                        ,cancel: function(){
                            //右上角关闭回调
                            //return false 开启该代码可禁止点击该按钮关闭
                        }
                    });
                }));
            }else{
                alert(data.message);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("服务器请求错误");
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        }
    });
}
function isAdOn(){
    nowFormatDateNum = parseInt(getNowFormatDate().replace(/-/g, ''), 10);
    stimeNum = parseInt(stime.replace(/-/g, ''), 10);
    etimeNum = parseInt(etime.replace(/-/g, ''), 10);
    console.log(">>>>>>>>>>>>>>>"+getNowFormatDate());
    console.log(">>>>>>>stime>>>>>>>>"+stime);
    console.log(">>>>>>>etime>>>>>>>>"+etime);
    //如果广告已经投放了
    if (stimeNum<nowFormatDateNum){
        layui.use('layer', function(){
            layui.layer.msg('该广告已投放，你不能修改广告开始时间', { shade: 0.1, time:1000,anim:6});
        });
        $("#startTimeDiv").hide();
        strStartTime = stime;
        console.log("isAdOn新的广告开始时间是："+strStartTime);
    }
}


function DateDiff(sDate1, sDate2) {  //sDate1和sDate2是yyyy-MM-dd格式
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);  //转换为yyyy-MM-dd格式
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
    return iDays;  //返回相差天数
}
function AdTypeToMoney(adType){
    if (adType=='公益广告'){
        return 2;
    }else{
        return 5;
    }
}
//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
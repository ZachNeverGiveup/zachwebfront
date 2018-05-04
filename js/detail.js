$("#delAdLink").hide();
$("#updateAdLink").hide();
var userID = "";
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
id = Request["id"];
id = decodeURIComponent(id);
console.log("这篇广告信息的id是："+id);
$("#collect").hide();
$("#cancelCollect").hide();
setTimeout(selectAdDetail(), 200);
/**
 * 查询广告的信息
 */
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
                $("title").text(data.dataObject.adTitle);
                $("#title").text(data.dataObject.adTitle);
                $("#commentNum").html("<i class=\"iconfont\" title=\"评论\">&#xe60c;</i>"+data.dataObject.adCommentNumber);
                $("#clickNum").append(data.dataObject.adClickNumber);
                $("#userName").html(data.dataObject.user.userName);   //userVipGrade
                if (data.dataObject.user.userVerifyStatus=="HAS_AUTHENTICATED"){
                    $("#userVerify2").attr("title","认证信息："+data.dataObject.user.userType+"（已认证）");
                }if (data.dataObject.user.userVerifyStatus=="NO_AUTHENTICATE"){
                    $("#userVerify2").attr("title","认证信息："+data.dataObject.user.userType+"（未认证）");
                }if (data.dataObject.user.userVerifyStatus=="PENDING"){
                    $("#userVerify2").attr("title","认证信息："+data.dataObject.user.userType+"（认证中）");
                }
                $("#userVipGrade").html("VIP"+data.dataObject.user.userVipGrade);
                $("#detail-body").html(data.dataObject.adHtml);
                var date = new Date(data.dataObject.adAddTime);
                var month = date.getMonth()+1;
                $("#adaddtime").html(date.getFullYear()+"-"+month+"-"+date.getDate());
                $("#adPrice").hide();
                if(data.dataObject.adPrice!=null){
                    $("#adPrice").show();
                    $("#adPrice").html("产品价格：￥"+data.dataObject.adPrice);
                }
                userID=data.dataObject.user.userId;
            }else{
                alert(data.message);
                window.location.href = "http://localhost:3000/html/index.html";
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

/**
 * 查询广告的评论信息
 */
$.ajax({
    type: "POST",
    url: "http://localhost:3002/findComments",
    data:{adId:id},
    dataType:'json',
    xhrFields: {
        withCredentials: true
    },
    success:function(data){
        if (data.message=="Success"){
            var cms = "<ul class=\"jieda\" id=\"jieda\">";
            $.each(data.dataObject,function (index,cm) {
                var date = new Date(cm.commentTime);
                var month = date.getMonth()+1;
                cms += "<li id='"+cm.commentId+"' data-id=\"111\">\n" +
                    "            <a name=\"item-1111111111\"></a>\n" +
                    "            <div class=\"detail-about detail-about-reply\">\n" +
                    "              <a class=\"fly-avatar\" href=\"\">\n" +
                    "                <img src=\"https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg\" alt=\" \">\n" +
                    "              </a>\n" +
                    "              <div class=\"fly-detail-user\">\n" +
                    "                <a href=\"\" class=\"fly-link\">\n" +
                    "                  <cite>"+cm.user.userName+"</cite>\n" +
                    "                </a>\n" +
                    "              </div>\n" +
                    "              <div class=\"detail-hits\">\n" +
                    "                <span>"+date.getFullYear()+"-"+month+"-"+date.getDate()+"</span>\n" +
                    "              </div>\n" +
                    "            </div>\n" +
                    "            <div class=\"detail-body jieda-body photos\">\n" +
                    "              <p id='commentContent'>"+cm.commentContent+"</p>\n" +
                    "            </div>\n" +
                    "            <div class=\"jieda-reply\">\n" +
                    "              <span>\n" +
                    "                <i class=\"iconfont icon-zan\"></i>\n" +
                    "                <em>0</em>\n" +
                    "              </span>\n" +
                    "              <div class=\"jieda-admin\">\n" +
                    "                <span>编辑</span>\n" +
                    "                <a href=\"javascript:commentDel("+cm.commentId+");\">删除</a>\n" +
                    "              </div>\n" +
                    "            </div>\n" +
                    "          </li>";
            });
            cms += "</ul>";
            $("#ccc").html(cms);
        }else{
            alert(data.message);
        }
    },
    error:function(XMLHttpRequest, textStatus, errorThrown){
        alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
    }
});

function commentDel(commentId){
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/delComment",
        data:{id:commentId},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            if (data.message=="Success"){
                $("#"+commentId+"").remove();
            }else{
                alert(data.message);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
        }
    });
}



/**
 * 查询是否这条广告是否被收藏
 */
$.ajax({
    type: "POST",
    url: "http://localhost:3002/ad/isCollectAd",
    data:{id:id},
    dataType:'json',
    xhrFields: {
        withCredentials: true
    },
    success:function(data){
        if (data.message=="Success"){
            if(data.dataObject=="true"){
                $("#cancelCollect").show();
            }else if (data.dataObject=="false"){
                $("#collect").show();
            }
        }else{
            alert(data.message);
        }
    },
    error:function(XMLHttpRequest, textStatus, errorThrown){
        alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
    }
});

/**
 * 收藏
 */
$("#collect").on('click',(function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/ad/collectAd",
        data:{id:id},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            if (data.message=="Success"){
                layui.use('layer', function(){
                    layui.layer.msg('收藏成功',{anim: 4});
                });
                $("#collect").hide();
                $("#cancelCollect").show();
            }else{
                alert(data.message);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
        }
    });
}));

/**
 * 取消收藏
 */
$("#cancelCollect").on('click',(function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/ad/cancelCollectAd",
        data:{id:id},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            if (data.message=="Success"){
                layui.use('layer', function(){
                    layui.layer.msg('取消收藏成功',{anim: 4});
                });
                $("#cancelCollect").hide();
                $("#collect").show();
            }else{
                alert(data.message);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
        }
    });
}));
/**
 *跳转编辑广告页面
 */
$("#updateAdLink").on('click',(function () {
    window.location.href = "http://localhost:3000/html/jie/update.html?adId="+id;
}));

/**
 *删除广告
 */
$("#delAdLink").on('click',(function () {
    layer.open({
        title:'广告信息删除',
        content: '你确认删除这条广告吗？你将失去所有信息！'
        ,btn: ['确认', '取消']
        ,yes: function(index, layero){
            //按钮【按钮一】的回调
            $.ajax({
                type: "POST",
                url: "http://localhost:3002/ad/delAd",
                data:{id:id},
                dataType:'json',
                xhrFields: {
                    withCredentials: true
                },
                success:function(data){
                    if (data.message=="Success"){
                        layui.use('layer', function(){
                            layui.layer.msg('删除成功');
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
window.onload=findUserToHeader;
var userID1;
function findUserToHeader() {
    $("#hasLogin").hide();
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/findUser",
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
            if (data.message=="Success"){
                if(null!=data.dataObject.userName){
                    /*layui.use('layer', function(){
                        layui.layer.msg('已为您自动登录', { shade: 0.1, time:500,anim:4});
                    });*/
                    $("#username1").html(data.dataObject.userName);
                    $("#userVIPGrade1").html("VIP"+data.dataObject.userVipGrade);
                    if (data.dataObject.userVerifyStatus=="HAS_AUTHENTICATED"){
                        $("#userVerify").attr("title","认证信息："+data.dataObject.userType+"（已认证）");
                    }if (data.dataObject.userVerifyStatus=="NO_AUTHENTICATE"){
                        $("#userVerify").hide();
                    }if (data.dataObject.userVerifyStatus=="PENDING"){
                        $("#userVerify").hide();
                    }
                    $("#unLogin").hide();
                    $("#hasLogin").show();
                    userMoney = data.dataObject.userMoney;
                    userID1 = data.dataObject.userId;
                    if (userID1==userID){
                        $("#delAdLink").show();
                        $("#updateAdLink").show();
                    }
                }else{
                    layui.use('layer', function(){
                        layui.layer.msg('请先登录！', {icon:2, shade: 0.1, time:1000});
                    });

                }
            }else{
                alert(data.message);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("服务器请求错误>>>"+XMLHttpRequest.status+">>>"+XMLHttpRequest.readyState+">>>"+textStatus+errorThrown);
        }
    });
}
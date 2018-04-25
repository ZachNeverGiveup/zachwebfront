window.onload=findUser;
//window.onload=findUserAd;
function findUser() {
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
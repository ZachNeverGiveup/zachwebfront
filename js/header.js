if($("#admin_user").length>0){
    $("#admin_user").hide();
}
if($("#admin_ad").length>0){
    $("#admin_ad").hide();
}
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
                    /*if (userID1==userID){
                        $("#delAdLink").show();
                        $("#updateAdLink").show();
                    }*/
                    if (parseInt(data.dataObject.userGrade)<=0){
                        if($("#addDiv").length>0){
                            console.log("没有发表广告的权限");
                            $("#addDiv").remove();
                            layer.open({
                                title:'没有发表广告的权限',
                                content: '你已被限制在本站发表信息的权限~'
                                ,btn: ['申请权限', '返回首页']
                                ,yes: function(index, layero){
                                    layer.msg("已向管理员申请！");
                                }
                                ,btn2: function(index, layero){
                                    window.location.href = "http://localhost:3000/html/index.html";
                                }
                                ,cancel: function(){
                                    //右上角关闭回调
                                    //return false 开启该代码可禁止点击该按钮关闭
                                }
                            });
                        }

                    }
                    if (parseInt(data.dataObject.userGrade)<2){
                        if ($(".layui-table").length>0){
                            layer.msg("没有权限！！");
                            window.location.href = "http://localhost:3000/html/index.html";
                        }
                        if($("#admin_user").length>0){
                            $("#admin_user").remove();
                        }
                        if($("#admin_ad").length>0){
                            $("#admin_ad").remove();
                        }
                    }
                    if (parseInt(data.dataObject.userGrade)>2){
                        if($("#admin_user").length>0){
                            $("#admin_user").show();
                        }
                        if($("#admin_ad").length>0){
                            $("#admin_ad").show();
                        }
                    }
                }else{
                    layui.use('layer', function(){
                        layui.layer.msg('请先登录！', {icon:2, shade: 0.1, time:1000});
                    });
                    if($("#addDiv").length>0){
                        console.log("没有发表广告的权限");
                        $("#addDiv").remove();
                        layer.open({
                            title:'没有发表广告的权限',
                            content: '你已被限制在本站发表信息的权限~'
                            ,btn: ['申请权限', '返回首页']
                            ,yes: function(index, layero){
                                layer.msg("已向管理员申请！");
                            }
                            ,btn2: function(index, layero){
                                window.location.href = "http://localhost:3000/html/index.html";
                            }
                            ,cancel: function(){
                                //右上角关闭回调
                                //return false 开启该代码可禁止点击该按钮关闭
                            }
                        });
                    }
                    if ($(".layui-table").length>0){
                        layer.msg("没有权限！！");
                        window.location.href = "http://localhost:3000/html/index.html";
                    }
                    if($("#admin_user").length>0){
                        $("#admin_user").remove();
                    }
                    if($("#admin_ad").length>0){
                        $("#admin_ad").remove();
                    }
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
window.onload=findUser;
//window.onload=findUserAd;
function findUser() {
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
                if (null==data.dataObject.userName){
                    $("#unLogin").show();
                    $("#hasLogin").hide();
                }else{
                    $("#username1").html(data.dataObject.userName);
                    $("#adstitle").html(data.dataObject.userName+"    的最近发表");
                    $("#commentstitle").html(data.dataObject.userName+"    的最近评论");
                    $("#userVIPGrade1").html("VIP"+data.dataObject.userVipGrade);
                    $("#userNameAndImg").html(data.dataObject.userName);
                    if (data.dataObject.userVerifyStatus=="HAS_AUTHENTICATED"){
                        $("#userType").html("认证信息："+data.dataObject.userType+"（已认证）");
                    }if (data.dataObject.userVerifyStatus=="NO_AUTHENTICATE"){
                        $("#userType").html("认证信息："+data.dataObject.userType+"（未认证）");
                    }if (data.dataObject.userVerifyStatus=="PENDING"){
                        $("#userType").html("认证信息："+data.dataObject.userType+"（认证中）");
                    }
                    $("#userVIPGrade2").html("VIP"+data.dataObject.userVipGrade);
                    $("#userMoney").html(data.dataObject.userMoney+" Zach币");
                    $("#userCity").html("来自"+data.dataObject.userCity);
                    var date = new Date(data.dataObject.userRegistTime);
                    var month = date.getMonth()+1;
                    $("#usertime").html(date.getFullYear()+"-"+month+"-"+date.getDate()+"加入");
                    if(data.dataObject.userSignature!=null&&data.dataObject.userSignature!="undefined"&&data.dataObject.userSignature!=""){
                        $("#usersignature").html("（"+data.dataObject.userSignature+"）");
                    }else{
                        $("#usersignature").html("这名用户很懒，什么也没有留下~");
                    }
                    $("#unLogin").hide();

                }
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
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/ad/findUserAd",
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
            if (data.message=="Success"){
                if(null==data.dataObject&&data.state==0){
                    $("#ads").html("您还没有发表过任何内容，快去发表吧！~");
                }else{
                    var ads = "";
                    $.each(data.dataObject,function (index,ad) {
                        var date = new Date(ad.adLastUpdateTime);
                        var month = date.getMonth()+1;
                        var title=ad.adTitle;
                        if (title.length>20){
                            title = title.substring(0,19)+"……";
                        }
                        ads += "<li>\n" +
                            "            <a href=\"../jie/detail.html?id="+ad.adId+"\" class=\"jie-title\">"+title+"</a>\n" +
                            "            <i>"+date.getFullYear()+"-"+month+"-"+date.getDate()+"</i>\n" +
                            "            <em class=\"layui-hide-xs\">"+ad.adClickNumber+"点击/"+ad.adCollectNumber+"收藏/"+ad.adCommentNumber+"评论</em>\n" +
                            "          </li>";
                    });
                    $("#ads").html(ads);
                }

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

/*function findUserAd(){
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/ad/findUserAd",
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success:function(data){
            if (data.message=="Success"){
                var ads = "";
                $.each(data.dataObject,function (index,ad) {
                    var date = new Date(ad.adLastUpdateTime);
                    var month = date.getMonth()+1;
                    var title=ad.adTitle;
                    if (title.length>20){
                        title = title.substring(0,19)+"……";
                    }
                    ads += "<li>\n" +
                        "            <a href=\"\" class=\"jie-title\">"+title+"</a>\n" +
                        "            <i>"+date.getFullYear()+"-"+month+"-"+date.getDate()+"</i>\n" +
                        "            <em class=\"layui-hide-xs\">"+ad.adClickNumber+"点击/"+ad.adCollectNumber+"收藏/"+ad.adCommentNumber+"评论</em>\n" +
                        "          </li>";
                });
                $("#ads").html(ads);
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
}*/


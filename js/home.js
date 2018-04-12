window.onload=findUser;
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
                console.log(data.dataObject.userName);
                $("#username1").html(data.dataObject.userName);
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


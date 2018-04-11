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

                $("#userType").html("认证信息："+data.dataObject.userType);
                $("#userVIPGrade2").html("VIP"+data.dataObject.userVipGrade);
                $("#userMoney").html(data.dataObject.userMoney+" Zach币");
                $("#userCity").html("来自"+data.dataObject.userCity);
                var date = new Date(data.dataObject.userRegistTime);
                $("#usertime").html(date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+"加入");
                $("#usersignature").html("（"+data.dataObject.userSignature+"）")
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


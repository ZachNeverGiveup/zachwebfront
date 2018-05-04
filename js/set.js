
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
                $("#L_email").val(data.dataObject.userEmail);
                $("#L_username").val(data.dataObject.userName);
                $("#L_city").val(data.dataObject.userCity);
                console.log(">>>>>>>>>>>>>>>>sex"+data.dataObject.userSex);
                $("input[name='sex'][value="+data.dataObject.userSex+"]").prop("checked", true);
                if(data.dataObject.userSignature!=null&&data.dataObject.userSignature!="undefined"&&data.dataObject.userSignature!=""){
                    $("#L_sign").val(data.dataObject.userSignature);
                }else{
                    $("#L_sign").val("这名用户很懒，什么也没有留下~");
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

//updateUserInfo
$("#updateUserInfo").on('click',(function () {
    var username = $("#L_username").val();
    var email = $("#L_email").val();
    var city = $("#L_city").val();
    var signature = $("#L_sign").val();
    console.log("username"+username);
    console.log("email"+email);
    console.log("city"+city);
    console.log("user_signature"+signature);
        $.ajax({
            type: "POST",
            url: "http://localhost:3002/updateUserInfo/",
            data:{userName:username,
                userEmail:email,
                userCity:city,
                userSignature:signature},
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success:function(data){
                //alert("data-->"+data);
                /* setTimeout(function(){window.location.href = "login.html"},800);*/
                if (data.message=="Success"){
                    //alert("data-->"+data.message);
                    layui.use('layer', function(){
                        layui.layer.msg('修改成功！');
                    });
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
}));
/**
 * 修改密码
 */
$("#resetPwd").on('click',(function () {
    var password = $("#L_pass").val();
    var repassword = $("#L_repass").val();
    console.log("password"+password);
    console.log("repassword"+repassword);
    //比较两次密码是否一致
    if(password!=repassword){
        layui.use('layer', function(){
            layui.layer.msg('两次的密码不一致！！', {icon:2, shade: 0.1, time:1000,anim:4});
        });
    }else {
        console.log("两次的密码一致");
        $.ajax({
            type: "POST",
            url: "http://localhost:3002/updatePassword",
            data:{oldPassword:$("#L_nowpass").val(),
                newPassword:password},
            dataType:'json',
            xhrFields: {
                withCredentials: true
            },
            success:function(data){
                if (data.message=="Success"){
                    layui.use('layer', function(){
                        layui.layer.msg('密吗修改成功！请重新登陆！');
                    });
                    setTimeout(function () {
                            window.location.href = "http://localhost:3000/html/user/login.html";
                        }
                        , 1000);
                }else{
                    alert(data.message);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
            }
        });
    }

}));


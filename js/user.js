/**
 * 用户注册
 */
$("#regSubmit").on('click',(function () {
        var username = $("#L_username").val();
        var sex = $("input[name='sex']:checked").val();
        var type = $("input[name='type']:checked").val();
        var phone = $("#L_phone").val();
        var email = $("#L_email").val();
        var city = $("#L_city").val();
        var signature = $("#L_signature").val();
        var password = $("#L_pass").val();
        var repassword = $("#L_repass").val();
        console.log("username"+username);
        console.log("sex"+sex);
        console.log("password"+password);
        console.log("repassword"+repassword);
        console.log("type"+type);
        console.log("phone"+phone);
        console.log("email"+email);
        console.log("city"+city);
        console.log("user_signature"+signature);
        //比较两次密码是否一致
        if(password!=repassword){
            alert("两次的密码不一致！！！");
        }else{
            console.log("两次的密码一致");
            $.ajax({
                type: "POST",
                url: "http://localhost:3002/regist/",
                data:{userName:username,
                    userPassword:password,
                    userType:type,
                    userPhone:phone,
                    userEmail:email,
                    userSex:sex,
                    userCity:city,
                    userSignature:signature},
                dataType:'json',
                success:function(data){
                    //alert("data-->"+data);
                   /* setTimeout(function(){window.location.href = "login.html"},800);*/
                   if (data.message=="Success"){
                        //alert("data-->"+data.message);
                        window.location.href = "login.html?userName="+username;
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
    }));

/**
 * 用户登录
 */
$("#loginBtn").on('click',(function () {
    var username = $("#userName").val();
    var password = $("#L_pass").val();
    console.log("username"+username);
    console.log("password"+password);

    $.ajax({
        type: "POST",
        url: "http://localhost:3002/login/",
        data:{userName:username,
            userPassword:password},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            if (data.message=="Success"){
                window.location.href = "home.html";
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
 * 忘记密码发送验证码
 *sendCode
 */
//点击获取验证码事件 code
var countdown = 60;
function settime(obj) {
    if (countdown == 0) {
        obj.removeClass("layui-btn-disabled");
        obj.html("免费获取验证码");
        countdown = 60;
        return;
    } else {
        obj.addClass("layui-btn-disabled");
        obj.html("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function () {
            settime(obj)
        }
        , 1000)
}
$("#sendCode").on('click',(function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/sendCode",
        data:{email:$("#L_email").val()},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            if (data.message=="Success"){
                layui.use('layer', function(){
                    layui.layer.msg('验证码已发送');
                });
                var obj = $("#sendCode");
                settime(obj);
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
 * 验证码提交
 *sendCode
 */

$("#codeSubmit").on('click',(function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/verifyCode",
        data:{code:$("#L_vercode").val()},
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            if (data.message=="Success"){
                layui.use('layer', function(){
                    layui.layer.msg('验证码验证成功');
                });

            }else{
                alert(data.message);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
        }
    });
}));
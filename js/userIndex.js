window.onload=userAd();
function userAd() {
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
};

$("#userCollect").on('click',(function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:3002/ad/findUserCollect",
        dataType:'json',
        xhrFields: {
            withCredentials: true
        },
        success:function(data){
            if (data.message=="Success"){
                if(null==data.dataObject&&data.state==0){
                    $("#adcs").html("您还没有收藏过任何内容，快去收藏吧！~");
                }else{
                    var ads = "";
                    $.each(data.dataObject,function (index,adCollect) {
                        var date = new Date(adCollect.collectTime);
                        var month = date.getMonth()+1;
                        var title=adCollect.ad.adTitle;
                        if (title.length>20){
                            title = title.substring(0,19)+"……";
                        }
                        ads += "<li>\n" +
                            "            <a href=\"../jie/detail.html?id="+adCollect.ad.adId+"\" class=\"jie-title\">"+title+"</a>\n" +
                            "            <i>收藏于"+date.getFullYear()+"-"+month+"-"+date.getDate()+"</i>\n" +
                            "            <em class=\"layui-hide-xs\">"+adCollect.ad.adClickNumber+"点击/"+adCollect.ad.adCollectNumber+"收藏/"+adCollect.ad.adCommentNumber+"评论</em>\n" +
                            "          </li>";
                    });
                    $("#adcs").html(ads);
                }
            }else{
                alert(data.message);
            }
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
        }
    });
}));
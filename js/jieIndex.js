var url=location.search;
var type,sortType,page;
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
type = Request["type"];
type = decodeURIComponent(type);
sortType = Request["sortType"];
sortType = decodeURIComponent(sortType);
page = Request["page"];
page = decodeURIComponent(page);
if (sortType==null||sortType=="undefined"||sortType.length<0){
    sortType=1;
}
if (page==null||page=="undefined"||page.length<0){
    page=1;
    url=url+"&page=1";
}
console.log("这个页面的广告类型是："+type);
console.log("这个页面的排序方式是："+sortType);
console.log("这个页面的页码是："+page);
$("#" + type + "").addClass("layui-this");
$("#newHref").attr("href",url.substring(0,url.indexOf(type)+1));
$("#sortHref").attr("href",url+"&sortType=2");
if (sortType==2){
    $("#sortHref").addClass("layui-this");
    $("#newHref").removeClass("layui-this");
}


$.ajax({
    type: "POST",
    url: "http://localhost:3002/ad/selectAdList",
    data:{adType:type,sortType:sortType},
    dataType:'json',
    xhrFields: {
        withCredentials: true
    },
    success:function(data){

        if (data.message=="Success"){
            var ads = "";
            var adclicks = "<dt id='addt' class=\"fly-panel-title\">热门点击</dt>";
            $.each(data.dataObject.indexAdList,function (index,ad) {
                var date = new Date(ad.adLastUpdateTime);
                var month = date.getMonth() + 1;
                var title = ad.adTitle;
                if (title.length > 20) {
                    title = title.substring(0, 19) + "……";
                }
                if (ad.adPrice==null){
                    ad.adPrice="价格未定";
                }
                ads += "<li>\n" +
                    "            <a href=\"user/home.html\" class=\"fly-avatar\">\n" +
                    "              <img src=\"https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg\" alt=\"张弛\">\n" +
                    "            </a>\n" +
                    "            <h2>\n" +
                    "              <a class=\"layui-badge\">"+ad.adType+"</a>\n" +
                    "              <a href=\"javascript:void(0);\" onclick=\"openAdDetail("+ad.adId+",&quot;"+ad.adTitle+"&quot;)\">"+title+"</a>\n" +
                    "            </h2>\n" +
                    "            <div class=\"fly-list-info\">\n" +
                    "              <a href=\"user/home.html\" link>\n" +
                    "                <cite>"+ad.user.userName+"</cite>\n" +
                    "                <!--\n" +
                    "                <i class=\"iconfont icon-renzheng\" title=\"认证信息：XXX\"></i>\n" +
                    "                <i class=\"layui-badge fly-badge-vip\">VIP3</i>\n" +
                    "                -->\n" +
                    "              </a>\n" +
                    "              <span id=\"time\">"+date.getFullYear()+"-"+month+"-"+date.getDate()+"</span>\n" +
                    "              \n" +
                    "              <span class=\"fly-list-kiss layui-hide-xs\" title=\"价格\"><i class=\"iconfont icon-price\"></i>"+ad.adPrice+"</span>\n" +
                    "              <!--<span class=\"layui-badge fly-badge-accept layui-hide-xs\">已结</span>-->\n" +
                    "              <span class=\"fly-list-nums\"> \n" +
                    "                <i class=\"iconfont icon-pinglun1\" title=\"评论\"></i> "+ad.adCommentNumber+"\n" +
                    "              </span>\n" +
                    "            </div>\n" +
                    "            <div class=\"fly-list-badge\">\n" +
                    "              <!--<span class=\"layui-badge layui-bg-red\">精帖</span>-->\n" +
                    "            </div>\n" +
                    "          </li>";

            });
            $.each(data.dataObject.indexAdListClick,function (index,ad) {
                var date = new Date(ad.adLastUpdateTime);
                var month = date.getMonth() + 1;
                var title = ad.adTitle;
                if (title.length > 15) {
                    title = title.substring(0, 15) + "……";
                }

                adclicks += "<dd>\n" +
                    "          <a href=\"javascript:void(0);\"  onclick=\"openAdDetail("+ad.adId+",&quot;"+ad.adTitle+"&quot;)\">"+title+"</a>\n" +
                    "          <span><i class=\"layui-icon \" style=\"font-size: 30px; color: #cc0000; padding-right: 0px\">&#xe756;</i> "+ad.adClickNumber+"</span>\n" +
                    "        </dd>";
                $("#addt").html(ad.adType);
            });
            $("#adIndexList").html(ads);
            $("#adclicks").html(adclicks);
            var pageHtml;
            if (page!=1){
                pageHtml="<a href=\""+url.substring(0,url.indexOf("page")-1)+"&page="+(parseInt(page)-1)+"\">上一页</a>\n";
            }
            pageHtml+="<span class=\"laypage-curr\">"+page+"</span>\n" +
                "            <a href=\""+url.substring(0,url.indexOf("page")-1)+"&page="+(parseInt(page)+1)+"\">"+(parseInt(page)+1)+"</a>\n" +
                "            <a href=\""+url.substring(0,url.indexOf("page")-1)+"&page="+(parseInt(page)+2)+"\">"+(parseInt(page)+2)+"</a>\n" +
                "            <a href=\""+url.substring(0,url.indexOf("page")-1)+"&page="+(parseInt(page)+3)+"\">"+(parseInt(page)+3)+"</a>\n" +
                "            <a href=\""+url.substring(0,url.indexOf("page")-1)+"&page="+(parseInt(page)+4)+"\">"+(parseInt(page)+4)+"</a>\n" +
                /*"            <span>…</span><a href=\"/jie/page/148/\" class=\"laypage-last\" title=\"尾页\">尾页</a>\n" +*/
                "            <a href=\""+url.substring(0,url.indexOf("page")-1)+"&page="+(parseInt(page)+1)+"\" class=\"laypage-next\">下一页</a>";
            $("#pageDiv").html(pageHtml);
        }else{
            alert(data.message);
        }
    },
    error:function(XMLHttpRequest, textStatus, errorThrown){
        alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
    }
});
function openAdDetail(id,title) {
    console.log("id:"+id);
    console.log("title:"+title);
    layer.open({
        type: 2,
        title: title,
        shadeClose: true,
        shade: false,
        maxmin: true, //开启最大化最小化按钮
        area: ['893px', '600px'],
        content: 'http://localhost:3000/html/jie/detail.html?id='+id
    });
}




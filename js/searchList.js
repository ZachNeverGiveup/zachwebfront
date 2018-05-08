var url=location.search;
var wd;
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
wd = Request["wd"];
wd = decodeURIComponent(wd);
console.log("关键词是："+wd);
$("title").html("“"+wd+"”的搜索结果");
$("#barTitle").html("“"+wd+"”的搜索结果");
$.ajax({
    type: "POST",
    url: "http://localhost:3002/ad/searchAds",
    data:{keyword:wd},
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
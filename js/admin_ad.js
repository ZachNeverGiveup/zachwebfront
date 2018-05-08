layui.use('table', function(){
    var table = layui.table;
    //监听表格复选框选择
    table.on('checkbox(demo)', function(obj){
        console.log(obj)
    });
    //监听工具条
    table.on('tool(demo)', function(obj){
        var data = obj.data;
        /*if (parseInt(data.userId)<2){
            $("#DEL").remove();
        }*/
        if(obj.event === 'detail'){
            layer.open({
                type: 2,
                title: data.adTitle,
                shadeClose: true,
                shade: false,
                maxmin: true, //开启最大化最小化按钮
                area: ['893px', '600px'],
                content: 'http://localhost:3000/html/jie/detail.html?id='+data.adId
            });
        } else if(obj.event === 'del'){
            layer.confirm('确定要删除该广告么', function(index){
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3002/ad/delAd",
                    data:{id:data.adId},
                    dataType:'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    success:function(data){
                        if (data.message=="Success"){
                            layui.use('layer', function(){
                                layui.layer.msg('删除成功');
                            });
                        }else{
                            alert(data.message);
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
                    }
                });
                obj.del();
                layer.close(index);
            });
        }
    });
    /* table.on('tool(demo2)', function(obj){
         if (obj.event === 'passV'){
             alert("111111111");
         }
     });*/
    var $ = layui.$, active = {
        getCheckData: function(){ //获取选中数据
            var checkStatus = table.checkStatus('idTest')
                ,data = checkStatus.data;
            layer.alert(JSON.stringify(data));
        }
        ,getCheckLength: function(){ //获取选中数目
            var checkStatus = table.checkStatus('idTest')
                ,data = checkStatus.data;
            layer.msg('选中了：'+ data.length + ' 个');
        }
        ,isAll: function(){ //验证是否全选
            var checkStatus = table.checkStatus('idTest');
            layer.msg(checkStatus.isAll ? '全选': '未全选')
        }
    };

    $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});
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
            layer.alert('ID：'+ data.userId + ' 的查看操作'+ JSON.stringify(data));
        } else if(obj.event === 'del'){
            layer.confirm('确定要删除该用户么', function(index){
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3002/delUser",
                    data:{id:data.userId},
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
        } else if(obj.event === 'edit'){
            if(data.userGrade != 1 ){
                layer.open({
                    content: '该用户没有发表信息权限'
                    ,btn: ['授予权限']
                    ,btnAlign: 'c'
                    ,yes: function(index, layero){
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3002/givePermission",
                            data:{id:data.userId},
                            dataType:'json',
                            xhrFields: {
                                withCredentials: true
                            },
                            success:function(data){
                                if (data.message=="Success"){
                                    layui.use('layer', function(){
                                        layui.layer.msg('该用户目前已具备发表权限~');
                                    });
                                }else{
                                    alert(data.message);
                                }
                            },
                            error:function(XMLHttpRequest, textStatus, errorThrown){
                                alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
                            }
                        });
                    }
                    ,cancel: function(){
                        //右上角关闭回调

                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            }else if(data.userGrade != 0 ){
                layer.open({
                    content: '该用户具有发表信息权限'
                    ,btn: ['撤回权限']
                    ,btnAlign: 'c'
                    ,yes: function(index, layero){
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3002/delPermission",
                            data:{id:data.userId},
                            dataType:'json',
                            xhrFields: {
                                withCredentials: true
                            },
                            success:function(data){
                                if (data.message=="Success"){
                                    layui.use('layer', function(){
                                        layui.layer.msg('该用户目前已没有发表权限~');
                                    });
                                }else{
                                    alert(data.message);
                                }
                            },
                            error:function(XMLHttpRequest, textStatus, errorThrown){
                                alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
                            }
                        });
                    }
                    ,cancel: function(){
                        //右上角关闭回调
                        //return false 开启该代码可禁止点击该按钮关闭
                    }
                });
            }
            /*layer.alert('编辑行：<br>'+ JSON.stringify(data))*/
        }else if (obj.event === 'passV'){
            layer.open({
                content: '该用户正在申请信息认证，请仔细核实身份后通过认证~'
                ,btn: ['通过认证']
                ,btnAlign: 'c'
                ,yes: function(index, layero){
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3002/giveAuthenticated",
                        data:{id:data.userId},
                        dataType:'json',
                        xhrFields: {
                            withCredentials: true
                        },
                        success:function(data){
                            if (data.message=="Success"){
                                layui.use('layer', function(){
                                    layui.layer.msg('该用户目前已认证~');
                                });
                            }else{
                                alert(data.message);
                            }
                        },
                        error:function(XMLHttpRequest, textStatus, errorThrown){
                            alert("服务器请求错误>>"+XMLHttpRequest.status+XMLHttpRequest.readyState+textStatus+errorThrown);
                        }
                    });
                }
                ,cancel: function(){
                    //右上角关闭回调
                    //return false 开启该代码可禁止点击该按钮关闭
                }
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
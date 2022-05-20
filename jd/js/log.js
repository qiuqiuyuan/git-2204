var userInp = document.getElementById("user");
    var userSpan = document.getElementById("user_span");

    var pwdInp = document.getElementById("pwd");
    var pwdSpan = document.getElementById("pwd_span");

    var btn = document.getElementById("btn");

    btn.onclick = function () {
        // 用户输入的
        var user = userInp.value;
        var pwd = pwdInp.value;

        if (!user) {
            layui.use('layer', function () {
                var layer = layui.layer;

                layer.alert("请输入用户名！", { title: "提醒" }, function () {
                    layer.close(layer.index);
                });
            });
        } else if (!pwd) {
            layui.use('layer', function () {
                var layer = layui.layer;

                layer.alert("请输入密码！", { title: "提醒" }, function () {
                    layer.close(layer.index);
                });
            });
        } else {

            login({ user, pwd}).then(data => {
                var { status, message } = data;
                if (status) {
                    setCookie("lgc", user, 31);
                    location.href = "index.html";
                } else {
                    layui.use('layer', function () {
                        var layer = layui.layer;

                        layer.confirm(message, { title: "提醒" }, function () {
                            console.log("点击了确认")
                            layer.close(layer.index);
                        }, function () {
                            console.log("点击了取消")
                        });
                    });
                }
            }).catch(err => {
                throw err;
            })

    
        }

    }
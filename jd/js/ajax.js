
// 模拟封装jquery中的ajax封装  $.ajax({})
// options 参数:
// url 请求的地址
// data 请求携带的数据  (string|object)
// async  是否异步
// dataType 接口返回的数据类型
// success  回调函数 => 将函数当成参数,传入到另一个函数中  => 传入是不执行,另一个函数啥时候调用,才执行(提前决定好要执行的内容,请求成功后执行 锦囊妙计)

// 创建了一个对象$  用于存储ajax => 防止变量冲突

var $ = {
    ajax: function (options) {
        try {
            // debugger;

            var { type = "get", url, data = "", async = true, dataType = "text", success, error } = options;

            // 预编译阶段
            // var success = function (result) {
            //     console.log("请求成功", result);
            // }

            var xhr = new XMLHttpRequest();

            if (data instanceof Object) { // 如果数据是一个对象  => 解析为参数数据队列
                var list = [];
                for (var key in data) {
                    var val = data[key];
                    var str = key + "=" + val;
                    list.push(str);
                }
                // console.log(list);
                data = list.join("&");
                // console.log(data);
            }

            if (type.toLowerCase() == "get") {
                xhr.open("get", data ? url + "?" + data : url, async);
                xhr.send();
            } else if (type.toLowerCase() == "post") {
                xhr.open("post", url, async);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(data);
            }


            xhr.onreadystatechange = function () {
                // debugger;
                try {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var result = xhr.responseText;

                        if (dataType == "json") {
                            result = JSON.parse(result);
                        }
                        // console.log(result);

                        // 拿到数据之后 => 执行对应的操作 (对应需求  渲染,登录,注册,删除)  => 每个人的需求不一致 =>执行的内容无法定死 

                        // 怎么解决?  => 写活 => 提前决定好要执行的内容,请求成功后执行 (回调函数)

                        if (success) {
                            success(result);  // 传入实参 => 请求成功时的数据
                        }

                    }
                } catch (err) {
                    if (error) {
                        error(err);
                    }
                }
            }

        } catch (err) {
            if (error) {
                error(err);
            }
        }


    }
}

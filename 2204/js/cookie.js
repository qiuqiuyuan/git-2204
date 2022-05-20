function setCookie(key, val, day, path = "/") {
    if (day) {
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + "=" + encodeURIComponent(val) + "; expires=" + date.toUTCString() + "; path=" + path;
    } else {
        document.cookie = key + "=" + encodeURIComponent(val) + "; path=" + path;
    }
}


function getCookie(key) {  // 一边拆分 一变对比
    var cookie = document.cookie;
    if (cookie) {
        var list = cookie.split("; ");
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var name = item.split("=")[0]; // "user"  "pwd"
            var val = item.split("=")[1];  //"a123123" "123123"

            if (name === key) {
                return decodeURIComponent(val);
            }
        }
    }
    return "";
}

function hasCookie(key) {  // 一边拆分 一变对比
    var cookie = document.cookie;
    if (cookie) {
        var list = cookie.split("; ");
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var name = item.split("=")[0]; // "user"  "pwd"
            var val = item.split("=")[1];  //"a123123" "123123"

            if (name === key) {
                return true;
            }
        }
    }
    return false;
}

function deleteCookie(key) {  //单删
    setCookie(key, "", -1);
}

function clearCookie() {  //全删
    var cookie = document.cookie;
    if (cookie) {
        var list = cookie.split("; ");
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var key = item.split("=")[0]; // "user"  "pwd"
            deleteCookie(key);
        }
    }
}

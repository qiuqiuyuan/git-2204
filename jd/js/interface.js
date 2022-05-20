

// request()  =>   本质对ajax请求进行二次封装, => 只需传入指定的参数即可发送ajax请求(返回(pending)状态的Promise实例 请求成功:返回数据 请求失败:返回错误)
function request(url, params, type = "get") {
    var p = new Promise(function (resolve, reject) {
        $.ajax({
            type: type,
            url: url,
            data: { ...params },
            // async:true,
            dataType: "json",
            success: function (data) {
                resolve(data); // 请求成功时返回数据   {fulfilled:data}
            },
            error: function (err) {
                reject(err);  // 失败 => 传出错误  {rejected:err}
            }
        })
    })
    return p;  // {pending:undefined}  => 默认返回进行中的Promise对象
}




// function isExistUser(params) {
//     return request("../php/isExistUser.php", params, "get"); // 返回进行中的Promise对象
// }

// const isExistUser = function (params) {
//     return request("../php/isExistUser.php", params, "get"); // 返回进行中的Promise对象
// }

// const isExistUser = (params) => {
//     return request("../php/isExistUser.php", params, "get"); // 返回进行中的Promise对象
// }

// const isExistUser = params => {
//     return request("../php/isExistUser.php", params, "get"); // 返回进行中的Promise对象
// }

// const isExistUser = params => request("../php/isExistUser.php", params, "get");


// 


const isExistUser = params => request("../php/isExistUser.php", params, "get");
const isExistPhone = params => request("../php/isExistPhone.php", params, "get");
const isExistEmail = params => request("../php/isExistEmail.php", params, "get");

const register = params => request("../php/register.php", params, "post");
const login = params => request("../php/login.php", params, "post");


const searchGradeOrderLimit = params => request("../php/searchGradeOrderLimit.php", params);
const deleteGradeById = params => request("../php/deleteGradeById.php", params);
const searchGradeById = params => request("../php/searchGradeById.php", params);
const updateGradeById = params => request("../php/updateGradeById.php", params, "post");


















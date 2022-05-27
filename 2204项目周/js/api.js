function request(type, url, data) {

    const p = new Promise((resolve) => {
        ajax({
            type,
            url,
            data,
            // dataType:'text',
            success: res => {
                resolve(res);
            }
        })
    })
    return p;
}
const reg = data => request('post', '../php/reg.php', data);
const loginApi = data => request('post', '../php/login.php', data);
const details=data=>request('get', '../php/details.php', data);
const dele=data=>request('get', '../php/delete.php', data);
const isUserExist=data=>request('get', '../php/isUserExist.php', data);
const isPhoneExist=data=>request('get', '../php/isPhoneExist.php', data);
const isEmailExist=data=>request('get', '../php/isEmailExist.php', data);
const page=data=>request('get', '../php/page.php', data);
const showShoppingCar=data=>request('get', '../php/showShoppingCar.php', data);
const update=data=>request('get', '../php/update.php', data);
const addToShoppingCar=data=>request('post', '../php/addToShoppingCar.php', data);
const count=data=>request('post','../php/count.php',data);
const sort=data=>request('get','../php/asc&desc.php',data);
const goodsList =data=>request('get','../php/goodslist.php',data)

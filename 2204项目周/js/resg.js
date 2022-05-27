const oUser = document.querySelector('#user');
const oUserSpan = document.querySelector("#user_span")
const oPwd = document.querySelector('#pwd');
const oPwdSpan = document.querySelector('#pwd_span');
const oRePwd = document.querySelector('#repwd');
const oRePwdSpan = document.querySelector('#repwd_span');
const oPhone = document.querySelector('#phone');
const oPhoneSpan = document.querySelector('#phone_span');
const oEmail = document.querySelector('#email');
const oEmailSpan = document.querySelector('#email_span');
const oBtn = document.querySelector('#btn');


let user;
let pwd;
let email;
let phone;

let isUserOk=false;
let isPwdOk=false;
let isPhoneOk=false;
let isCodeOk=false;
let isEmailOk=false;
let isRePwdOk=false;


oUser.onblur =  async function () {
   user = oUser.value.trim();
     const reg = /^[A-Za-z_$][\w$]{5,11}$/;

    if (reg.test(user)) {
       await isUserExist({user}).then((res)=>{

        const { status, msg } = res;
        if (status) {
            isUserOk=true;
            oUserSpan.textContent = msg;
        } else {
            isUserOk=false;
            oUserSpan.textContent = msg;
       }
    });
    } else {
        oUserSpan.textContent = '用户名不能以数字开头且长度在6-12之间';
    }
}

// }
oPwd.onblur =   function () {
     pwd = oPwd.value.trim();
    const reg = /^[\w$]{6,12}$/;

    if (reg.test(pwd)) {
        isPwdOk = true;
        const isExistBig = /[A-Z]/.test(pwd);
        const isExistSmall = /[a-z]/.test(pwd);
        const isExistNum = /[0-9]/.test(pwd);
        const isExistSpecial = /[_$]/.test(pwd);
        const level = isExistBig + isExistSmall + isExistNum + isExistSpecial;
        oPwdSpan.textContent = "密码强度" + level;
        oPwdSpan.className = "right";
    } else {
        isPwdOk=false;
        oPwdSpan.textContent = "密码由数字大小写及特殊字符组成,字符在6-20之间";
    }
}

oRePwd.onblur = function() {
    const  rePwd = oRePwd.value.trim();
    const pwd = oPwd.value.trim();
    if (rePwd === pwd) {
        isRePwdOk = true;
        oRePwdSpan.textContent = "√";
        
    } else {
        isRePwdOk=false;
        oRePwdSpan.textContent = "两次密码不一致 请重新输入";
    }
};

oPhone.onblur= async function(){
     phone=oPhone.value.trim();
    const reg = /^1[3-9]\d{9}$/;

    if(reg.test(phone)){
        await isPhoneExist({phone}).then(res=>{

            const {status,msg}=res;
            if(status){
                isPhoneOk = true;
                oPhoneSpan.textContent = msg;
                
            }else{
                isPhoneOk=false;
                oPhoneSpan.textContent = msg;
            }
        })
    }else{
        oPhoneSpan.textContent = "请输入正确的手机号";
    }
}

oEmail.onblur =async function() {
			
  
    const email = oEmail.value.trim();
    const reg = /^\w+@\w+\.(com|cn|edu)$/;

    if(reg.test(email)){
     await isEmailExist({email}).then(res=>{
        const {status,msg}=res;
        if (status) {
            isEmailOk=true;
            oEmailSpan.textContent = msg;
            
        } else {
            isEmailOk=false;
            oEmailSpan.textContent = msg;
           
            
        }
     })

    }else {
        oEmailSpan.textContent = "请输入正确的邮箱";
       
    }

}
let isRegOk=false;
oBtn.addEventListener('click', async function(){
    // dragJudge.style.display='block';
             user = oUser.value.trim();
			//  nickName = oNickName.value.trim();
			 pwd = oPwd.value.trim();
			 phone = oPhone.value.trim();
			 email = oEmail.value.trim();
			if ( isPwdOk && isUserOk &&isPhoneOk&&isEmailOk) {
				if(isRegOk) return false;
				isRegOk=true;
               await reg({user,pwd,phone,email}).then(res=>{
                const {status}=res;
                if(status){
                    location.href='../html/log.html'
                }
                
               })


}

})


// 滑动验证






var userInp=document.getElementById("user");
var userSpan=document.getElementById("user_span");

var pwdInp = document.getElementById("pwd");
  var pwdSpan = document.getElementById("pwd_span");

  var phoneInp = document.getElementById("phone");
  var phoneSpan = document.getElementById("phone_span");

  var emailInp = document.getElementById("email");
  var emailSpan = document.getElementById("email_span");

  var btn = document.getElementById("btn");


  var isUserOk = false;
  var isPwdOk = false;
  var isPhoneOk = false;
  var isEmailOk = false;

  // 用户名:   由数字,字母 下划线组成,6-12位,且不能以数字开头
  // 一步到位
  userInp.onblur = function() {
      var user = userInp.value.trim();
      userInp.value = user;

      isUserOk = false; // 每次验证 默认还原为false

      var reg = /^[a-zA-Z_]\w{5,11}$/;

      if (reg.test(user)) {
          // 判断用户名是否以注册


          isExistUser({user}).then(data => 
          {
              var {status,message} = data;
              if (status) {
                  userSpan.textContent = "√";
                  userSpan.className = "right";
                  isUserOk = true;
              } else {
                  userSpan.textContent = "用户名已被注册";
                  userSpan.className = "err";
              }
          }).catch(err => {
              reject(err);
          })


      } else {
          userSpan.textContent = "用户名由数字、字母、下划线组成,6-12位,且不能以数字开头";
          userSpan.className = "err";
      }
  }

  // 密码:   由数字,字母 下划线组成,6-12位,
  pwdInp.onblur = function() {
      var pwd = pwdInp.value.trim();
      pwdInp.value = pwd;

      isPwdOk = false;

      var reg = /^\w{6,12}$/;

      if (reg.test(pwd)) {

          var isExistNum = /[0-9]/.test(pwd);
          var isExistSmall = /[a-z]/.test(pwd);
          var isExistBig = /[A-Z]/.test(pwd);
          var isExistSpe = /[_]/.test(pwd);
          var level = isExistNum + isExistSmall + isExistBig + isExistSpe;
          console.log(level);

          pwdSpan.textContent = "密码强度:" + level;
          pwdSpan.className = "right";
          isPwdOk = true;

      } else {
          pwdSpan.textContent = "密码由数字、字母、下划线组成,6-12位";
          pwdSpan.className = "err";
      }
  }


  // 手机号: 
  phoneInp.onblur = function() {
      var phone = phoneInp.value.trim();
      phoneInp.value = phone;
      isPhoneOk = false;
      var reg = /^1[3-9]\d{9}$/;
      if (reg.test(phone)) {


          isExistPhone({
              phone
          }).then(data => {
              var {
                  status,
                  message
              } = data;

              if (status) {
                  phoneSpan.textContent = "√";
                  phoneSpan.className = "right";
                  isPhoneOk = true;
              } else {
                  // phoneSpan.textContent = "手机号已被注册";
                  // phoneSpan.className = "err";
                  layui.use('layer', function() {
                      var layer = layui.layer;

                      layer.confirm(message, {
                          title: "提醒",
                          skin: "layui-layer-molv"
                      }, function() {
                          console.log("点击了确认")
                          layer.close(layer.index);
                      }, function() {
                          console.log("点击了取消")
                      });
                  });

              }
          }).catch(err => {
              reject(err);
          })


      } else {
          phoneSpan.textContent = "请输入正确的手机号";
          phoneSpan.className = "err";
      }
  }



  emailInp.onblur = function() {
      var email = emailInp.value.trim();
      emailInp.value = email;
      isEmailOk = false;

      // 1231231@qq.com
      var reg = /^\w+@\w+\.(com|cn|edu)$/;

      if (reg.test(email)) {


          isExistEmail({
              email
          }).then(data => {
                  var { status, message } = data;

              if (status) {
                  emailSpan.textContent = "√";
                  emailSpan.className = "right";
                  isEmailOk = true;
              } else {
                  // emailSpan.textContent = "邮箱已被注册!";
                  // emailSpan.className = "err";

                  layui.use('layer', function() {
                      var layer = layui.layer;

                      layer.confirm(message, {
                          title: "提醒"
                      }, function() {
                          console.log("点击了确认")
                          layer.close(layer.index);
                      }, function() {
                          console.log("点击了取消")
                      });
            });
           }
          }).catch(err => {
              reject(err);
          })


      } else {
          emailSpan.textContent = "请输入正确的邮箱";
          emailSpan.className = "err";
      }
  }
  var isRegister = false; // 全局变量  是否正在注册
  btn.onclick = function() {
      console.log(isUserOk, isPwdOk, isPhoneOk, isEmailOk);

      if (isUserOk && isPwdOk && isPhoneOk && isEmailOk) {
          
          if (isRegister) return false;
          isRegister = true;

          var user = userInp.value;
          var pwd = pwdInp.value;
          var phone = phoneInp.value;
          var email = emailInp.value;

          register({
              user,
              pwd,
              phone,
              email
          }).then(data => {
              var {
                  status,
                  message
              } = data;
              if (status) {
                  isRegister = false;
                  location.href = "log.html";
              } else {
                  layui.use('layer', function() {
                      var layer = layui.layer;

                      layer.confirm(message, {
                          title: "提醒"
                      }, function() {
                          console.log("点击了确认")
                          layer.close(layer.index);
                      }, function() {
                          console.log("点击了取消")
                      });
                  });
              }
          }).catch(err => {
              throw err;
          })


  
          location.href = "log.html";
      }
  }
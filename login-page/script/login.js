/**
 * Created by liunan on 2016/9/21.
 */

$(document).ready(function(){
    var config = {
        vx: 4,
        vy:  4,
        height: 2,
        width: 2,
        count: 100,
        color: "88, 206, 255",
        stroke: "88,206,255",
        dist: 6000,
        e_dist: 20000,
        max_conn: 10
    }
    CanvasParticle(config);
    $('#jumptoRegist').on('click', function () {
      $('.login-container').hide();
      $('.register-container').show();
      $('.anniu').hide();
      $('.regBtn-wrapper').show();
      $('#city_1').citySelect({
    		nodata:"none",
    		required:false
    	});
    })

    $('#registBtn').on('click', function () {
      var reg = '.register-container ';
      var userName = $('.register-container input[name="userName"]').val().trim();
      var nickName = $(reg + 'input[name="nickName"]').val().trim();
      var password = $(reg + 'input[name="password"]').val();
      var repassword = $(reg + 'input[name="repassword"]').val();
      var province = $(reg + 'select.prov').val()
      var city = $(reg + 'select.city').val()
      var phone = $(reg + 'input[name="phone"]').val().trim()
      var department = $(reg + 'input[name="department"]').val().trim()
      if (userName === '' || password === '' || province === '' || city === '' || phone === '' || department === '') {
        layer.msg('表单填写有误，请核对后再提交', { icon: 5 });
        return;
      }
      if (password !== repassword) {
        layer.msg('密码两次输入不一致', { icon: 5 })
        return;
      }
      var postData = {
        userName: userName,
        nickName: nickName,
        password: password,
        province: province,
        city: city,
        phone: phone,
        department: department
      };
      $.ajax({
        url: 'http://47.93.29.71/api/user/register',
        type: 'POST',
        data: postData,
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: function (data) {
          if (data.insetUser) {
            layer.msg('注册成功', {icon: 1});
            location.reload();
          } else {
            layer.msg('注册失败', {icon: 5});
          }
        },
        error: function (data) {
        }
      });
    })

    $('#returnLogin').on('click', function () {
      $('.login-container').show();
      $('.register-container').hide();
      $('.anniu').show();
      $('.regBtn-wrapper').hide();
    })
});
$('#loginBtn').on('click', function() {
  var postData = loginCheck();
  if (postData) {
    $.ajax({
      url: 'http://47.93.29.71/api/user/login',
      type: 'POST',
      data: postData,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        console.log(data);
        if (data.checkUser) {
          layer.msg('登录成功', {icon: 1});
          setTimeout(function () {
            var origin = location.origin
            location.replace(origin)
          }, 500)
        } else {
          layer.msg('用户名或密码不正确', {icon: 5});
        }
      },
      error: function (data) {
      }
    });
  }
})
function loginCheck() {
    var userName = $('#userName').val();
    var password = $('#password').val();
    if(userName.trim() === '') {
      layer.msg('用户名不能为空', {icon: 5});
    }else if(password.trim() === '') {
      layer.msg('密码不能为空', {icon: 5});
    }else {
      var postData = {
        userName: userName,
        password: password
      }
      return postData;
    }
}

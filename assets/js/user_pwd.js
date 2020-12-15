let form = layui.form;
let layer = layui.layer;
// 表单校验
form.verify({
  pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  //   oldNew(x) {
  //     if (x !== $('[name=oldPwd]').val()) {
  //       return '输入的新旧密码不同';
  //     }
  //   }

  //   箭头函数,判断新旧密码是否一致
  oldNew: (x) => {
    if (x === $('[name=oldPwd]').val()) {
      return '输入的新旧密码不能相同';
    }
  },
  //   箭头函数,判断输入两次新密码是否一致
  newReNew(m) {
    if (m !== $('[name=newPwd]').val()) {
      return '两次新密码需要输入一致';
    }
  }
});
// 点击按钮修改
$('#subBtn').on('click', function (e) {
  e.preventDefault();
  console.log(111);
  let str = $('#userinfoForm').serialize();
  $.ajax({
    type: 'POST',
    url: '/my/updatepwd',
    data: str,
    success: function (res) {
      console.log(res);
      if (res.status === 0) {
        layer.msg('只想弱弱提示,您的密码修改成功');
        $('#userinfoForm')[0].reset();
      } else {
        layer.msg('密码修改失败');
        return;
      }
    }
  });
});
// 点击充值按钮
$('#resetBtn').on('click', function (e) {
  e.preventDefault();
  $('#userinfoForm')[0].reset();
});

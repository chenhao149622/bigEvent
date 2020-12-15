let form = layui.form;
// 获取数据
function getInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      // console.log(res.data);
      form.val('formInfo', res.data);
    }
  });
}
getInfo();
// 提交按钮
$('#subBtn').on('click', function () {
  console.log(11);
  let str = $('#userinfoForm').serialize();
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: str,
    success: function (res) {
      console.log(res);
      $('#userinfoForm')[0].reset();
      // 通过window.parent获取到父页面,再调用函数,
      // 注意:调用的函数必须是全局的
      window.parent.getUserInfi();
    }
  });
});
// 重置按钮
$('#resetBtn').on('click', function (e) {
  e.preventDefault();
  // 再发送一次请求,获取数据
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      form.val('formInfo', res.data);
    }
  });
});

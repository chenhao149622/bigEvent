function getUserInfi() {
  let token = localStorage.getItem('token');
  let layer = layui.layer;
  // console.log(token);
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token')
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg('用户信息获取失败');
      }
      if (res.data.user_pic == null) {
        $('.layui-nav-img').hide();
        $('.userPortrait').show();
        let firstZimu = res.data.username[0];
        $('.userPortrait').text(firstZimu.toLocaleUpperCase());
      } else {
        $('.layui-nav-img').show();
        $('.layui-nav-img').attr('src', res.data.user_pic);
        $('.userPortrait').hide();
      }
      let UIF = res.data.nickname || res.data.username;
      // console.log(UIF);

      $('.userInfoName').text(UIF);
    },
    complete: function (x) {
      // console.log(x);
      // console.log(x.responseJSON.status);
      // console.log(x.responseJSON.message);
      if (x.responseJSON.status !== 0 || x.responseJSON.message == '身份认证成功!') {
        console.log('失败了');
        localStorage.removeItem('token');
        location.href = 'http://127.0.0.1:5500/home/login.html';
      }
    }
  });
}
getUserInfi();
let layer = layui.layer;

$('#logoutBtn').on('click', function () {
  console.log(111);
  layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
    //do something
    location.href = 'http://127.0.0.1:5500/home/login.html';
    localStorage.removeItem('token');
    layer.close(index);
  });
});

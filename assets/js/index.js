getUserInfi();
function getUserInfi() {
  let token = localStorage.getItem('token');
  console.log(token);
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    success: function (res) {
      console.log(res);
      if (res.status == 1) {
        return alert('网络错误');
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
      console.log(UIF);
      $('.userInfoName').text(UIF);
    }
  });
}

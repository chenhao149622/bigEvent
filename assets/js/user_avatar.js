// ---------------  创建剪裁区 ------------------
// - 找到剪裁区的图片 （img#image）
let image = $('#image');
let layer = layui.layer;
// - 设置配置项
let option = {
  // 纵横比(宽高比)
  aspectRatio: 1, // 正方形,可以修改比例
  // 指定预览区域
  preview: '.img-preview' // 指定预览区的类名（选择器）
};
// - 调用cropper方法，创建剪裁区
image.cropper(option);

// 点击上传模拟点击file
$('#uploadBtn').on('click', function () {
  $('#IDfilePic').click();
});
// 点击file
$('#IDfilePic').on('click', function () {
  $('#IDfilePic').change(function () {
    console.log('文件域改变了');
    // 通过文件域DOM对象的files属性拿到图片的所有属性
    // console.log(this);
    // console.log(this.files);
    let file = this.files[0];
    console.log(file);

    let newSrc = URL.createObjectURL(file);

    // 配置项
    let option = {
      // 纵横比(宽高比)
      aspectRatio: 1, // 正方形,可以修改比例
      // 指定预览区域
      preview: '.img-preview' // 指定预览区的类名（选择器）
    };

    // 先销毁旧的裁剪区,再把新的路径传上去,创建新的裁剪区
    $('#image').cropper('destroy').attr('src', newSrc).cropper(option);
  });
});

// 点击完成头像上传
$('#sureBtn').on('click', function () {
  var dataURL = $('#image')
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  //   console.log(dataURL);
  // 然后发送ajax请求
  $.ajax({
    type: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: dataURL
    },
    success: function (res) {
      if (res.status === 0) {
        console.log(res);
        layer.msg('成功换掉了头像');
        window.parent.getUserInfi();
      }
    }
  });
});

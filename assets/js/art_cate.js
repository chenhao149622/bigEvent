let layer = layui.layer;
let form = layui.form;
// 获取所有文章类别
function getArtCate() {
  $.ajax({
    type: 'GET',
    url: '/my/article/cates',
    success: function (res) {
      //   console.log(res);
      //   设置渲染内容
      $('#tb').empty();
      let htmlTpl = template('tdTpl', res);
      //   将渲染好的html添加到tb中
      $('#tb').append(htmlTpl);
    }
  });
}
getArtCate();

// 点击添加类别按钮
let index;
$('#addBtn').on('click', function () {
  //   创建一个弹窗
  index = layer.open({
    type: 1,
    title: '添加文章类别',
    content: $('#addForm').html(),
    area: '500px'
  });
});

// 所以需要事件委托,重置按钮
$('body').on('click', '#resetBtn', function () {
  $('#addCatesform')[0].reset();
});
// 所以需要事件委托,提交按钮
$('body').on('submit', '#addCatesform', function (e) {
  e.preventDefault();
  let str = $('#addCatesform').serialize();
  console.log(str);
  $.ajax({
    type: 'POST',
    url: '/my/article/addcates',
    data: str,
    success: function (res) {
      //   console.log(res);
      if (res.status !== 0) {
        return alert('添加失败');
      }
      //   软弹窗
      layer.msg(res.message);
      //   关闭窗口
      layer.close(index);
      //   重新打印页面的文章类别
      getArtCate();
    }
  });
});
// 编辑按钮
$('body').on('click', '.editBtn', function () {
  //   创建一个弹窗
  index = layer.open({
    type: 1,
    title: '编辑文章类别',
    content: $('#editFormSub').html(),
    area: '500px'
  });
  //   console.log($(this).attr('data-id'));
  //   设置一个值保存这个id
  let catId = $(this).attr('data-id');
  //   根据id查到到信息
  $.ajax({
    type: 'GET',
    url: '/my/article/cates/' + catId,
    success: function (res) {
      //   console.log(res.data);
      form.val(
        'editForm',
        res.data
        //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
      );
    }
  });

  // 确认修改按钮
  $('body').on('submit', '#editCatesform', function (e) {
    console.log(111);
    e.preventDefault();
    let strEdit = $(this).serialize();
    console.log(strEdit);
    $.ajax({
      type: 'POST',
      url: '/my/article/updatecate',
      data: strEdit,
      success: function (res) {
        //   关闭窗口
        layer.close(index);
        console.log(res);
        // 弹窗提示修改成功
        layer.msg(res.message);
        getArtCate();
      }
    });
  });
});
//   删除按钮
$('body').on('click', '.delBtn', function () {
  let catId = $(this).attr('data-id');
  console.log(catId);
  $.ajax({
    type: 'GET',
    url: '/my/article/deletecate/' + catId,
    success: function (res) {
      console.log(res);
      layer.msg(res.message);
      getArtCate();
    }
  });
});

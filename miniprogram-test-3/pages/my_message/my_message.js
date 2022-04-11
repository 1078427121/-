// pages/my_message/my_message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cs:[],
    myid:'',
    myimg:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') + '/wx1/chatRecord/getlist.php?sid=' + wx.getStorageSync('s_id'),
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");
          var json = JSON.parse(jsonStr);
          res.data = json;
        }
        console.log(res.data)
        that.setData({
          cs: res.data,
          myid: wx.getStorageSync('s_id'),
          myimg: wx.getStorageSync('imgurl'),
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
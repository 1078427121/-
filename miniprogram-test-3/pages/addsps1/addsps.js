// pages/addsps/addsps.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname:'',
    bookcomment:'',
    tx:'',
    imagelist: [],
    bc_id:'',
  },
  preview:function(e){
    const idx = e.target.dataset.src
    wx.previewImage({
      current: idx,  //当前预览的图片
      urls: this.data.imagelist,  //所有要预览的图片
    })
  },
  in1: function (e) {
    this.data.bookname = e.detail.value
  },
  in2: function (e) {
    this.data.bookcomment = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  img:function(e){
      var that = this;
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.setData({
            imagelist: res.tempFilePaths
          })
          console.log(that.data.imagesrc)
        },
      })
  },
  submit:function(e){
    var that=this
    var bc = Math.floor(1000 + Math.random() * 8999) 
    bc = bc+''+ Date.parse(new Date())
    if(this.data.bookname==''||this.data.bookcomment==''){
      wx.showModal({
        title: '提示',
        content: '请输入完整信息！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    else{
      this.data.bookname = getApp().chan(this.data.bookname);
      this.data.bookcomment = getApp().chan(this.data.bookcomment);
    wx.request({//
      url: 'https://' + wx.getStorageSync('ip') + '/wx1/book_comment/insert.php?' + 'b_name=' + this.data.bookname + '&content=' + this.data.bookcomment + '&s_id=' + getApp().globalData.currentOpenID + '&bc_id=' + bc + '&time=' + util.formatTime(new Date()) + '&s_name=' + wx.getStorageSync('nickname') + '&s_touxiang=' + wx.getStorageSync('imgurl') ,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var id=res.data
        for (var i = 0; i < that.data.imagelist.length; i++) {
          wx.uploadFile({
            url: 'https://' + wx.getStorageSync('ip') +'/wx/load_pic.php?bc_id=' + bc,//保存图片的网址
            filePath: that.data.imagelist[i],
            name: 'file',
            success: function (res) {
              console.log(res.data)
            }
          })
        }
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
      })
    }
  },
  onLoad: function (options) {
    wx.setStorageSync('ip', 'www.lyx223.xyz');
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
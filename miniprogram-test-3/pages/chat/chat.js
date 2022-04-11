// pages/chat/chat.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    u1:'',
    u2:'',
    u1_tx:'',
    u2_tx:'',
    name:'',
    inputValue:'',
    cs: [],
    loading: false,
    socketStatus: 'closed',
  },
  openSocket() {
    //打开时的动作
    wx.onSocketOpen(() => {
      console.log('WebSocket 已连接')
      this.data.socketStatus = 'connected';
      this.sendMessage();
    })
    //断开时的动作
    wx.onSocketClose(() => {
      console.log('WebSocket 已断开')
      this.data.socketStatus = 'closed'
    })
    //报错时的动作
    wx.onSocketError(error => {
      console.error('socket error:', error)
    })
    // 监听服务器推送的消息
    wx.onSocketMessage(message => {
      //把JSONStr转为JSON
      console.log(message)
      message = message.data.replace(" ", "");
      if (typeof message != 'object') {
        message = message.replace(/\ufeff/g, ""); //重点
        var jj = JSON.parse(message);
        message = jj;
      }
      console.log("【websocket监听到消息】内容如下：");
      console.log(message);
      getdata();
    })
    // 打开信道
    wx.connectSocket({
      url: "ws://192.168.0.104:8080/websocket/" + wx.getStorageSync('wx_name'),
      header: {
        'content-type': 'application/json'
      },
      method: 'post',
    })
  },

  //关闭信道
  closeSocket() {
    if (this.data.socketStatus === 'connected') {
      wx.closeSocket({
        success: () => {
          this.data.socketStatus = 'closed'
        }
      })
    }
  },
  sendMessage(str) {
    if (this.data.socketStatus === 'connected') {
      //自定义的发给后台识别的参数 ，我这里发送的是name
      wx.sendSocketMessage({
        data: str
      })
    }
  },
  sendMessage(str) {
    if (this.data.socketStatus === 'connected') {
      //自定义的发给后台识别的参数 ，我这里发送的是name
      wx.sendSocketMessage({
        data: str
      })
    }
  },
  inp: function (e) {
    this.data.inputValue = e.detail.value
  },
  fs:function(e){
    var that = this
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') + '/wx1/chatRecord/insert.php?u1=' + that.data.u1 + "&u2=" + that.data.u2 + "&u1_tx=" + that.data.u1_tx + "&u1_name=" + wx.getStorageSync('wx_name') + "&u2_tx=" + that.data.u2_tx + "&u2_name=" + that.data.name + "&content=" + that.data.inputValue + "&time="+util.formatTime(new Date()),
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          inputValue:''
        })
        that.getdata()
      }
    })
    that.sendMessage('@' + wx.getStorageSync('wx_name') + '#12')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      u1: options.u1,
      u2: options.u2,
      u1_tx: options.u1_tx,
      u2_tx: options.u2_tx,
      name:options.name
    })
    console.log(this.data.u1)
    console.log(this.data.u2)
    console.log(this.data.u1_tx)
    console.log(this.data.u2_tx)
    console.log(this.data.name)
    console.log(wx.getStorageSync('wx_name'))
    wx.setNavigationBarTitle({
      title: this.data.name,
    })
    if (this.data.socketStatus === 'closed') {
      this.openSocket();
    }
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
    this.getdata()
  },
  getdata:function(e){
    var that = this
    wx.request({
      url: 'http://' + wx.getStorageSync('ip') + '/wx1/chatRecord/select.php?u1=' + that.data.u1 + "&u2=" + that.data.u2,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
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
          loading: true,
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
    this.closeSocket()
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
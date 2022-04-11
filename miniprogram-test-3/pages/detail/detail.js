// pages/detail/detail.js
var util = require('../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    s_id:'',
    bc_id: '',
    auther:'',
    input: '',
    nickName: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputValue: null,
    tx: '',
    pic_id: '',
    imagelist:'' ,
    flag:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    this.setData({
      phone: options.phone,

      name:options.name,
      tab:options.tab,
      auther: getApp().chan2(options.auther),
      picture_id:options.picture_id,
      descrip: getApp().chan2(options.descrip),
      s_id:options.s_id,
      bc_id: options.b_id,
      bname: getApp().chan2(options.b_name),
      looks:options.looks,
      time: options.send_time,
      pl: options.comments,
      imagelist:options.cover,
    })
    if (this.data.s_id != wx.getStorageSync('s_id')){
      this.setData({
        flag:1
      })
    }
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') +'/wx1/book/update_look.php?b_id=' + this.data.bc_id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
      },
    })
  },

  chat:function(e){
    wx.navigateTo({
      url: "../../pages/chat/chat?u1=" + wx.getStorageSync('s_id') + "&u2=" + this.data.s_id + "&u1_tx=" + wx.getStorageSync('imgurl')+"&u2_tx="+this.data.picture_id+"&name="+this.data.name
    })
  },

  inp: function (e) {
    this.data.input = e.detail.value
  },

  addpl: function (e) {
    var that = this
    console.log(this.data.nickName);
    console.log(this.data.openid);
    console.log(this.data.tx);
      console.log(this.data.input)
      if (this.data.input == '') {
        wx.showModal({
          title: '提示',
          content: '评论内容不能为空',
          confirmText: '确定',
          cancelText: '取消',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击主要操作')
            } else if (res.cancel) {
              console.log('用户点击次要操作')
            }
          }
        })
      }
      else {
        wx.request({
          url: 'https://' + wx.getStorageSync('ip') + '/wx1/bc_comment/insert.php?bc_id=' + this.data.bc_id + '&content=' + this.data.input + '&s_id=' + wx.getStorageSync('s_id') + '&time=' + util.formatTime(new Date()) + '&wx_name=' + wx.getStorageSync('nickname') + '&s_touxiang=' + wx.getStorageSync('imgurl'),
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              inputValue: '',
              pl: parseInt(that.data.pl) + 1
            })
            that.showpls()
            wx.showToast({
              title: '评论成功',
              icon: 'success',
              duration: 2000
            })
          },
        })
      
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
    
    this.showpls()
  },
  showpls: function () {
    var that = this
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') +'/wx1/bc_comment/select_all.php?bc_id=' + that.data.bc_id,
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
        that.setData({
          pls: res.data,
        })
      }
    })
  },



  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (app.globalData.userInfo != undefined && app.globalData.userInfo != null) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
    /*
    if (app.globalData.userInfo == undefined) {
      wx.navigateBack({
        delta: -1
      });
    }
    */
    var that = getApp()
    var that2 = this
    wx.login({
      success: function (res) {
        var code = res.code;//发送给服务器的code
        wx.getUserInfo({
          success: function (res) {
            var userNick = res.userInfo.nickName;//用户昵称
            wx.setStorageSync('nickname', userNick);
            var avataUrl = res.userInfo.avatarUrl;//用户头像地址
            var gender = res.userInfo.gender;//用户性别
            if (code) {
              wx.showLoading({
                title: '发送中',
              })
              wx.request({
                url: 'https://www.lyx223.xyz/wx1/getopenid1.php?code=' + code + '&nick=' + userNick + '&avaurl=' + avataUrl + '&sex=' + gender,
                data: {
                  code: code,
                  nick: userNick,
                  avaurl: avataUrl,
                  sex: gender,
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res.data);
                  wx.setStorageSync('wx_name', res.data.wx_name);//将获取信息写入本地缓存
                  wx.setStorageSync('openid', res.data.s_id);
                  wx.setStorageSync('s_id', res.data.s_id);
                  wx.setStorageSync('imgurl', res.data.imgurl);
                  wx.setStorageSync('sex', res.data.sex);
                  wx.setStorageSync('phone', res.data.phone_num);
                },
                complete: function (res) {
                  that.globalData.currentUserName = res.data.name;
                  that.globalData.currentStudentID = res.data.s_no;
                  that.globalData.currentOpenID = res.data.s_id;
                  that.globalData.currentPhone = res.data.phone_num;
                  that.globalData.currentAvataUrl = res.data.imgurl;
                  that.globalData.currentWXName = res.data.wx_name;
                  console.log('openid====' + that.globalData.currentOpenID);
                  that2.addpl();
                  wx.hideLoading();
                }
              })
            }
            else {
              console.log("获取用户登录态失败！");
            }
          }
        })
      },
      fail: function (error) {
        console.log('login failed ' + error);
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
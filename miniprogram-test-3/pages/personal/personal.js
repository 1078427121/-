// pages/personal/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  userDetail:function(e){
    wx.navigateTo({
      url: '../../pages/personal_detail/personal_detail',
    })
  },

  historySendBookDetail: function (e) {
    wx.navigateTo({
      url: '../../pages/my_sent_books/my_sent_books',
    })
  },

  historyBookReviewDetail: function (e) {
    wx.navigateTo({
      url: '../../pages/my_book_reviews/my_book_reviews',
    })
  },

  writeSendBookDetail: function (e) {
    wx.navigateTo({
      url: '/pages/addsps/addsps',
    })
  },

  writeBookReviewDetail: function (e) {
    wx.navigateTo({
      url: '/pages/addsps1/addsps',
    })
  },

  feedbackDetail: function (e) {
    wx.navigateTo({
      url: '../../pages/feedback/feedback',
    })
  },

  aboutUsDetail: function (e) {
    wx.navigateTo({
      url: '../../pages/about_us/about_us',
    })
  },

  getMessage:function(e){
    wx.navigateTo({
      url: '../../pages/my_message/my_message',
    })
  },

  choosePage: function (id) {
    console.log("id=="+id)
    if (id == 1) {
      this.historySendBookDetail();
    }
    if (id == 2) {
      this.historyBookReviewDetail();
    }
    if (id == 3) {
      this.writeSendBookDetail();
    }
    if (id == 4) {
      this.writeBookReviewDetail();
    }
    if (id == 5){
      this.getMessage();
    }
  },

  getUserInfo: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.index)
    app.globalData.userInfo = e.detail.userInfo
    if (app.globalData.userInfo != undefined && app.globalData.userInfo!=null){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
    if (app.globalData.userInfo == undefined) {
      wx.navigateBack({
        delta: -1
      });
    }
    /*
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
    */
    console.log(app.globalData.userInfo)
    var that = getApp()
    var that2=this

    var id = e.currentTarget.dataset.index;
    console.log("id=============" + id)
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
                title: '加载中',
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
                  console.log('openid====' + that.globalData.currentOpenID)
                  //var pages = getCurrentPages()    //获取加载的页面
                  //var currentPage = pages[pages.length - 1]    //获取当前页面的对象
                  //currentPage.onUnload();
                  //currentPage.onLoad();
                  //currentPage.onShow();
                  //currentPage.onReady();
                  //wx.startPullDownRefresh();                  
                  that2.choosePage(id);
                  console.log("id=============" + id)
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log("personal: onLoad")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("personal: onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("personal: onShow")
    this.onLoad();
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
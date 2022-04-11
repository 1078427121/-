//index.js
const app = getApp()
Page({
  data: {
    films: [],
    loading: true,
    openid:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    input:'',
  },
  inp: function (e) {
    this.data.input = e.detail.value
  },
  ss:function(e){
    var that=this
    that.setData({
      loading:false
    })
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') + '/wx1/book_comment/search.php?c='+this.data.input,//119.29.148.152
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          films: res.data,
          loading: true,
          count:res.data.length,
        })
      }
    })
    this.setData({
      loading:true,
    })
  },
  onLoad: function () {
    this.setData({
      loading: false
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
    if (app.globalData.userInfo == undefined) {
      wx.navigateBack({
        delta: -1
      });
    }
    var that = getApp()
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
  onShow: function () {
    this.getdata()
  },
  getdata:function(){
    var that = this
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') +'/wx1/book_comment/select_all.php',//119.29.148.152
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var jsonStr = res.data;
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");
          var json = JSON.parse(jsonStr);
        }
        that.setData({
          films: json,
          loading: true,
        })
      }
    })
  },
  /*
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    this.getdata()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  */

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getdata()
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  newNavi:function(e){
    wx.navigateTo({
      url: '/pages/addsps1/addsps',
    })
  },

  todetail:function(e){
    var item=e.currentTarget.dataset.bean
    console.log(item)
    wx.navigateTo({
      url: '../../pages/detail1/detail?bc_id=' + item.bc_id + '&name=' + item.s_name
        + '&content=' + getApp().chan(item.content) +'&time='+item.time
        + '&dz=' + item.goods + '&pl=' + item.comments + '&tx=' + item.s_touxiang + '&looks=' + item.looks + '&bname=' + getApp().chan(item.b_name),
    })
  }
})
 
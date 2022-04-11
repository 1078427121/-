// pages/detail/detail.js
var util=require('../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bc_id: '',
    input:'',
    inputValue:null,
    pic_id:'',
    imagelist: [],
    tx: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调用应用实例的方法获取全局数据
    this.setData({
      bc_id:options.bc_id,
      name:options.name,
      bname:getApp().chan2(options.bname),
      content: getApp().chan2(options.content),
      time:options.time,
      dz:options.dz,
      pl:options.pl,
      tx:options.tx,
      looks: parseInt(options.looks)+1,
    })
  }, 
  inp: function (e) {
    this.data.input = e.detail.value
  },
  addz:function(e){
    var that=this
    console.log(wx.getStorageSync('s_id'))
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') +'/wx1/dz_insert.php?bc_id=' + that.data.bc_id + '&s_id=' + wx.getStorageSync('s_id'),
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (parseInt(res.data)==1){
          that.setData({
            dz: parseInt(that.data.dz) + 1
          })
          wx.showToast({
            title: '点赞成功',
            iconType: 'success',
            duration: 2000
          })
        }
        else{
          wx.showToast({
            title: '您已点赞过',
            iconType: 'success',
            duration: 2000
          })
        }
      },
    })
  },
  addpl: function (e) {
    var that = this
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
              pl: parseInt(that.data.pl) + 1,
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
  onShow: function(){
    var that=this
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') +'/wx1/pic_select.php?bc_id=' + this.data.bc_id,//获取所有图片
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
        }
        that.setData({
          imagelist:json,
        })
      },
    })
    this.showpls()
  },
  showpls: function () {
    var that = this
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') + '/wx1/looks.php?bc_id=' + that.data.bc_id,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
        })
      }
    })
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') +'/wx1/bc_comment/select_all.php?bc_id=' + that.data.bc_id,
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
          pls: json,
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
    var that2=this
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
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)    
    wx.setStorageSync('ip', '188.131.216.56')



    // 登录
    /*
    wx.login({
      success: res => {
        this.globalData.code = res.code //返回code
        console.log('code=' + this.globalData.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=CODE&grant_type=authorization_code',
          data: {
            appid: 'wx15929c79147dd2a5',
            secret: 'cdb6e75190ca27a7041a0168d57421d0',
            js_code: res.code,
          },
          header: {
            'content-type': 'application/json'
          },
          success: res => {
            this.globalData.currentOpenID = res.data.openid //返回openid
            console.log('currentOpenid=' + this.globalData.currentOpenID)
            console.log(res.data)
          },
          complete: function (res){
            wx.request({
              url: 'https://www.lyx223.xyz/wx1/student/sel_a_ins.php?s_id=' + res.data.openid,
              data: '',
              header: {},
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: function (res) {
                console.log('添加用户  '+res.data)
              },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        })
      }
    })
    */
    
    var that = this
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
                url: 'http://188.131.216.56/wx1/getopenid1.php?code=' + code + '&nick=' + userNick + '&avaurl=' + avataUrl + '&sex=' + gender,
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
                  that.globalData.currentAvataUrl=res.data.imgurl;
                  that.globalData.currentWXName=res.data.wx_name;
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


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              wx.setStorageSync('wx_name', res.userInfo.nickName);//将获取信息写入本地缓存
              wx.setStorageSync('imgurl', res.userInfo.avatarUrl);
              wx.setStorageSync('sex', res.userInfo.gender);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  globalData: {
    userInfo: null,
    currentUserName: "",
    currentStudentID: "",
    currentOpenID: "",
    currentPhone: "",
    currentAvataUrl:null,
    currentWXName:"",
    code: null,
    openid: null,

    name: null,
    imgUrl: null,
    sex: null,

  },
  chan:function(str){
    console.log(str)
    str = str.replace('+', '%2B');
    str = str.replace('?', '%3F');
    str = str.replace('#', '%23');
    str = str.replace('&', '%26');
    str = str.replace('=', '%3D');
    str = str.replace(' ', '%3K');
    console.log(str)
    return str;
  },
  chan2:function(str){
    console.log(str)
    str = str.replace('%2B','+');
    str = str.replace('%3F', '?');
    str = str.replace('%23','#');
    str = str.replace( '%26','&');
    str = str.replace('%3D', '=');
    str = str.replace('%3K', ' ');
    console.log(str)
    return str;
  }
})
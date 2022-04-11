//index.js
const app = getApp()
Page({
  data: {
    select1:false,
    select2: false,
    select3: false,
    yixuan1:{
      data:'',
      selected:false
    }, 
    yixuan2: {
      data: '',
      selected: false
    }, 
    yixuan3: {
      data: '',
      selected: false
    },

    searchValue:'',
    films: [],
    xiaoqu: [{
      value: '',
      selected: false,
      title: '不限'
      },{
      value: '新校校区',
      selected: false,
      title: '新校校区'
    }, {
      value: '南校校区',
      selected: false,
      title: '南校校区'
    }, {
      value: '本部校区',
      selected: false,
      title: '本部校区'
    }, {
      value: '铁道校区',
      selected: false,
      title: '铁道校区'
    }, {
      value: '湘雅校区',
      selected: false,
      title: '湘雅校区'
    }],
    zhuanye: [{
      value: '',
      selected: false,
      title: '不限'
    }, {
        value: '计算机',
        selected: false,
        title: '计算机'
      }, {
        value: '数学',
        selected: false,
        title: '数学'
      }, {
        value: '物理',
        selected: false,
        title: '物理'
      }, {
        value: '地理',
        selected: false,
        title: '地理'
      }, {
        value: '经济学',
        selected: false,
        title: '经济学'
      }, {
        value: '语言学',
        selected: false,
        title: '语言学'
      }, {
        value: '医学',
        selected: false,
        title: '医学'
      }, {
        value: '生物学',
        selected: false,
        title: '生物学'
      }, {
        value: '土木',
        selected: false,
        title: '土木'
      }, {
        value: '艺术',
        selected: false,
        title: '艺术'
      }, {
        value: '其他',
        selected: false,
        title: '其他'
      }],
    zhonglei: [{
      value: '',
      selected: false,
      title: '不限'
    }, {
      value: '专业教材',
      selected: false,
      title: '专业教材'
    }, {
      value: '课外考试',
      selected: false,
      title: '课外考试'
    }, {
      value: '文学作品',
      selected: false,
      title: '文学作品'
    }, {
      value: '期刊杂志',
      selected: false,
      title: '期刊杂志'
    }, {
      value: '其他',
      selected: false,
      title: '其他'
    }],
    xuanxiaoqu:'',
    xuanzhuanye:'',
    xuanzhonglei:'',
    loading: false,
    openid:'',
    b_id:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
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
  },
  inp: function (e) {
    this.data.searchValue = e.detail.value
  },
  mySelect1:function(e) {
    var name = e.currentTarget.dataset.name
    if(name==''){
    this.setData({
      xuanxiaoqu: name,
      select1: false,
      yixuan1:{
        data:'不限',
        selected:true
      }
    })
    }else{
      this.setData({
        xuanxiaoqu: name,
        select1: false,
        yixuan1: {
          data: name,
          selected: true
        }
      })
    }
    this.tabSelect()
  },
  mySelect2: function (e) {
    var name = e.currentTarget.dataset.name
    if (name == '') {
      this.setData({
        xuanzhuanye:name,
        select2: false,
        yixuan2: {
          data: '不限',
          selected: true
        }

      })
    } else {
      this.setData({
        xuanzhuanye: name,
        select2: false,
        yixuan2: {
          data: name,
          selected: true
        }
      })
    }
    this.tabSelect()
  },
  mySelect3: function (e) {
    var name = e.currentTarget.dataset.name
    if (name == '') {
      this.setData({
        xuanzhonglei: name,
        select3: false,
        yixuan3: {
          data: '不限',
          selected: true
        }

      })
    } else {
      this.setData({
        xuanzhonglei: name,
        select3: false,
        yixuan3: {
          data: name,
          selected: true
        }
      })
    }
    this.tabSelect()
  },
  bindShowMsg1:function() {
    this.setData({
      select1: !this.data.select1
    })
  },
  bindShowMsg2: function () {
    this.setData({
      select2: !this.data.select2
    })
  },
  bindShowMsg3: function () {
    this.setData({
      select3: !this.data.select3
    })
  },
  
  tabSelect:function(){
    var that = this
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') +'/wx1/book/select_tab.php?&canshu1='+this.data.xuanxiaoqu +'&canshu2='+ this.data.xuanzhuanye+'&canshu3='+ this.data.xuanzhonglei,
      success: function (res) {
        console.log(res.data)
        /*
        if (res.data.length==0) {
          console.log('没找到')
          wx.showModal({
            title: '提示',
            content: '没有找到相应书籍！',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
        else {*/
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");
          var json = JSON.parse(jsonStr);
          res.data = json;
        }
        console.log(res.data)
        that.setData({
          films:res.data,
          loading: true,
          count: res.data.length
        })
        console.log('show openid: ' + res.data.openid)
        //}
      }
    })
  },
 
  conditionalsearch:function(){
    if (this.data.searchValue == "" ) {
      this.getdata()
    }
    else {
    var that = this
    wx.request({
      url: 'https://' + wx.getStorageSync('ip') +'/wx1/book/select_bn.php?b_name='+this.data.searchValue,
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
        /*
        if (res.data.length == 0) {
          wx.showModal({
            title: '提示',
            content: '没有找到此书',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          that.setData({
            searchValue: '',
          })        }
        else {*/
        that.setData({
          films: res.data,
          searchValue: '',
          loading: true,
          count: res.data.length
        })

        //}
      }
    })
    }
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
    if (app.globalData.userInfo == undefined){
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
      url: 'http://' + wx.getStorageSync('ip') +'/wx1/book/select_all.php',
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
          films: res.data,
          loading: true
        })
      }
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getdata()
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
    console.log("刷新中")
  },

  newNavi:function(e){
    wx.navigateTo({
      url: '/pages/addsps/addsps',
    })
  },

  todetail: function (e) {
    var item = e.currentTarget.dataset.bean
    console.log(item)
    wx.navigateTo({
      url:"../../pages/detail/detail?b_id=" + item.b_id
        + " &s_id=" + item.s_id + "&b_name=" + getApp().chan(item.b_name)
        + "&auther=" + getApp().chan(item.auther) + "&picture_id=" + item.picture_id + "&descrip=" + getApp().chan(item.descrip) + "&send_time=" + item.send_time + "&looks=" + item.looks + "&comments=" + item.comments + "&cover=" + item.cover + "&tab=" + item.tab + "&name=" + item.wx_name + "&phone=" + item.s_phone
    })
  }
})
 
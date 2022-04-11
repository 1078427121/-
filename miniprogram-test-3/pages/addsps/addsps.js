// pages/addsps/addsps.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:getApp().globalData.currentPhone,
    xiaoqu: [{
      value: '新校校区',
      selected: false,
      title: '新校校区'
    },{
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
      zhonglei:[{
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
      label1:[],
    label2: [],
    label3: [],
    showView1: false, 
    showView2: false,
    showView3: false,
    openid:'',
    nickName:'',
    auther:'',
    bookname:'',
    bookdetail:'',
    imagelist: [],
    b_id:'',
    tx:'',
  },

  in1: function (e) {
    this.data.bookname = e.detail.value
  },
  in2: function (e) {
    this.data.auther = e.detail.value
  },
  in3: function (e) {
    this.data.bookdetail = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  img:function(e){
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          that.setData({
            imagelist: res.tempFilePaths
          })
        },
      })
  },
  onChangeShowState1: function () {
    var that = this;
    that.setData({
      showView1: (!that.data.showView1)
    })
  },
  checkboxChange1(e) {
    console.log('checkboxChange1 e:', e);
    let string = "xiaoqu[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.xiaoqu[e.target.dataset.index].selected
    })
    let detailValue = this.data.xiaoqu.filter(it => it.selected).map(it => it.value)
    this.data.label1=detailValue;
    console.log('所有选中的值为：', detailValue)
  },
  checkboxChange2(e) {
    console.log('checkboxChange2 e:', e);
    let string = "zhuanye[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.zhuanye[e.target.dataset.index].selected
    })
    let detailValue = this.data.zhuanye.filter(it => it.selected).map(it => it.value)
    this.data.label2 = detailValue;
    console.log('所有选中的值为：', detailValue)
  },
  checkboxChange3(e) {
    console.log('checkboxChange3 e:', e);
    let string = "zhonglei[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.zhonglei[e.target.dataset.index].selected
    })
    let detailValue = this.data.zhonglei.filter(it => it.selected).map(it => it.value)
    this.data.label3 = detailValue;
    console.log('所有选中的值为：', detailValue)
  },
  onChangeShowState2: function () {
    var that = this;
    that.setData({
      showView2: (!that.data.showView2)
    })
  }, onChangeShowState3: function () {
    var that = this;
    that.setData({
      showView3: (!that.data.showView3)
    })
  },
  submit:function(e){
    var that=this
    /*
    if (wx.getStorageSync('phone')==''){
      wx.showModal({
        title: '提示',
        content: '请先在个人界面填写手机号！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
    else */if (this.data.bookname == "" || this.data.auther == "" || this.data.imagelist.length == 0 ) {
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
      var date = new Date();
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : da4te.getMonth() + 1;
      var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var currentdate = date.getFullYear() + month + strDate + date.getHours() + date.getMinutes() + date.getSeconds();
      var bid = currentdate + Math.floor(Math.random() * 9999)
      console.log('b_id: ' + bid)
      console.log('s_id: ' + getApp().globalData.currentOpenID)
      console.log('标签' + this.data.label + '完')
      console.log('手机号 ' + getApp().globalData.currentPhone)
      console.log('头像 ' + wx.getStorageSync('imgurl') + ' 完')
      this.data.bookname = getApp().chan(this.data.bookname)
      this.data.auther = getApp().chan(this.data.auther)
      this.data.bookdetail = getApp().chan(this.data.bookdetail)
      wx.request({
        url: 'https://' + wx.getStorageSync('ip') + '/wx1/book/insert.php?' + '&b_id=' + bid + '&b_name=' + this.data.bookname + '&descrip=' + this.data.bookdetail + '&s_id=' + getApp().globalData.currentOpenID + '&send_time=' + util.formatTime(new Date()) + '&auther=' + this.data.auther + '&wx_name=' + wx.getStorageSync('nickname') + '&picture_id=' + wx.getStorageSync('imgurl') + '&tab=' + this.data.label1.toString() + ','+this.data.label2.toString()+',' + this.data.label3.toString() + '' + '&s_phone=' + getApp().globalData.currentPhone,
        header: {
          'content-type': 'application/json' 
        },
        success: function (res) {
          var uurl = 'https://' + wx.getStorageSync('ip')+'/wx/load_cover.php?b_id=' + bid
          console.log('url: '+uurl)

            wx.uploadFile({
              url:uurl,

              filePath: that.data.imagelist[0],
              name: 'file',
              success: function (res) {
                console.log('封面' + res.data+'阿达杀手')

                /*
                var uurl = 'http://188.131.216.56/wx1/book/update_c.php?b_id=' + id + '&cover=' +'http://188.131.216.56/m_pro/min_img/' + res.data
                console.log('url：'+uurl)
                wx.request({
                  
                  url:uurl,
                  success: function (res) {
                    console.log(res.data)
                  }
                })
                console.log('bcid'+res.data)
  */
              }
            })
          }
        
      })
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
  },
  onLoad:function (options) {
    this.setData({
    })
    console.log(this.data.openid)

    if (getApp().globalData.currentPhone == '' || getApp().globalData.currentPhone == undefined || getApp().globalData.currentPhone == null) {
      wx.showModal({
        title: '提示',
        content: '请先在个人界面填写手机号！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
              delta: -1
            });
          }
          else{
            wx.navigateBack({
              delta: -1
            });
          }
        }
      })
      /*
      wx.navigateBack({
        delta: -1
      });
      */
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
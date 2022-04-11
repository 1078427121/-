// pages/personal_detail/personal_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempUserName: null,
    tempStudentID: null,
    tempOpenID: null,
    tempPhone: null,
    localUserName: null,
    localStudentID: null,
    localOpenID: null,
    localPhone: null,
    flag:0,
  },

  focusName:function(e){
    this.setData({
      localUserName: ""
    })
  },

  focusStudentID: function (e) {
    this.setData({
      localStudentID: ""
    })
  },

/*
  focusOpenID: function (e) {
    this.setData({
      localOpenID: ""
    })
  },
*/
  focusPhone: function (e) {
    this.setData({
      localPhone: ""
    })
  },

  blurName: function (e) {
    this.setData({
      localUserName: getApp().globalData.currentUserName
    })
  },

  blurStudentID: function (e) {
    this.setData({
      localStudentID: getApp().globalData.currentStudentID
    })
  },
/*
  blurOpenID: function (e) {
    this.setData({
      localOpenID: getApp().globalData.currentOpenID
    })
  },
*/
  blurPhone: function (e) {
    this.setData({
      localPhone: getApp().globalData.currentPhone
    })
  },

  getTempUserName:function(e){
    this.data.tempUserName = e.detail.value;
    //getApp().globalData.currentUserName = this.data.tempUserName;
    console.log("tempUserName " + this.data.tempUserName);
  },

  getTempStudentID: function (e) {
    this.data.tempStudentID = e.detail.value;
    console.log("tempStudentID " + this.data.tempStudentID);
  },
/*
  getTempOpenID:function(e){
    this.data.tempOpenID = e.detail.value;
    //getApp().globalData.currentOpenID = this.data.tempOpenID;
    console.log("tempOpenID " + this.data.tempOpenID);
  },
*/
  getTempPhone: function (e) {
    var that=this
    this.data.tempPhone = e.detail.value;
    //getApp().globalData.currentPhone = this.data.tempPhone;
    console.log("tempPhone " + this.data.tempPhone);
  },

  clearName: function (e) {
    getApp().globalData.currentUserName = "";
    this.data.tempUserName = "";
    var that = this;
    wx.setStorageSync('wx_name', this.data.tempUserName)
    wx.request({
      url: 'https://www.lyx223.xyz/wx1/student/update.php?' + 's_id=' + getApp().globalData.currentOpenID + '&name=' + getApp().globalData.currentUserName + '&s_no=' + getApp().globalData.currentStudentID + '&phone_num=' + getApp().globalData.currentPhone,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.error) {
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
          })
        } else {
          that.setData({
            localUserName: "",
            tempUserName:""
          })
          wx.showToast({
            title: '清除成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  },

  clearStudentID: function (e) {
    getApp().globalData.currentStudentID = "";
    this.data.tempStudentID = "";
    var that = this;
    wx.setStorageSync('s_no', this.data.tempStudentID)
    wx.request({
      url: 'https://www.lyx223.xyz/wx1/student/update.php?' + 's_id=' + getApp().globalData.currentOpenID + '&name=' + getApp().globalData.currentUserName + '&s_no=' + getApp().globalData.currentStudentID + '&phone_num=' + getApp().globalData.currentPhone,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.error) {
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
          })
        } else {
          that.setData({
            localStudentID: "",
            tempStudentID:""
          })
          wx.showToast({
            title: '清除成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  },

  clearPhone:function(e){
    getApp().globalData.currentPhone = "";
    this.data.tempPhone="";
    var that=this;
    wx.setStorageSync('phone', "")
    wx.request({
      url: 'https://www.lyx223.xyz/wx1/student/update.php?' + 's_id=' + getApp().globalData.currentOpenID + '&name=' + getApp().globalData.currentUserName + '&s_no=' + getApp().globalData.currentStudentID + '&phone_num=' + getApp().globalData.currentPhone,
      method: 'POST',  
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.error) {
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
          })
        } else {
          that.setData({
            localPhone: "",
            tempPhone:""
          })
          wx.showToast({
            title: '清除成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      }
    })
  },

  check:function(e){
    var ph
    if (this.data.tempPhone != null) {
      ph = this.data.tempPhone;
    }
    else ph = getApp().globalData.currentPhone
    if(ph==null||ph=="") return 0;
    if(ph[0]!='1') return 1;
    if(ph.length!=11) return 1;
    return 0;
  },

  resetUserInfo:function(e){
    if(this.check()==1){
      this.setData({
        flag:1
      })
      return;
    }
    else{
      this.setData({
        flag: 0
      })
    }
    if (this.data.tempUserName!=null){
      getApp().globalData.currentUserName = this.data.tempUserName;
      this.localUserName = this.data.tempUserName;
      console.log(this.localUserName)
      this.setData({
        localUserName:this.localUserName
      })
    }
    if (this.data.tempStudentID != null) {
      getApp().globalData.currentStudentID = this.data.tempStudentID;
      this.localStudentID=this.data.tempStudentID;
      this.setData({
        localStudentID:this.localStudentID
      })
    }
    /*
    if (this.data.tempWXCode!=null){
      getApp().globalData.currentOpenID = this.data.tempOpenID;
    } 
    */
    if (this.data.tempPhone!=null){
      getApp().globalData.currentPhone = this.data.tempPhone;
      this.localPhone=this.data.tempPhone;
      this.setData({
        localPhone:this.localPhone
      })
    }
    wx.setStorageSync('phone', this.data.tempPhone)
    wx.request({
      url: 'https://www.lyx223.xyz/wx1/student/update.php?' + 's_id=' + getApp().globalData.currentOpenID + '&name=' + getApp().globalData.currentUserName + '&s_no=' + getApp().globalData.currentStudentID + '&phone_num=' + getApp().globalData.currentPhone,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.error) {
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '保存成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      }
    })
/*
    wx.showToast({
      title: '保存成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
    */
    console.log("reset " + getApp().globalData.currentUserName
      + " " + getApp().globalData.currentStudentID
      + " " + getApp().globalData.currentOpenID
      + " " + getApp().globalData.currentPhone);

    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    wx.request({
      url: 'https://www.lyx223.xyz/wx1/student/select.php?' + 's_id=' + getApp().globalData.currentOpenID, //服务器地址
      method: 'POST',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log("个人信息 "+getApp().globalData.currentOpenID);
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
          var json = JSON.parse(jsonStr);
          res.data = json;
        }
        console.log(res.data);
        var currentUserName = 'getApp().globalData.currentUserName';
        var currentStudentID = 'getApp().globalData.currentStudentID';
        var currentOpenID = 'getApp().globalData.currentOpenID';
        var currentPhone = 'getApp().globalData.currentPhone';
        that.setData({
          localUserName: res.data.name,
          localStudentID: res.data.s_no,
          localOpenID: res.data.s_id,
          localPhone: res.data.phone_num,
        })
        getApp().globalData.currentUserName = res.data.name
        getApp().globalData.currentStudentID = res.data.s_no
        getApp().globalData.currentOpenID = res.data.s_id
        getApp().globalData.currentPhone = res.data.phone_num
        console.log(getApp().globalData.currentUserName + " " + getApp().globalData.currentStudentID + " " + getApp().globalData.currentOpenID + " " + getApp().globalData.currentPhone)
      },
      fail: function (res) {
        console.log("失败");
      }
    })
/*
    this.setData({
      localUserName: getApp().globalData.currentUserName,
      localStudentID: getApp().globalData.currentStudentID,
      localWXCode: getApp().globalData.currentWXCode,
      localPhone: getApp().globalData.currentPhone
    })
*/
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
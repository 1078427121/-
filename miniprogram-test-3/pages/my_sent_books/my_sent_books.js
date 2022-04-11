// pages/my_sent_books/my_sent_books.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    delBtnWidth: 160,
    sentList: [
    ],
    scrollLeft: 0,
    touchStartPageX: 0,
  },

  itemDetail: function (e) {
    var item = this.data.sentList[e.currentTarget.dataset.index]
    console.log(item)
    wx.navigateTo({
      url: "../../pages/detail/detail?b_id=" + item.book_id
        + " &s_id=" + item.student_id + "&b_name=" + getApp().chan(item.book_name)
        + "&auther=" + getApp().chan(item.book_author) + "&picture_id=" + item.picture_id + "&descrip=" + getApp().chan(item.book_detail) + "&send_time=" + item.book_time + "&looks=" + item.book_browse + "&comments=" + item.book_comments + "&cover=" + item.book_cover + "&tab=" + item.book_tab + "&name=" + item.student_wxname + "&phone=" + item.student_phone
    })
  },

  deleteItem:function(e){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          console.log('用户点击确定')
          let id = that.data.sentList[e.currentTarget.dataset.index].book_id
          console.log(id)
          that.data.sentList.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            sentList: that.data.sentList,
            scrollLeft:0,
          })
          
          wx.request({
            url: 'https://www.lyx223.xyz/wx1/book/delete.php?' + 'b_id=' + id,
            data: {
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            method: 'DELETE',
            success: function (res) {
              console.log(res.data)
            }
          })
          
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  drawStart: function (e) {
    this.setData({
      touchStartPageX: e.changedTouches[0].pageX,
    })
  },
  drawMove: function (e) {
  },
  drawEnd: function (e) {
    let touchEndPageX = e.changedTouches[0].pageX,
      offSetStartToEnd = touchEndPageX - this.data.touchStartPageX;
    if (offSetStartToEnd < 10 & offSetStartToEnd > -10) {
      return;
    };
    let index = e.currentTarget.dataset.index
    if (offSetStartToEnd <= -10) {
      for(var i in this.data.sentList){
        if(i===index){
          this.setData({
            scrollLeft: 160
          })
        }
      }
      //this.setData({
      //  scrollLeft: 160
      //})
    };
    if (offSetStartToEnd >= 10) {
      if (this.data.scrollLeft === 0) return;
      this.setData({
        scrollLeft: 0,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://www.lyx223.xyz/wx1/book/select_sid.php?' + 's_id=' + getApp().globalData.currentOpenID, //服务器地址
      method: 'POST',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data);
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");
          var json = JSON.parse(jsonStr);
          res.data = json;
        }
        console.log("这里这里")
        console.log(res.data);
        let sentList=that.data.sentList;
        for(var i=0;i<res.data.length;i++){
          var item_b_id = 'sentList[' + i + '].book_id';
          var item_s_id='sentList['+i+'].student_id';
          var item_b_name = 'sentList[' + i + '].book_name';
          var item_b_author='sentList['+i+'].book_author';
          var item_b_picture_id='sentList['+i+'].picture_id';
          var item_b_detail = 'sentList[' + i + '].book_detail';
          var item_b_com_num = 'sentList[' + i + '].book_comments';
          var item_b_browse = 'sentList[' + i + '].book_browse';
          var item_b_time = 'sentList[' + i + '].book_time';
          var item_show_time = 'sentList[' + i + '].show_time';
          var item_b_cover='sentList['+i+'].book_cover';
          var item_b_tab='sentList['+i+'].book_tab';
          var item_s_wxname='sentList['+i+'].student_wxname';
          var item_s_phone='sentList['+i+'].student_phone';
          var time = res.data[i].send_time.substring(0, 10);
          that.setData({
            [item_b_id] :res.data[i].b_id,
            [item_s_id]:res.data[i].s_id,
            [item_b_name] : res.data[i].b_name,
            [item_b_author]:res.data[i].auther,
            [item_b_picture_id]:res.data[i].picture_id,
            [item_b_detail] : res.data[i].descrip,
            [item_b_com_num] : res.data[i].comments,
            [item_b_browse] : res.data[i].looks,
            [item_show_time] : time,
            [item_b_time]: res.data[i].send_time,
            [item_b_cover]:res.data[i].cover,
            [item_b_tab]:res.data[i].tab,
            [item_s_wxname]:res.data[i].wx_name,
            [item_s_phone]:res.data[i].s_phone,
          })
        }   
        console.log(sentList) 
        sentList.reverse();
        that.setData({
          sentList: sentList
        })
        console.log(sentList)    
      },
      fail: function (res) {
        console.log("失败");
      }
    })

    console.log("mysentbooks: onLoad")
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("mysentbooks: onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
    console.log("mysentbooks: onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("mysentbooks: onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("mysentbooks: onUnload")
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
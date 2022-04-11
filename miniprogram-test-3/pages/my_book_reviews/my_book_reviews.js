// pages/my_book_reviews/my_book_reviews.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookReviewList: [
    ],
    scrollLeft: 0,
    touchStartPageX: 0,
  },

  itemDetail: function (e) {
    var item = this.data.bookReviewList[e.currentTarget.dataset.index]
    console.log(item)
    wx.navigateTo({
      url: "../../pages/detail1/detail?bc_id=" + item.book_id+"&name=" + item.student_wxname
        + " &content=" + getApp().chan(item.book_detail) + "&bname=" + getApp().chan(item.book_name)
        + "&time=" + item.book_time + "&dz=" + item.book_likes + "&pl=" + item.book_comments + "&tx=" + item.student_avatar + "&looks=" + item.book_browse 
    })
    
  },

  deleteItem: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          console.log('用户点击确定')
          let id = that.data.bookReviewList[e.currentTarget.dataset.index].book_id
          console.log(id)
          that.data.bookReviewList.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            bookReviewList: that.data.bookReviewList,
            scrollLeft: 0,
          })
          wx.request({
            url: 'https://www.lyx223.xyz/wx1/book_comment/delete.php?' + 'bc_id=' + id,
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
      for (var i in this.data.bookReviewList) {
        if (i === index) {
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
    var that = this
    wx.request({
      url: 'https://www.lyx223.xyz/wx1/book_comment/select_sid.php?' + 's_id=' + getApp().globalData.currentOpenID, //服务器地址
      method: 'POST',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data);
        var jsonStr = res.data;
        jsonStr = jsonStr.replace(" ", "");
        if (typeof jsonStr != 'object') {
          jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
          var json = JSON.parse(jsonStr);
          res.data = json;
        }
        console.log(res.data);     
        let bookReviewList = that.data.bookReviewList;
        for (var i = 0; i < res.data.length; i++) {
          var item_br_id = 'bookReviewList[' + i + '].book_id';
          var item_s_wxname='bookReviewList['+i+'].student_wxname';
          var item_br_name = 'bookReviewList[' + i + '].book_name';
          var item_br_detail = 'bookReviewList[' + i + '].book_detail';
          var item_br_like = 'bookReviewList[' + i + '].book_likes';
          var item_br_com_num = 'bookReviewList[' + i + '].book_comments';
          var item_br_browse = 'bookReviewList[' + i + '].book_browse';
          var item_br_time = 'bookReviewList[' + i + '].book_time';
          var item_show_time = 'bookReviewList[' + i + '].show_time';
          var time = res.data[i].time.substring(0, 10);
          var item_s_avatar='bookReviewList['+i+'].student_avatar';
          that.setData({
            [item_br_id]:res.data[i].bc_id,
            [item_s_wxname]:res.data[i].s_name,
            [item_br_name]: res.data[i].b_name,
            [item_br_detail]: res.data[i].content,
            [item_br_like] : res.data[i].goods,
            [item_br_com_num]: res.data[i].comments,
            [item_br_browse]: res.data[i].looks,
            [item_show_time]: time,
            [item_br_time]: res.data[i].time,
            [item_s_avatar]:res.data[i].s_touxiang,
          })
        } 
        console.log(bookReviewList)     
        //bookReviewList.reverse();
        //that.setData({
        //  bookReviewList: bookReviewList
        //})
        console.log(bookReviewList)      
      },
      fail: function (res) {
        console.log("失败");
      }
    })
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
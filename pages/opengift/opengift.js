import {
  Config
} from '../../utils/config.js';
const app = getApp();
Page({

  data: {
    imageUrl: "https://www.jwnice.com/h5/saoxing/",
    hezi2: 1,
    hezi2_time: null,
    hezi3: 1,
    hezi3_time: null,
    gwkCode:"",
    gwkPwd: "",
    gwkUrl: "",
    mytype: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      imageUrl: Config.imageUrl
    });
    console.log("mytype",options);
    // 1 优惠卷 2 购物卡
    that.data.mytype = options.mytype;
    that.playhezi2();
    if (that.data.mytype == 4) {
      that.playhezi2();
    } else if (that.data.mytype == 1 || that.data.mytype == 2 || that.data.mytype == 3) {
      that.playhezi3();
      that.data.gwkCode = options.gwkCode;
      that.data.gwkPwd = options.gwkPwd;
      that.data.gwkUrl = options.gwkUrl;
    }

    that.setData({
      mytype: that.data.mytype
    })
  },
  getHyj(){
    let that = this;
    if (that.data.mytype == 4) {
      this.getCouponUrl();
    } else if (that.data.mytype == 1 || that.data.mytype == 2 || that.data.mytype == 3) {
      wx.redirectTo({
        url: '../index/index?from=2&gwktype=' + that.data.mytype + '&gwkCode=' + that.data.gwkCode + '&gwkPwd=' + that.data.gwkPwd + '&gwkUrl=' + that.data.gwkUrl,
      })
    }
  },

  getCouponUrl() {
    wx.request({
      method: "POST",
      dataType: "json",
      url: Config.restUrl + 'GetCouponUrl.json',
      data: {
        token: wx.getStorageSync('token'),
        type: 2001
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        console.log("decodeURIComponent", decodeURIComponent(res.data.data));
        app.globalData.h5url = res.data.data
        app.globalData.openGift = true
        wx.navigateTo({
          url: '../h5/h5',
        })
      }
    })
  },
  playhezi3(){
    let that = this;
    // 首页标题
    if (that.data.hezi3_time == null) {
      that.data.hezi3_time = setInterval(function () {
        that.data.hezi3 = that.data.hezi3 % 16
        that.data.hezi3++
        that.setData({
          hezi3: that.data.hezi3
        })
        if (that.data.hezi3 == 16) {
          that.stophezi3()
          that.playhezi3_2();
        }
      }, 150)
    }
  },
  playhezi2(){
    let that = this;
    // 首页标题
    console.log(that.data.hezi2_time);
    if (that.data.hezi2_time == null) {
      that.data.hezi2_time = setInterval(function () {
        that.data.hezi2 = that.data.hezi2 % 16
        that.data.hezi2++
        that.setData({
          hezi2: that.data.hezi2
        })
        if (that.data.hezi2 == 16) {
          that.stophezi2()
          that.playhezi2_2();
        }
      }, 150)
    }
  },
  playhezi3_2() {
    let that = this;
    that.data.hezi3 = 10
    // 首页标题
    if (that.data.hezi3_time == null) {
      that.data.hezi3_time = setInterval(function () {
        that.data.hezi3++
        that.setData({
          hezi3: that.data.hezi3
        })
        if (that.data.hezi3 == 15) {
          that.data.hezi3 = 10
        }
      }, 150)
    }
  },
  playhezi2_2() {
    let that = this;
    that.data.hezi2 = 10
    // 首页标题
    if (that.data.hezi2_time == null) {
      that.data.hezi2_time = setInterval(function () {
        that.data.hezi2++
        that.setData({
          hezi2: that.data.hezi2
        })
        if (that.data.hezi2 == 15) {
          that.data.hezi2 = 10
        }
      }, 150)
    }
  },
  stophezi2() {
    let that = this;
    if (that.data.hezi2_time != null) {
      clearInterval(that.data.hezi2_time);
      that.data.hezi2 = 1
      that.data.hezi2_time = null
    }
  },
  stophezi3() {
    let that = this;
    if (that.data.hezi3_time != null) {
      clearInterval(that.data.hezi3_time);
      that.data.hezi3 = 1
      that.data.hezi3_time = null
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
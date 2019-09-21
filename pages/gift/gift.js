import {
  Config
} from '../../utils/config.js';
const app = getApp();
Page({
  smwtTitle: '我的好礼',
  /**
   * 页面的初始数据
   */
  data: {
    gifts: [],
    getGift: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.getGifts()
    that.checkisDraw()
  },
  indexinfo(){
    app.smwt.track('event', 'button', '进入永辉生活', '我的好礼页面', '')
    wx.navigateToMiniProgram({
      appId: 'wxc9cf7c95499ee604',
      success(res) {
        // 打开成功
      }
    })
  },
  // 获取三公里门店
  getHongBao() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log("getLocation", res);
        that.data.lat = res.latitude;
        that.data.lng = res.longitude
      
        wx.request({
          method: "get",
          dataType: "json",
          url: Config.restUrl + 'isMenDianBy3.json',
          data: {
            token: wx.getStorageSync('token'),
            lat: that.data.lat,
            lng: that.data.lng
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success(res) {
            console.log(res.data);
            if (res.data.data != 0) {
          
            } else {
              that.setData({
                getGift: false
              })
            }
          }
        })
      }
    })
  },
  // 判断是否已经抽奖
  checkisDraw() {
    let that = this;
    wx.request({
      method: "POST",
      dataType: "json",
      url: Config.restUrl + 'isDraw.json',
      data: {
        token: wx.getStorageSync("token")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        if (res.data.metaInfo.code == 0) {
          if (res.data.data == 0) {
            // 未抽奖
            that.setData({
              getGift:true
            })
          } else if (res.data.data == 1) {
            // 已抽奖
            that.setData({
              getGift: false
            })
          }

          // that.getHongBao()
        }

      }
    })
  },
  indexscan(){
    app.smwt.track('event', 'button', '查看附近门店', '我的好礼页面', '')
    // if (app.globalData.inShop == true) {
    //   wx.redirectTo({
    //     url: '../index/index?from=3',
    //   })
    // }else {
    //   wx.redirectTo({
    //     url: '../index/index?from=4',
    //   })
    // }
    wx.redirectTo({
      url: '../index/index?from=4',
    })
  },
  openLink(e){
    app.globalData.h5url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: '../h5/h5',
    })
  },
  getGifts() {
    let that = this;
    wx.request({
      method: "post",
      dataType: "json",
      url: 'https://yilistar.angwei.net/wxApi/xcx/getCouponList.json',
      data: {
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if (res.data.metaInfo.code == 0) {
          that.data.gifts = res.data.data
          that.setData({
            gifts: that.data.gifts
          })
        } else {
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //动态设定⼩程序⻚⾯标题
    wx.setNavigationBarTitle({
      title: '我的好礼'
    })
    //设定后设置this.smwtTitle进⾏⻚⾯标题的监测配置
    this.smwtTitle = '我的好礼'
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
import {
  Config
} from '../../utils/config.js';
const app = getApp();

Page({
  smwtTitle: '我的星星',
  /**
   * 页面的初始数据
   */
  data: {
    xxNum:0,
    xx_i:1,
    imageUrl: "https://lingke-static-cdn-https.angwei.net/event/yili/saoxing/",
    xx_time:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options)
    that.data.xxNum = options.xxNum
    that.setData({
      xxNum: that.data.xxNum
    })
    that.playxx()
  },
  goindexScan(){
    this.stopxx();
    wx.redirectTo({
      url: '../index/index?from=3',
    })
    // wx.navigateBack({})
  },
  playxx() {
    let that = this;
    // 首页标题
    if (that.data.xx_time == null) {
      that.data.xx_time = setInterval(function () {
        that.data.xx_i = that.data.xx_i % 16
        that.data.xx_i++
        that.setData({
          xx_i: that.data.xx_i
        })
      }, 100)
    }
  },
  stopxx(){
    let that = this;
    if (that.data.xx_time!=null) {
      clearInterval(that.data.xx_time);
      that.data.xx_i = 1
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
    wx.setNavigationBarTitle({
      title: '我的星星'
    })
    //设定后设置this.smwtTitle进⾏⻚⾯标题的监测配置
    this.smwtTitle = '我的星星'
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
import {
  Config
} from '../../utils/config.js';
const app = getApp();
// const ImageSource = require('../../utils/ImageSource.js');
// const ImageLoader = require('../../utils/ImgageLoader.js');

Page({
  data: {
    ColorList: app.globalData.ColorList,
    color: 'red',
    showYiLiDiaLog: false,
    showLingQu: false,
    showHongBao: false,
    inShop: true,
    yhj_i: 1,
    yhj_time: null,
    xxtitle_i: 0,
    xxtitle_time: null,
    resData:{},
    myXNum:0,
    lat: 0,
    lng: 0,
    hongbao_i: 1,
    lingQuChengong: false,
    imageUrl: "http://image.jwnice.com/yili/wxapp/",
    showStartDiaLog: false
  },
  onLoad(options) {
    let that = this;
    console.log("options", options);
    if (options.form != undefined) {
      if (options.form == 0) {
        if (options.res == 0) {
          that.lingQuChengong = true
          that.setData({
            lingQuChengong: that.lingQuChengong
          })
        }
      }
    }


    // var loader = new ImageLoader({
    //   base: ImageSource.BASE,
    //   source: [ImageSource.imageList, ImageSource.index],
    //   loading: res => {
    //     // 可以做进度条动画
    //     console.log("loading", res);
    //   },
    //   loaded: res => {
    //     // 可以加载完毕动画
    //     console.log("loading222", res);
    //   }
    // });

    // 红包
    // that.data.timer = setInterval(function () {
    //   that.data.hongbao_i = that.data.hongbao_i % 27
    //   that.data.hongbao_i++
    //   that.setData({
    //     hongbao_i: that.data.hongbao_i
    //   })
    // }, 200)
    that.setData({
      imageUrl: Config.imageUrl
    });

  },
  isDraw() {
    let that = this;
    wx.request({
      method: "post",
      dataType: "json",
      url: Config.restUrl + 'isDraw.json',
      data: {
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if (res.data.metaInfo.code == 0) {
          if (res.data.data == 0) {
            // 未抽奖
            that.startDraw()
          } else if (res.data.data == 1) {
            // 已抽奖
          }
        }
      }
    })
  },
  startDraw() {
    let that = this;
    wx.request({
      method: "post",
      dataType: "json",
      url: Config.restUrl + 'startDraw.json',
      data: {
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
      }
    })
  },
  openScan() {
    let that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        console.log(res.rawData)
        that.data.resData = {
          type: -1,
          local: ""
        }
        // miniapp_qrcode_263
        if (res.rawData == "a0lxZldzRGFDZ1kwfmRYK3ImTzo2MFRaWjVReCFuUWQk") {
          that.data.resData.type = 0
          that.data.resData.local = "bj"
        }
        // miniapp_qrcode_264
        else if (res.rawData == "a2h1WTAwVGN1SzdZfjNFckBDcXc0QHAtanY7Q0lwQzlHMg==") {
          that.data.resData.type = 1
          that.data.resData.local = "bj"
        }
        // miniapp_qrcode_265
        else if (res.rawData == "a3l6d212aDQydE1RfjNNM3A5TUxRcXVpMW41OEFCRHdYcw==") {
          that.data.resData.type = 2
          that.data.resData.local = "bj"
        }
        // miniapp_qrcode_266
        else if (res.rawData == "azhGRlJjMmlNQjk4fiFrTSQ/LzoqRC0nOi9jbkhBI2RE") {
          that.data.resData.type = 3
          that.data.resData.local = "bj"
        }
        // miniapp_qrcode_267
        else if (res.rawData == "a2E0cmk5R1Nia2ZZfip4Zj9UNCt+QT9nVkRIU0hpWmJf") {
          that.data.resData.type = 4
          that.data.resData.local = "bj"
        }
        // miniapp_qrcode_268
        else if (res.rawData == "a25pYndyZmtGODNNfjhVTW13YXlKSzhTNVpTPTBUJ25k") {
          that.data.resData.type = 5
          that.data.resData.local = "bj"
        }
        // miniapp_qrcode_269
        else if (res.rawData == "a3VsN09wM2VVUjRJfjFWO3RZUmhvfnduMStVdTlmTVdhYg==") {
          that.data.resData.type = 0
          that.data.resData.local = "sh"
        }
        // miniapp_qrcode_270
        else if (res.rawData == "azBIX0Y3UnF3Y3pFfjIxM1FTL1NpLzRTLm90a1RlU1lMNw==") {
          that.data.resData.type = 1
          that.data.resData.local = "sh"
        }
        // miniapp_qrcode_271
        else if (res.rawData == "a0oyNnplbEQ4X0ZnfjFrJyZucC5Bc3ZCNVItN2omV1ErdA==") {
          that.data.resData.type = 2
          that.data.resData.local = "sh"
        }
        // miniapp_qrcode_272
        else if (res.rawData == "a1N1VWhxNEZ4bmRJfjJjclBwbHM/VTdDK3dIQ2hyL053NA==") {
          that.data.resData.type = 3
          that.data.resData.local = "sh"
        }
        // miniapp_qrcode_273
        else if (res.rawData == "a25rSGJRMjNXSkFjfjEwRWRFTUBGMjtZZU5PP1dLdyZlRg==") {
          that.data.resData.type = 4
          that.data.resData.local = "sh"
        }
        // miniapp_qrcode_274
        else if (res.rawData == "azUtT3FtR0UzZ3NzfjFnJ0IjVnVNIysxPU0nRy9lUCNPdw==") {
          that.data.resData.type = 5
          that.data.resData.local = "sh"
        }
        // miniapp_qrcode_275
        else if (res.rawData == "a0NRTGkxVm9TcWRNfjFJLGlkY2ZJN0guIWI5ayRtamdj") {
          that.data.resData.type = 0
          that.data.resData.local = "cq"
        }
        // miniapp_qrcode_276
        else if (res.rawData == "a0xaZ0FkZ2NDOGc4fnomZHZvTFQsVCcxN0J4XzlqKXJG") {
          that.data.resData.type = 1
          that.data.resData.local = "cq"
        }
        // miniapp_qrcode_277
        else if (res.rawData == "a3pBVndINnAwdUhnfjFiI1hqVHUhO1pVQiZ0JyN2ZHlXNA==") {
          that.data.resData.type = 2
          that.data.resData.local = "cq"
        }
        // miniapp_qrcode_278
        else if (res.rawData == "a01VclRDdXhvNkk4fjIyKElBYTFvUnlTMVV0IWc3RC0/fg==") {
          that.data.resData.type = 3
          that.data.resData.local = "cq"
        }
        // miniapp_qrcode_279
        else if (res.rawData == "a0lOMzM2X2ZoQ3ZVfjIyU1QnSytZVk90ekkoZyZibzkqMg==") {
          that.data.resData.type = 4
          that.data.resData.local = "cq"
        }
        // miniapp_qrcode_280
        else if (res.rawData == "a0h5cExmb1AyVW04fmMvblVxcGQxcTMzXzoqa2QtQ2p3") {
          that.data.resData.type = 5
          that.data.resData.local = "cq"
        }
        
        let clientSystem = 3;
        if (that.data.resData.type !== -1) {
          wx.getSystemInfo({
            success: function(res) {
              console.log(res);
              if (res.platform == "android") {
                clientSystem = 2
              } else if (res.platform == "ios") {
                clientSystem = 1
              } else {
                clientSystem = 3
              }

              wx.request({
                method: "post",
                dataType: "json",
                url: Config.restUrl + 'saveTopRedisKey.json',
                data: {
                  token: wx.getStorageSync('token'),
                  clientSystem: clientSystem,
                  scanCode: JSON.stringify(that.data.resData)
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success(res) {
                  console.log(res.data);
                  if (res.data.metaInfo.code == 0) {
                    if (that.data.resData.type == 4 || that.data.resData.type == 5) {
                      that.saveMyStarsCount()
                    } else {
                      that.showYhj()
                    }
                  }
                }
              })
            }
          })

        }
      }
    })
  },
  showYhj(){
    console.log("展示优惠卷");
  },
  saveMyStarsCount(){
    let that = this;
    wx.request({
      method: "post",
      dataType: "json",
      url: Config.restUrl + 'saveMyStarsCount.json',
      data: {
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if (res.data.metaInfo.code == 0) {
          if (that.data.resData.type == 4) {
            that.data.myXNum = res.data.data
            that.getHongBao()
          } else if (that.data.resData.type == 5){
            that.data.myXNum = res.data.data
            that.data.showStartDiaLog = true
            that.setData({
              myXNum: that.data.myXNum,
              showStartDiaLog: that.data.showStartDiaLog
            });
          }
        }
      }
    })
  },

  getHongBao(){
    let that = this;
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
        // if (res.data.data == 0) {
          that.isGetHongbao()
        }
      }
    })
  },
  isGetHongbao(){
    let that = this;
    wx.request({
      method: "post",
      dataType: "json",
      url: Config.restUrl + 'isGetHongbao.json',
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
        if (res.data.data == 1) {
          // 可以领取
          that.getHongBaoUrl()
        } else if (res.data.data == -1) {
          that.getHongBaoUrl()
        } else if (res.data.data == 0) {

        }
      }
    })
  },
  getHongBaoUrl() {
    let that = this;
    wx.request({
      method: "post",
      dataType: "json",
      url: Config.restUrl + 'GetHongBaoUrl.json',
      data: {
        token: wx.getStorageSync('token'),
        type:"1234"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        app.globalData.h5url = res.data.data
        wx.navigateTo({
          url: '../h5/h5',
        })
      }
    })
  },
  getLocation() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log("getLocation", res);
        // that.data.lat = res.latitude
        // that.data.lng = res.longitude
        that.data.lat = 40.1131
        that.data.lng = 116.3775
        that.getMenDianBy3();
      },
      fail() {
        wx.getSetting({
          success: (res) => {
            console.log("getSetting", res);
            if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) { //非初始化进入该页面,且未授权
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
                success: function(res) {
                  if (res.cancel) {
                    that.setData({
                      isshowCIty: false
                    })
                    wx.showToast({
                      title: '授权失败',
                      icon: 'none',
                      duration: 1000
                    })
                    that.getLocation();
                  } else if (res.confirm) {
                    wx.openSetting({
                      success: function(dataAu) {
                        if (dataAu.authSetting["scope.userLocation"] == true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'none',
                            duration: 1400
                          })
                          // 再次授权，调用getLocationt的API
                          that.getLocation();
                          console.log("000000");
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'none',
                            duration: 1400
                          })
                          console.log("xxxxxxx");
                          that.getLocation();
                        }
                      }
                    })
                  }
                }
              })
            } else if (res.authSetting['scope.userLocation'] == undefined) { //初始化进入
              console.log("12321321");
              that.getLocation();
            } else { //授权后默认加载
              console.log("44444444");
              that.getLocation();
            }
          }
        })
      }
    })
  },

  // 获取三公里门店
  getMenDianBy3() {
    let that = this;
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
        that.isGetCoupon()
      }
    })
  },

  playXXTitle() {
    // 首页标题
    that.data.xxtitle_time = setInterval(function() {
      that.data.xxtitle_i = that.data.xxtitle_i % 12
      that.data.xxtitle_i++
        that.setData({
          xxtitle_i: that.data.xxtitle_i
        })
    }, 200)
  },
  stopXXTitle() {

  },
  goGift() {
    wx.navigateTo({
      url: '../gift/gift',
    })
  },
  getPhoneNumber(e) {
    let that = this;
    wx.request({
      method: "post",
      dataType: "json",
      url: Config.restUrl + 'updatePhone.json',
      data: {
        token: wx.getStorageSync('token'),
        phone: "15775108718"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        that.stopYhj();
        if (res.data.metaInfo.code == 0) {
          that.getCouponUrl()
        }
      }
    })
  },
  isGetCoupon() {
    let that = this;
    wx.request({
      method: "POST",
      dataType: "json",
      url: Config.restUrl + '/isGetCoupon.json',
      data: {
        token: wx.getStorageSync('token')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        // "0、未领取 ；1、已领取"
        if (res.data.data == 0) {
          that.playYhj()
          that.openGetPhone()
        } else if (res.data.data == 1) {
          that.playYhj()
          that.lingQuChengong = true
          that.setData({
            lingQuChengong: that.lingQuChengong
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '领取失败，请稍后重试',
            success(res) {
              if (res.confirm) {} else if (res.cancel) {}
            }
          })
        }
      }
    })
  },

  getCouponUrl() {
    wx.request({
      method: "POST",
      dataType: "json",
      url: Config.restUrl + 'GetCouponUrl.json',
      data: {
        token: wx.getStorageSync('token'),
        type: 1001
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        console.log("decodeURIComponent", decodeURIComponent(res.data.data));
        app.globalData.h5url = res.data.data
        wx.navigateTo({
          url: '../h5/h5',
        })
      }
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  login() {

  },
  checkSession() {
    let that = this;
    wx.request({
      method: "POST",
      dataType: "json",
      url: Config.restUrl + 'checkSession.json',
      data: {
        token: wx.getStorageSync("token")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        if (res.data.metaInfo.code == 0) {
          that.getLocation()

        } else {
          that.getUserInfo()
        }
      }
    })
  },


  getUserInfo() {
    let that = this;
    wx.request({
      method: "POST",
      dataType: "json",
      url: Config.restUrl + 'login.json',
      data: {
        jsonBody: JSON.stringify({
          userInfo: {
            avatarUrl:   "https://wx.qlogo.cn/mmopen/vi_32/Q19DlrwESf7L5ibPuflKlyDDXpTLFcYDOwT2Z0Z1bCUewyyq8qWP6rRhrdNsX0yZBKyHxwVnYsSSRupxZEdsYZg/132",
            city: "Wuhan",
            country: "China",
            gender: 1,
            language: "zh_CN",
            nickName: "小猪包",
            province: "Hubei"
          },
          unionid: "oPIsQ0-8I8SSmJe8kN58U835PJVY",
          openid: "oBPDr4hliKqjeuZq8JJZcp07aco8"
        })
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res);
        wx.setStorageSync("token", res.data.data);
        that.getLocation()
      }
    })
  },
  playYhj() {
    let that = this;
    // 优惠卷
    that.data.yhj_time = setInterval(function() {
      that.data.yhj_i = that.data.yhj_i % 17
      that.data.yhj_i++
        that.setData({
          yhj_i: that.data.yhj_i
        })
    }, 100)
  },
  stopYhj() {
    let that = this;
    if (that.data.yhj_time != null) {
      clearInterval(that.data.yhj_time);
      that.data.yhj_time = null;
    }
  },
  openGetPhone() {
    let that = this;
    that.data.showLingQu = true
    that.setData({
      showLingQu: that.data.showLingQu
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  SetColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color,
      modalName: null
    })
  },
  SetActive(e) {
    this.setData({
      active: e.detail.value
    })
  }
})
import {
  Config
} from '../../utils/config.js';
const app = getApp();
const ImageSource = require('../../utils/ImageSource.js');
const ImageLoader = require('../../utils/ImgageLoader.js');
// import memberService from '../../../../pages/memberModule/services/member.service';
Page({
  smwtTitle: '⾸⻚',
  data: {
    ColorList: app.globalData.ColorList,
    color: 'red',
    showYiLiDiaLog: false,
    showLingQu: false,
    showHongBao: false,
    loading: false,
    showGwk: false,
    showMD: false,
    showinfo: false,
    inShop: true,
    address: "点击下方按钮，查看附近门店",
    yhj_i: 1,
    yhj_time: null,
    xxtitle_i: 1,
    xx_i: 1,
    xx_time: null,
    hezi1_time: null,
    hezi1: 1,
    xxtitle_time: null,
    resData: {},
    myXNum: 1,
    lat: 0,
    lng: 0,
    hongbao_i: 1,
    lingQuChengong: false,
    loadingNow: false,
    gwkCode: "",
    gwkPwd: "",
    gwkUrl: "",
    hideHeizhi: false,
    userRes: null,
    heziload: 0,
    usermobile: 0,
    myoptions: {},
    imageUrl: "https://lingke-static-cdn-https.angwei.net/event/yili/saoxing/",
    showStartDiaLog: false
  },
  onLoad(options) {
    let that = this;
    // memberService.initMiniProgram(() => {
    //   // 这里写你的页面逻辑
    //   console.log('hello world');
    // });

    wx.showLoading({
      title: '加载中',
    })
    that.playTestHezi1()
    that.data.myoptions = options

    that.setData({
      imageUrl: Config.imageUrl,
      openGift: app.globalData.openGift,
      xxs: Config.xxs
    });

  },

  // 最新代码
  imageLoad() {
    let that = this;
    that.data.heziload++;
    console.log(that.data.heziload);
    if (that.data.heziload == 32) {
      console.log("加载完成");
      setTimeout(function() {
        // 可以加载完毕动画
        wx.hideLoading()
        that.data.loading = true

        that.setData({
          loading: that.data.loading
        })

        setTimeout(function() {
          that.playHezi1();
          that.playXXTitle();
        }, 3000)
        setTimeout(function() {
          that.setData({
            loadingNow: true
          })
        }, 12000)


        console.log("options", that.data.myoptions);
        if (that.data.myoptions.from != undefined) {
          if (that.data.myoptions.from == 0) {
            if (that.data.myoptions.res == 0) {
              that.lingQuChengong = true
              that.setData({
                lingQuChengong: that.lingQuChengong,
                openGift: app.globalData.openGift
              })
            } else if (that.data.myoptions.res == 1) {
              wx.showModal({
                title: '提示',
                content: '领取失败,请稍后重试',
                success(res) {
                  if (res.confirm) {} else if (res.cancel) {}
                }
              })
            }
          } else if (that.data.myoptions.from == 1) {
            // 红包
            if (that.data.myoptions.res == 0) {
              wx.showModal({
                title: '提示',
                content: '红包领取成功，请在服务通知内查收',
                success(res) {
                  that.data.showStartDiaLog = true
                  let toPercent = that.toPercent(that.data.myXNum / 7)
                  console.log(toPercent)
                  that.playXX()
                  that.setData({
                    myXNum: that.data.myXNum,
                    showStartDiaLog: that.data.showStartDiaLog,
                    lingQuChengong: false,
                    showHongBao: false
                  });
                  setTimeout(function() {
                    that.setData({
                      toPercent: toPercent
                    });
                  }, 1500);
                }
              })
              app.smwt.track('event', 'button', '红包记录', '红包页面', '')
            } else if (that.data.myoptions.res == 1) {
              wx.showModal({
                title: '提示',
                content: '领取失败,请稍后重试',
                success(res) {
                  if (res.confirm) {} else if (res.cancel) {}
                }
              })
            }
          } else if (that.data.myoptions.from == 3) {
            // 扫描
            that.openScan();
          } else if (that.data.myoptions.from == 2) {
            // 购物卡
            that.data.gwktype = that.data.myoptions.gwktype;
            that.data.gwkCode = that.data.myoptions.gwkCode;
            that.data.gwkPwd = that.data.myoptions.gwkPwd;
            that.data.gwkUrl = that.data.myoptions.gwkUrl;

            that.setData({
              showGwk: true,
              gwktype: that.data.gwktype,
              gwkCode: that.data.gwkCode,
              gwkPwd: that.data.gwkPwd,
              gwkUrl: that.data.gwkUrl
            })
          } else if (that.data.myoptions.from == 4) {
            that.setData({
              showMD: true
            })
          }
        }
      }, 3000)
    }
  },

  opengwk() {
    app.smwt.track('event', 'button', '点击绑卡', '随机中购物卡页面', '')
    app.globalData.h5url = this.data.gwkUrl
    wx.navigateTo({
      url: '../h5/h5',
    })
    app.globalData.inApp = false

  },
  copycode() {

    wx.setClipboardData({
      data: this.data.gwkCode,
      success(res) {
        wx.getClipboardData({
          success(res) {

          }
        })
      }
    })
  },
  test() {
    wx.navigateTo({
      url: '../start/start?mytype=4'
    })
    app.globalData.inApp = false
  },
  goStart() {

    app.smwt.track('event', 'button', '查看我的星星', '星星展示页面', '')
    this.stopXX()
    wx.navigateTo({
      url: '../start/start?xxNum=' + this.data.myXNum,
    })
    app.globalData.inApp = false
  },
  lookshop() {
    app.smwt.track('event', 'button', '查看附近门店', '查看适用门店页面（背景抢先领券）', '')
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
        // that.data.lat = 40.1131
        // that.data.lng = 116.3775
        if (res.data.data == 0) {
          wx.showModal({
            title: '提示',
            content: '附近没有门店',
            success(res) {
              if (res.confirm) {} else if (res.cancel) {}
            }
          })
        } else {
          that.setData({
            address: res.data.data.address
          })
        }
      }
    })
  },
  back(e) {
    let type = e.currentTarget.dataset.type
    if (type == 1) {
      app.smwt.track('event', 'button', '返回小程序', '您可到永辉生活参与集星页面（背景抢先领券）', '')
    } else if (type == 0) {
      app.smwt.track('event', 'button', '返回小程序', '查看适用门店页面（背景抢先领券）', '')
    } else {
      app.smwt.track('event', 'button', '返回小程序', '您可到永辉生活参与集星页面（背景抢先领券）', '')
    }

    this.setData({
      showMD: false,
      showinfo: false
    })
  },
  gorules(e) {

    app.smwt.track('event', 'button', '查看活动规则', '抢先领券页面', '')
    wx.navigateTo({
      url: '../rules/rules',
    })
    app.globalData.inApp = false
  },
  isDraw() {
    let that = this;
    this.stopXX()
    app.smwt.track('event', 'button', '点击开奖', '集到第七颗星弹窗页面', '')
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
            wx.showModal({
              title: '提示',
              content: '您已集齐七星并开奖，快前往我的礼品，查看所有奖励吧！',
              success(res) {
                if (res.confirm) {} else if (res.cancel) {}
              }
            })
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
        if (res.data.metaInfo.code == 0) {
          if (res.data.data.id == 4) {
            wx.navigateTo({
              url: '../opengift/opengift?mytype=' + res.data.data.id
            })
            app.globalData.inApp = false
          } else if (res.data.data.id == 1 || res.data.data.id == 2 || res.data.data.id == 3) {
            wx.navigateTo({
              url: '../opengift/opengift?mytype=' + res.data.data.id + '&gwkCode=' + res.data.data.gwkCode + '&gwkPwd=' + res.data.data.gwkPwd + '&gwkUrl=' + res.data.data.gwkUrl
            })
            app.globalData.inApp = false
          }

        } else {
          wx.showModal({
            title: '提示',
            content: '抽奖失败，稍后再试',
            success(res) {
              if (res.confirm) {} else if (res.cancel) {}
            }
          })
        }
      }
    })
  },
  openScan(e) {
    console.log(e)
    let that = this;
    let type = 0
    if (e != undefined) {
      type = e.currentTarget.dataset.type
    } else {
      type = -1
    }
    if (type == 0) {
      app.smwt.track('event', 'button', '开始扫星', '领取成功页面（背景立即参与）', '')
    } else if (type == 2) {
      app.smwt.track('event', 'button', '继续集星', '星星展示页面', '')
    } else {
      app.smwt.track('event', 'button', '继续集星', '集星的页面', '')
    }
    that.stopXX();
    that.setData({
      showStartDiaLog: false
    })

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
        // miniapp_qrcode_281
        else if (res.rawData == "a0JVakRlc0ctdVRJfmV4LmN6NDFxeFEmL2UqeWtfZE8t") {
          that.data.resData.type = 0
          that.data.resData.local = "fj"
        }
        // miniapp_qrcode_282
        else if (res.rawData == "a0MteWkyU1ZwNHAwfmJ0Jjp5KEJwUzlYal9TYkYqM0FU") {
          that.data.resData.type = 1
          that.data.resData.local = "fj"
        }
        // miniapp_qrcode_283
        else if (res.rawData == "a2lJNUpqbHcwVnI4fjUzMnk4eFJoJEFsbCRwejhyPVQjOA==") {
          that.data.resData.type = 2
          that.data.resData.local = "fj"
        }
        // miniapp_qrcode_284
        else if (res.rawData == "a1JSZnNESDgzVjM0fjE1MUg6bTlqVGx3T3VNeilyRDNHbQ==") {
          that.data.resData.type = 3
          that.data.resData.local = "fj"
        }
        // miniapp_qrcode_285
        else if (res.rawData == "a3dmbWxQQXRzaEJNfnh6PUpZKk4/OFdwNEA1X1pxOixO") {
          that.data.resData.type = 4
          that.data.resData.local = "fj"
        }
        // miniapp_qrcode_286
        else if (res.rawData == "ay04a1lzMHdtaGlNfjE2PUFsRkBGNGp+QjpoUW5rUzkveg==") {
          that.data.resData.type = 5
          that.data.resData.local = "fj"
        }

        let clientSystem = 1;
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
                    } else if (that.data.resData.type == 0 || that.data.resData.type == 1 || that.data.resData.type == 2 || that.data.resData.type == 3) {
                      // that.saveMyStarsCount()
                      wx.showModal({
                        title: '提示',
                        content: '非门店码，不能集星',
                        success(res) {
                          if (res.confirm) {} else if (res.cancel) {}
                        }
                      })
                    } else {
                      wx.showModal({
                        title: '提示',
                        content: '非本次活动码，不能集星',
                        success(res) {
                          if (res.confirm) {} else if (res.cancel) {}
                        }
                      })
                    }
                  }
                }
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '非本次活动码，不能集星',
            success(res) {
              if (res.confirm) {} else if (res.cancel) {}
            }
          })
        }
      }
    })
  },
  showYhj() {
    console.log("展示优惠卷");

  },
  toPercent(point) {
    if (point == 0) {
      return 0;
    }
    var str = Number(point * 100).toFixed();
    str += "%";
    return str;
  },
  saveMyStarsCount() {
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
          } else if (that.data.resData.type == 5) {
            that.data.myXNum = res.data.data
            that.data.showStartDiaLog = true
            let toPercent = that.toPercent(that.data.myXNum / 7)
            console.log(toPercent)
            that.playXX()
            that.setData({
              myXNum: that.data.myXNum,
              showStartDiaLog: that.data.showStartDiaLog,
              lingQuChengong: false
            });

            setTimeout(function() {
              that.setData({
                toPercent: toPercent
              });
            }, 1500);

          }

          if (that.data.myXNum == 1) {
            // app.smwt.track('event', 'button', '有机星', '点亮星星数', '')
            app.smwt.track('event', {
              customActionId: 1,
              customActionLabel1: '有机星',
              customActionLabel2: '点亮星星数',
              customActionLabel3: '',
              customActionLabel4: '',
              customActionValue1: 1
            })
          } else if (that.data.myXNum == 2) {
            // app.smwt.track('event', 'button', '成长星', '点亮星星数', '')
            app.smwt.track('event', {
              customActionId: 2,
              customActionLabel1: '有机星',
              customActionLabel2: '点亮星星数',
              customActionLabel3: '',
              customActionLabel4: '',
              customActionValue1: 1
            })
          } else if (that.data.myXNum == 3) {
            // app.smwt.track('event', 'button', '科技星', '点亮星星数', '')
            app.smwt.track('event', {
              customActionId: 2,
              customActionLabel1: '科技星',
              customActionLabel2: '点亮星星数',
              customActionLabel3: '',
              customActionLabel4: '',
              customActionValue1: 1
            })
          } else if (that.data.myXNum == 4) {
            // app.smwt.track('event', 'button', '植选星', '点亮星星数', '')
            app.smwt.track('event', {
              customActionId: 4,
              customActionLabel1: '植选星',
              customActionLabel2: '点亮星星数',
              customActionLabel3: '',
              customActionLabel4: '',
              customActionValue1: 1
            })
          } else if (that.data.myXNum == 5) {
            // app.smwt.track('event', 'button', '活力星', '点亮星星数', '')
            app.smwt.track('event', {
              customActionId: 5,
              customActionLabel1: '活力星',
              customActionLabel2: '点亮星星数',
              customActionLabel3: '',
              customActionLabel4: '',
              customActionValue1: 1
            })
          } else if (that.data.myXNum == 6) {
            // app.smwt.track('event', 'button', '能量星', '点亮星星数', '')
            app.smwt.track('event', {
              customActionId: 6,
              customActionLabel1: '能量星',
              customActionLabel2: '点亮星星数',
              customActionLabel3: '',
              customActionLabel4: '',
              customActionValue1: 1
            })
          } else if (that.data.myXNum == 7) {
            // app.smwt.track('event', 'button', '伊利星', '点亮星星数', '')
            app.smwt.track('event', {
              customActionId: 7,
              customActionLabel1: '伊利星',
              customActionLabel2: '点亮星星数',
              customActionLabel3: '',
              customActionLabel4: '',
              customActionValue1: 1
            })
          }

        }
      }
    })
  },

  getHongBao() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log("getLocation", res);
        that.data.lat = res.latitude;
        that.data.lng = res.longitude
        // that.data.lat = 40.1131
        // that.data.lng = 116.3775
        console.log(that.data.lng)

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
            } else {
              wx.showModal({
                title: '提示',
                content: '三公里无门店，无法领取',
                success(res) {
                  if (res.confirm) {} else if (res.cancel) {}
                }
              })
            }
          }
        })
      }
    })
  },
  isGetHongbao() {
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
          // that.getHongBaoUrl()
          that.setData({
            showHongBao: true
          })
        } else if (res.data.data == -1) {
          wx.showModal({
            title: '提示',
            content: '三公里无门店，无法领取',
            success(res) {
              if (res.confirm) {} else if (res.cancel) {}
            }
          })
        } else if (res.data.data == 0) {
          let toPercent = that.toPercent(that.data.myXNum / 7)
          console.log(toPercent)
          that.playXX()
          that.setData({
            myXNum: that.data.myXNum,
            showStartDiaLog: true,
            lingQuChengong: false,
            showHongBao: false
          });

          setTimeout(function() {
            that.setData({
              toPercent: toPercent
            });
          }, 1500);
          // wx.showModal({
          //   title: '提示',
          //   content: '已领取',
          //   success(res) {
          //     if (res.confirm) {} else if (res.cancel) {}
          //   }
          // })
        }
      }
    })
  },
  getHongBaoUrl() {
    let that = this;
    app.smwt.track('event', 'button', '领取现金红包', '首颗星及现金红包页面', '')
    wx.request({
      method: "post",
      dataType: "json",
      url: Config.restUrl + 'GetHongBaoUrl.json',
      data: {
        token: wx.getStorageSync('token'),
        type: "1234"
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
        app.globalData.inApp = false
      }
    })
  },
  openShop(e) {
    let type = e.currentTarget.dataset.type
    if (type == 0) {
      app.smwt.track('event', 'button', '查看适用门店', '您可到永辉生活参与集星页面（背景抢先领券）', '')
    } else if (type == 1) {
      app.smwt.track('event', 'button', '查看适用门店', '你已领取过奖励（背景抢先领券）', '')
    } else {
      app.smwt.track('event', 'button', '查看适用门店', '你已领取过奖励（背景抢先领券）', '')
    }
    this.setData({
      lingQuChengong: false,
      showinfo: false,
      showMD: true
    })
  },
  getLocation() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log("getLocation", res);
        that.data.lat = res.latitude
        that.data.lng = res.longitude
        // that.data.lat = 40.1131
        // that.data.lng = 116.3775
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
        if (res.data.data != 0) {
          that.data.inShop = true
          app.globalData.inShop = true
        } else {
          that.data.inShop = false
          app.globalData.inShop = false
        }
        that.setData({
          inShop: that.data.inShop
        })
        that.checkisDraw()
      }
    })
  },
  playTestHezi1() {
    let that = this;
    // 首页标题
    if (that.data.hezi1_time == null) {
      that.data.hezi1_time = setInterval(function() {
        that.data.hezi1 = that.data.hezi1 % 32
        that.data.hezi1++
          that.setData({
            hezi1: that.data.hezi1
          })

        if (that.data.hezi1 == 31) {
          that.stopTestHezi1()
        }
      }, 50)
    }
  },
  stopTestHezi1() {
    let that = this;
    if (that.data.hezi1_time != null) {
      clearInterval(that.data.hezi1_time);
      that.data.hezi1 = 1
      that.data.hezi1_time = null
      console.log("第一次播放完")
      that.setData({
        hezi1: that.data.hezi1
      })
    }
  },

  playHezi1() {
    let that = this;
    that.setData({
      hideHeizhi: true
    })
    // 首页标题
    if (that.data.hezi1_time == null) {
      that.data.hezi1_time = setInterval(function() {
        that.data.hezi1 = that.data.hezi1 % 32
        that.data.hezi1++
          that.setData({
            hezi1: that.data.hezi1
          })

        if (that.data.hezi1 == 31) {
          that.stopHezi1()
          that.playHezi1_2();
        }
      }, 100)
    }
  },
  stopHezi1() {
    let that = this;
    if (that.data.hezi1_time != null) {
      clearInterval(that.data.hezi1_time);
      that.data.hezi1 = 1
      that.data.hezi1_time = null
    }
  },
  playHezi1_2() {
    let that = this;
    that.data.hezi1 = 26
    // 首页标题
    if (that.data.hezi2_time == null) {
      that.data.hezi1_time = setInterval(function() {
        that.data.hezi1++
          that.setData({
            hezi1: that.data.hezi1
          })
        if (that.data.hezi1 == 31) {
          that.data.hezi1 = 26
        }
      }, 150)
    }
  },
  playXX() {
    let that = this;
    // 首页标题
    if (that.data.xx_time == null) {
      that.data.xx_time = setInterval(function() {
        that.data.xx_i = that.data.xx_i % 37
        that.data.xx_i++
          that.setData({
            xx_i: that.data.xx_i
          })
      }, 80)
    }
  },

  stopXX() {
    let that = this;
    if (that.data.xx_time != null) {
      clearInterval(that.data.xx_time);
      that.data.xx_i = 1
      that.data.xx_time = null
    }
  },

  playXXTitle() {
    let that = this
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
    app.smwt.track('event', 'button', '查看我的好礼', '领取成功页面（背景抢先领券）', '')
    wx.navigateTo({
      url: '../gift/gift',
    })
    app.globalData.inApp = false
  },
  getPhoneNumber() {
    let that = this;
    app.smwt.track('event', 'button', '立即领取', '领取券页面（背景立即参与）', '')
    wx.request({
      method: "post",
      dataType: "json",
      url: Config.restUrl + 'updatePhone.json',
      data: {
        token: wx.getStorageSync('token'),
        phone: that.data.usermobile
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
        if (res.data.data == "") {
          that.lingQuChengong = true
          that.setData({
            lingQuChengong: that.lingQuChengong
          })
        } else {
          app.globalData.h5url = res.data.data
          wx.navigateTo({
            url: '../h5/h5',
          })
          app.globalData.inApp = false
        }

      }
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  login() {
    let that = this;
    this.selectComponent('#comp-auth').openHandle({
      success(res) {
        let {
          openid,
          unionid,
          userInfo
        } = res;
        console.log(res);
        // res的值的结果
        // res = {
        //   openid: "oBPDr4hliKqjeuZq8JJZcp07aco8", 
        //   unionid: "oPIsQ0-8I8SSmJe8kN58U835PJVY", 
        //   userInfo: '{"nickName":"小猪包","gender":1,"language":"zh_CN","c…wyyq8qWP6rRhrdNsX0yZBKyHxwVnYsSSRupxZEdsYZg/132"}',
        // };
        that.data.userRes = res;
        that.checkSession();

        app.smwt.setUser(res.userInfo)
        //在后续的请求中传⼊⽤户openid，将"openID"替换为⽤户实际的openid
        app.smwt.setOpenId(res.openid)
        //在后续的请求中传⼊⽤户unionid，将"unionID"替换为⽤户实际的unionid
        app.smwt.setUnionId(res.unionid)
      },
      fail() {
        // 授权失败回调函数
      }
    })
  },
  register() {
    let that = this;
    wx.setStorageSync('ant_register_channel', '88');
    // ant_register_channel为注册渠道值，number类型
    this.selectComponent('#comp-register').openHandle({
      success(res) {
        // 入会成功回调函数
        let {
          mobile
        } = res;
        console.log(res);
        that.data.usermobile = res.mobile
        that.getPhoneNumber()
        // res的值的结果
        // res = { mobile: "13125021467" };
        app.smwt.track('event', 'button', '允许', '授权手机号', '')
      },
      fail() {
        // 入会失败回调函数
        app.smwt.track('event', 'button', '取消', '授权手机号', '')
      }
    })
  },
  checkSession() {
    let that = this;

    app.smwt.track('event', 'button', '抢先领券', '抢先领券页面', '')
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
        // that.checkisDraw(res.data.metaInfo.code)
        // 未抽奖
        if (res.data.metaInfo.code == 0) {
          that.getLocation()
        } else {
          that.getUserInfo()
        }
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
            that.isGetCoupon()
          } else if (res.data.data == 1) {
            // 已抽奖
            wx.showModal({
              title: '提示',
              content: '您已集齐七星并开奖，快前往我的礼品，查看所有奖励吧！',
              success(res) {
                that.goGift()
              }
            })
          }
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
        // jsonBody: JSON.stringify({
        //   userInfo: {
        //     avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q19DlrwESf7L5ibPuflKlyDDXpTLFcYDOwT2Z0Z1bCUewyyq8qWP6rRhrdNsX0yZBKyHxwVnYsSSRupxZEdsYZg/132",
        //     city: "Wuhan",
        //     country: "China",
        //     gender: 1,
        //     language: "zh_CN",
        //     nickName: "小猪包",
        //     province: "Hubei"
        //   },
        //   unionid: "oPIsQ0-8I8SSmJe8kN58U835PJVY",
        //   // openid: "oBPDr4hliKqjeuZq8JJZcp07aco8_c4"
        //   openid: "oBPDr4hliKqjeuZq8JJZcp07aco8_c4" + Math.random() * 50
        // })

        jsonBody: JSON.stringify(that.data.userRes)
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
  colseshowinfo() {
    this.setData({
      showinfo: false
    })
  },

  colselingQuChengong() {
    this.stopYhj()
    this.setData({
      lingQuChengong: false
    })
  },

  colseshowLingQu() {
    this.stopYhj()
    this.setData({
      showLingQu: false
    })
  },
  colseshowHongBao() {
    app.smwt.track('event', 'button', '关闭', '红包页面', '')

    this.setData({
      showHongBao: false
    })
  },
  colseshowGwk() {
    this.setData({
      showGwk: false
    })
  },
  colseshowMD() {
    this.setData({
      showMD: false
    })
  },
  colseshowStartDiaLog() {
    this.setData({
      showStartDiaLog: false
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
  },
  onShow() {
    //动态设定⼩程序⻚⾯标题
    wx.setNavigationBarTitle({
      title: '来自星星的“礼”'
    })
    //设定后设置this.smwtTitle进⾏⻚⾯标题的监测配置
    this.smwtTitle = '来自星星的“礼”'
    // 音乐

    app.globalData.back = wx.getBackgroundAudioManager();
    app.globalData.back.src = "https://lingke-static-cdn-https.angwei.net/event/yili/saoxing/bg.mp3";
    app.globalData.back.title = "背景音乐";
    app.globalData.back.onPlay(() => {
      console.log("音乐播放开始");
    })
    app.globalData.back.onEnded(() => {
      console.log("音乐播放结束");
      app.globalData.back = wx.getBackgroundAudioManager();
      app.globalData.back.src = "https://lingke-static-cdn-https.angwei.net/event/yili/saoxing/bg.mp3";
      app.globalData.back.title = "背景音乐";
      app.globalData.back.play()
    })
    app.globalData.inApp = true
  },
  onHide() {
    //动态设定⼩程序⻚⾯标题
    wx.setNavigationBarTitle({
      title: '来自星星的“礼”'
    })
    //设定后设置this.smwtTitle进⾏⻚⾯标题的监测配置
    this.smwtTitle = '来自星星的“礼”'
    if (app.globalData.inApp) {
      console.log("暂停")
      app.globalData.inApp = false
      app.globalData.back.pause()
    }
  }
})
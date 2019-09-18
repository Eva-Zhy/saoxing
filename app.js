//app.js
const ImageSource = require('utils/ImageSource.js');
const ImageLoader = require('utils/ImgageLoader.js');

App({
  onLaunch: function () {
    var loader = new ImageLoader({
      base: ImageSource.BASE,
      source: [ImageSource.imageList, ImageSource.index],
      loading: res => {
        // 可以做进度条动画
        console.log("loading", res);
      },
      loaded: res => {
        // 可以加载完毕动画
        console.log("loading222", res);
      }
    });
    
  },
  globalData: {
    userInfo: null,
    h5url:""
  }
})
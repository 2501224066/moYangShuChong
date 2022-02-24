Component({
  data: {
    iphoneFooter: false,
    list: wx.getStorageSync('areaList')
  },
  pageLifetimes: {
    show() {
      this.init()
    }
  },
  methods: {
    // 数据初始化
    init() {
      this.setData({
        iphoneFooter: getApp().globalData.iphoneFooter,
      })
    },

    // 跳转
    to(e) {
      wx.$dump(e, true)
    }
  }
})

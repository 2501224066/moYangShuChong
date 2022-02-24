Component({
  data: {
    navHeight: 0,
    navTop: 0,
  },
  lifetimes: {
    attached() {
      this.init()
    }
  },
  methods: {
    // 数据初始化
    init() {
      this.setData({
        navHeight: getApp().globalData.navHeight,
        navTop: getApp().globalData.navTop,
      })
    },
  }

})

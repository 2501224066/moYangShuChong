Component({
  properties: {
    text: {
      type: String,
    },
    num: {
      type: String,
      value: ""
    },
    bg: {
      type: String,
      value: "rgba(250, 250, 250, 0)"
    },
    entity: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: '#000'
    },
  },
  data: {
    navHeight: 0,
    navTop: 0
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

    // 跳转
    to(e) {
      wx.$dump(e)
    },
  }

})

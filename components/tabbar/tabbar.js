Component({
  data: {
    iphoneFooter: false,
    tabbarIndex: 0,
    tabbar: {
      selectedColor: "#F3981C",
      color: "#999",
      list: [{
          "pagePath": "/pages/index/index",
          "text": "墨洋之声",
          "iconPath": "/image/index.png",
          "selectedIconPath": "/image/index_s.png"
        },
        {
          "pagePath": "/pages/index/index",
          "text": "伴读时光屋",
          "iconPath": "/image/read.png",
          "selectedIconPath": "/image/read_s.png"
        },
        {
          "pagePath": "/pages/my/my",
          "text": "我的",
          "iconPath": "/image/my.png",
          "selectedIconPath": "/image/my_s.png"
        }
      ]
    }
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
        tabbarIndex: wx.getStorageSync('tabbarIndex'),
        iphoneFooter: getApp().globalData.iphoneFooter,
      })
    },

    // 跳转
    to(e) {
      wx.setStorageSync('tabbarIndex', e.currentTarget.dataset.index)
      let page = getCurrentPages()
      if ("/" + page[page.length - 1].route === e.currentTarget.dataset.url) {
        this.setData({
          tabbarIndex: e.currentTarget.dataset.index,
        })
        return
      }
      wx.switchTab({
        url: e.currentTarget.dataset.url,
      })
    }
  }
})

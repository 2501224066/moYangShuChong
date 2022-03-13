import {
  home
} from '../../config/api'

Page({
  data: {
    url: '',
    index: '',
    bannerList: []
  },

  onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage']
    })
    this.setData({
      index: options.index
    })
    this.getData()
  },

  // 获取数据
  async getData() {
    let res = await home()
    this.setData({
      url: res.data.homePageImg[this.data.index].link,
    })
  },

  //分享
  onShareAppMessage() {
    return {
      title: this.data.detail.bookName,
      path: "/pages/bookDetail/bookDetail" + "?id=" + this.data.detail.id,
      imageUrl: this.data.detail.bookImg[0].url
    }
  }
})

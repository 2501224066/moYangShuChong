import {
  home
} from '../../config/api'

Page({
  data: {
    navHeight: 0,
    bannerList: [],
    iconList: [],
    bookList: []
  },

  onLoad() {
    this.init()
    this.getData()
  },

  // 初始化数据
  init() {
    this.setData({
      navHeight: getApp().globalData.navHeight
    })
  },

  // 获取数据
  async getData() {
    let res = await home()
    this.setData({
      bannerList: res.data.homePageImg,
      iconList: res.data.subjectList,
      bookList: res.data.pictureBookList
    })
  },

  // 页面上滑距离
  onPageScroll(ev) {
    this.setData({
      navScrollTop: ev.scrollTop
    })
  },

  // banner 跳转
  bannerGo(e) {
    this.to({
      currentTarget: {
        dataset: {
          url: e.currentTarget.dataset.type === 1 ?
            "/pages/web/web?url=" + e.currentTarget.dataset.link : e.currentTarget.dataset.link + "?id=" + e.currentTarget.dataset.id
        }
      }
    })
  },


  // 去详情
  goDetail(e) {
    if (e.currentTarget.dataset.item.isOther) {
      if (!wx.getStorageSync('loginStatus')) {
        wx.showToast({
          icon: "none",
          title: '未登录不可跳转',
        })
        return
      }
      wx.navigateToMiniProgram({
        appId: "wx910c6a11ddcc705f",
        path: e.currentTarget.dataset.item.link,
        fail() {
          wx.showToast({
            icon: "none",
            title: '跳转失败',
          })
        }
      })
    } else {
      this.to({
        currentTarget: {
          dataset: {
            url: "/pages/bookDetail/bookDetail?id=" + e.currentTarget.dataset.item.id
          }
        }
      })
    }
  },


  // 跳转
  to(e) {
    wx.$dump(e)
  },
})

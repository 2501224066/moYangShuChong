import {
  classifyDetail
} from "../../config/api"

Page({
  data: {
    filterShow: false,
    name: '',
    list: [],
    classify: []
  },

  onLoad(options) {
    this.getData(options.id)
  },

  // 切换分类
  checkout(e) {
    this.getData(e.currentTarget.dataset.id)
    this.setData({
      filterShow: false
    })
  },

  // 获取数据
  async getData(id) {
    let res = await classifyDetail({
      id: id
    })
    this.setData({
      list: res.data.pictureBookList,
      classify: res.data.subjectList,
      name: res.data.subjectName
    })
  },

  // 过滤展示
  setFilterShow() {
    this.setData({
      filterShow: !this.data.filterShow
    })
  },

  // 去详情
  goDetail(e) {
    if (e.currentTarget.dataset.item.isOther) {
      if (!wx.getStorageSync('loginStatus')) {
        wx.showToast({
          icon: "none",
          title: '未登录不可跳出',
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

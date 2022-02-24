import {
  hotSearchKeyword
} from "../../config/api"

Page({
  data: {
    keyword: "",
    hot: [],
    history: []
  },

  onLoad() {
    this.getHot()
  },

  onShow() {
    this.getHistory()
  },

  // 无关键字
  noKeywory() {
    wx.showToast({
      title: '未输入搜索关键字',
      icon: 'none'
    })
  },

  //搜索历史
  getHistory() {
    this.setData({
      history: wx.getStorageSync('searchHistory') || []
    })
  },

  // 热门搜索
  async getHot() {
    let res = await hotSearchKeyword()
    this.setData({
      hot: res.data
    })
  },

  // 修改状态
  setState(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },

  // 删除关键字
  delKeyword() {
    this.setData({
      keyword: "",
    })
  },

  // 删除历史
  delHistory(e) {
    let arr = wx.getStorageSync('searchHistory')
    arr.splice(e.currentTarget.dataset.index, 1)
    wx.setStorageSync('searchHistory', arr)
    this.setData({
      history: arr
    })
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },
})

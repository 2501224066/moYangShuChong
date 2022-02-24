import {
  search
} from "../../config/api"

Page({
  data: {
    keyword: "",
    list: [],
  },

  onLoad(options) {
    this.setData({
      keyword: options.keyword
    })
    this.setSeatchHistory()
    this.search()
  },

  // 搜索
  async search() {
    let res = await search({
      word: this.data.keyword
    })
    this.setData({
      list: res.data
    })
  },

  // 设置历史搜索
  setSeatchHistory() {
    let arr = wx.getStorageSync('searchHistory') || []
    if (arr.indexOf(this.data.keyword) > -1) {
      arr.splice(arr.indexOf(this.data.keyword), 1)
    }
    arr.push(this.data.keyword)
    wx.setStorageSync('searchHistory', arr)
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
      list: []
    })
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },
})

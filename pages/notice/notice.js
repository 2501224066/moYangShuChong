import {
  myNotice
} from "../../config/api"

Page({
  data: {
    list: []
  },

  onShow() {
    this.getData()
  },

  // 获取数据
  async getData() {
    let res = await myNotice()
    this.setData({
      list: res.data
    })
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },
})

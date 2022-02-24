import {
  setting
} from "../../config/api"


Page({
  data: {
    detail: {}
  },

  onLoad() {
    this.getData()
  },

  // 获取数据
  async getData() {
    let res = await setting()
    this.setData({
      detail: res.data
    })
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },

})

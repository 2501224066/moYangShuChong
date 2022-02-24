import {
  collectList
} from '../../config/api'


Page({
  data: {
    list: [],
    page: {
      num: 1,
      size: 10
    }
  },

  onLoad() {
    this.getData()
  },

  // 获取数据
  async getData(add = false) {
    let res = await collectList({
      pageNum: this.data.page.num,
      pageSize: this.data.page.size,
    })
    this.setData({
      list: add ? this.data.list.concat(res.data.list) : res.data.list
    })
  },

  onReachBottom() {
    this.data.page.num += 1
    this.setData({
      page: this.data.page
    })
    this.getData(true)
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },
})

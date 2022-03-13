import {
  moreActivity
} from "../../config/api"

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
    let res = await moreActivity({
      pageNum: this.data.page.num,
      pageSize: this.data.page.size
    })

    this.setData({
      list: add ? this.data.list.concat(res.data.moreActivityItemVo) : res.data.moreActivityItemVo
    })

  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },
})

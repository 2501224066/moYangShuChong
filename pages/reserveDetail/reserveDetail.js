import {
  reserveDetail,
  reserve,
  cancel
} from "../../config/api";

Page({
  data: {
    id: null,
    tab: {
      index: 0,
      list: ["活动目标", "伴读介绍", "预约规则"],
    },
    detail: {}
  },

  onLoad(options) {
    this.initData(options)
    this.getData()
  },

  // 初始化数据
  initData(options) {
    this.setData({
      id: options.id
    })
  },

  // 获取数据
  async getData() {
    let res = await reserveDetail({
      id: this.data.id
    })
    this.setData({
      detail: res.data
    })
  },

  // 切换tab
  checkoutTab(e) {
    this.data.tab.index = e.currentTarget.dataset.index
    this.setData({
      tab: this.data.tab
    })
  },

  // 预约
  async reserve(e) {
    if (!wx.$verifyLogin()) return
    await reserve({
      id: e.currentTarget.dataset.id,
    })
    wx.showToast({
      title: '操作成功',
      icon: 'none'
    })
    this.getData()
    this.msg()
  },

  // 订阅
  msg() {
    wx.requestSubscribeMessage({
      tmplIds: ['O5CrpSwaqgJyp2r1b2hoR-q4BQUzShuBCq3xg7fpWtI', 'dtfQ3lsZ_yyoKl6rkOHR9IiZugBtzAXxAP5WPjwsQng', 'gpaC9pYk0ur4U6EkH21FEp6B76KOSX7uL9ZTJBYVO3E'],
      success() {
        wx.showToast({
          title: '订阅成功',
          icon: 'none'
        })
      }
    })
  },

  // 取消
  async cancel(e) {
    if (!wx.$verifyLogin()) return
    await cancel({
      id: e.currentTarget.dataset.id,
    })
    wx.showToast({
      title: '操作成功',
      icon: 'none'
    })
    this.getData()
  },
})

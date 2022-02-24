import {
  myActivity,
  cancel
} from "../../config/api"

Page({
  data: {
    nowY: '',
    nowM: '',
    nowD: '',
    weekArr: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    has: [],
    weekDay: [],
    checkout: null,
    list: [],
    allNum: 0,
    joinNum: 0,
  },

  onReady() {
    this.initData()
    this.getData()
  },

  // 数据初始化
  initData() {
    this.countWeek()
    let date = new Date()
    let nowY = date.getFullYear()
    let nowM = date.getMonth() + 1
    this.setData({
      nowY: nowY,
      nowM: nowM,
      nowD: date.getDate(),
      checkout: date.getDay()
    })
  },

  // 获取数据
  async getData() {
    let day = this.data.weekDay[this.data.checkout]
    let res = await myActivity({
      date: day.Y + (day.M < 10 ? '-0' : '-') + day.M + (day.D < 10 ? '-0' : '-') + day.D
    })
    this.setData({
      list: res.data.list,
      allNum: res.data.frequency,
      joinNum: res.data.useTimes
    })
  },

  // 取消
  async cancel(e) {
    await cancel({
      id: e.currentTarget.dataset.id,
    })
    wx.showToast({
      title: '操作成功',
      icon: 'none'
    })
    this.getData()
  },

  // 计算本周日期
  countWeek() {
    let date = new Date()
    let nowWeek = date.getDay()
    let before = nowWeek
    let after = 6 - nowWeek
    let weekDay = []
    for (let i = before; i > 0; i--) {
      let time = date.getTime() - 24 * 60 * 60 * 1000 * i;
      let day = new Date(time);
      weekDay.push({
        W: this.data.weekArr[nowWeek - i],
        Y: day.getFullYear(),
        M: day.getMonth() + 1,
        D: day.getDate()
      })
    }
    weekDay.push({
      W: this.data.weekArr[nowWeek],
      Y: date.getFullYear(),
      M: date.getMonth() + 1,
      D: date.getDate()
    })
    for (let i = 1; i <= after; i++) {
      let time = date.getTime() + 24 * 60 * 60 * 1000 * i;
      let day1 = new Date(time);
      weekDay.push({
        W: this.data.weekArr[nowWeek + i],
        Y: day1.getFullYear(),
        M: day1.getMonth() + 1,
        D: day1.getDate()
      })
    }
    this.setData({
      weekDay: weekDay
    })
  },

  // 选中日期
  checkoutDate(e) {
    this.setData({
      checkout: e.currentTarget.dataset.index,
    })
    this.getData()
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },

})

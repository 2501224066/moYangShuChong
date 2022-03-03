import {
  reserveList,
  reserve,
  cancel,
  reserveHas
} from "../../config/api"

Page({
  data: {
    hiddenmodal:true,
    id:'',
    nowY: '',
    nowM: '',
    nowD: '',
    areaList: wx.getStorageSync('areaList'),
    areaIndex: 0,
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    has: [],
    weekDay: [],
    weekCheckout: null,
    day: {},
    list: []
  },

  onLoad(options) {
    this.initData(options)
  },

  onShow() {
    this.getReserveHas()
    this.getData()
  },

  // 数据初始化
  initData(options) {
    this.countWeek()
    this.data.areaList.forEach((item, index) => {
      if (item.name == options.area) {
        this.data.areaIndex = index
      }
    })
    let date = new Date()
    let nowY = date.getFullYear()
    let nowM = date.getMonth() + 1
    this.setData({
      nowY: nowY,
      nowM: nowM,
      nowD: date.getDate(),
      areaIndex: this.data.areaIndex,
      area: options.area,
      weekCheckout: date.getDay(),
      day: this.data.weekDay[date.getDay()]
    })
  },

  // 查询有预约日期
  async getReserveHas() {
    let ym = this.data.day.Y + '-' + this.addZero(this.data.day.M)
    let res = await reserveHas({
      campus: this.data.areaList[this.data.areaIndex].id,
      startTime: ym + '-01',
      endTime: ym + '-' + new Date(this.data.day.Y, this.data.day.M, 0).getDate()
    })
    this.setData({
      has: res.data
    })
  },

  // 获取数据
  async getData() {
    let res = await reserveList({
      campus: this.data.areaList[this.data.areaIndex].id,
      date: this.data.day.Y + '-' + this.addZero(this.data.day.M) + '-' + this.addZero(this.data.day.D)
    })
    this.setData({
      list: res.data
    })
  },

  // 预约
 reserve(e) {
    if (!wx.$verifyLogin()) return
    // reserve({
    //   id: e.currentTarget.dataset.id,
    // })
    // wx.showToast({
    //   title: '操作成功',
    //   icon: 'none'
    // })
    // this.getData()
    // this.msg()
    this.setData({
      hiddenmodal: false,
      id:e.currentTarget.dataset.id,
   })
  },

  cancelM(e){
    this.setData({
       hiddenmodal: true,
    })
 },

 confirmM(e) {
   this.setData({
      hiddenmodal: true,
   })
    reserve({
      id: this.data.id,
    })
    wx.showToast({
      title: '操作成功',
      icon: 'none'
    })
    setTimeout(() => {
      this.getData()
    }, 1000);
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

  // 切换地区
  checkoutArea(e) {
    this.setData({
      areaIndex: e.detail.value
    })
    this.getData()
    this.getReserveHas()
  },

  // 计算本周日期
  countWeek(params = null) {
    let date = params ? new Date(params) : new Date()
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
      weekCheckout: e.currentTarget.dataset.index,
      day: this.data.weekDay[e.currentTarget.dataset.index]
    })
    this.getData()
  },

  //  日历选择日期
  calendarChange(e) {
    let day = e.detail
    this.countWeek(day.Y + '-' + this.addZero(day.M) + '-' + this.addZero(day.D))
    this.data.weekCheckout = this.data.weekDay.reduce((init, val, index) => {
      if (+val.Y == +day.Y && +val.M == +day.M && +val.D == +day.D) {
        init = index
      }
      return init
    }, null)
    this.setData({
      weekCheckout: this.data.weekCheckout,
      day: day
    })
    this.getData()
  },

  // 补0
  addZero(num) {
    if (num < 10) {
      return "0" + num
    }
    return num
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },

})

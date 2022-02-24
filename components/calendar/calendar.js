import {
  reserveHas
} from "../../config/api"

Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (val, oldVal) {
        if (val) {
          this.init()
        }
      }
    },
    day: {
      type: Object,
      value: {
        Y: '',
        M: '',
        D: ''
      }
    },
    area: {
      type: Object,
      value: {}
    }
  },
  data: {
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    nowY: '',
    nowM: '',
    nowD: '',
    nowWeek: '',
    showY: '',
    showM: '',
    num: '',
    before: 0, // 前补
    after: 0, // 后补
    has: [],
  },
  methods: {
    // 显示实则
    setShow() {
      this.setData({
        show: !this.data.show
      })
    },

    // 数据初始化
    init() {
      let date = new Date()
      let nowY = date.getFullYear()
      let nowM = date.getMonth() + 1
      this.setData({
        nowY: nowY,
        nowM: nowM,
        showY: nowY,
        showM: nowM,
        nowD: date.getDate(),
        nowWeek: this.data.weekArr[date.getDay()]
      })
      this.count(nowY, nowM)
      this.getReserveHas()
    },

    // 查询有预约日期
    async getReserveHas() {
      let ym = this.data.showY + '-' + this.addZero(this.data.showM)
      let res = await reserveHas({
        campus: this.data.area.id,
        startTime: ym + '-01',
        endTime: ym + '-' + new Date(this.data.showY, this.data.showM, 0).getDate()
      })
      this.setData({
        has: res.data
      })
    },

    // 选中日期
    checkout(e) {
      let day = {
        Y: this.data.showY,
        M: this.data.showM,
        D: e.currentTarget.dataset.d
      }
      this.triggerEvent("change", day)
      this.setData({
        day: day
      })
      this.setShow()
    },

    // 计算相关数据
    count(Y, M) {
      let date = new Date(Y + '-' + this.addZero(M) + '-' + '01')
      let week = date.getDay()
      let num = new Date(Y, M, 0).getDate()
      this.setData({
        before: week,
        num: num,
        after: 7 - ((num + week) % 7 || 7)
      })
    },

    // 上个月
    up() {
      let Y = this.data.showY
      let M = this.data.showM
      if (M == 1) {
        Y -= 1
        M = 12
      } else {
        M -= 1
      }
      this.setData({
        showY: Y,
        showM: M
      })
      this.count(Y, M)
      this.getReserveHas()
    },

    // 下个月
    down() {
      let Y = this.data.showY
      let M = this.data.showM
      if (M == 12) {
        Y += 1
        M = 1
      } else {
        M += 1
      }
      this.setData({
        showY: Y,
        showM: M
      })
      this.count(Y, M)
      this.getReserveHas()
    },

    // 补0
    addZero(num) {
      if (num < 10) {
        return "0" + num
      }
      return num
    }
  }
})

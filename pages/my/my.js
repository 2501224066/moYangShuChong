import {
  myInfo
} from "../../config/api"


Page({
  data: {
    detail: {},
    loginStatus: false,
    allNum: 0,
    joinNum: 0,
    endTime: '',
    icon: [{
      img: "/image/my-icon1.png",
      label: "我的活动",
      link: "/pages/activity/activity"
    }, {
      img: "/image/my-icon2.png",
      label: "我的收藏",
      link: "/pages/collect/collect"
    }, {
      img: "/image/my-icon3.png",
      label: "我的消息",
      link: "/pages/notice/notice"
    }, {
      img: "/image/my-icon4.png",
      label: "账号设置",
      link: "/pages/setting/setting"
    }]
  },

  onShow() {
    this.initData()
    if (this.data.loginStatus) this.getData()
  },

  // 获取数据
  async getData() {
    let res = await myInfo()
    this.setData({
      allNum: res.data.frequency,
      joinNum: res.data.useTimes,
      endTime: res.data.cardEndTime
    })
  },

  // 去登录
  toLogin() {
    if (this.data.loginStatus) {
      return
    }
    this.to({
      currentTarget: {
        dataset: {
          url: "/pages/login/login"
        }
      }
    })
  },

  // 初始化数据
  initData() {
    this.setData({
      loginStatus: wx.getStorageSync('loginStatus') || false,
      detail: wx.getStorageSync('userInfo') || {}
    })
  },

  // 退出登录
  async unLogin() {
    await new Promise((resolve) => {
      wx.showModal({
        title: '确定退出登录？',
        success(res) {
          if (res.confirm) {
            resolve()
          }
        }
      })
    })
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('loginStatus');
    wx.removeStorageSync('token')
    this.to({
      currentTarget: {
        dataset: {
          url: "/pages/index/index"
        }
      }
    })
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },

})

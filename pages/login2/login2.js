import {
  login
} from '../../config/api'

Page({
  data: {
    showPwd: false,
    account: null,
    password: null
  },

  // 同意协议
  agree() {
    this.setData({
      agree: !this.data.agree
    })
  },

  // 清除账号
  clearAccount() {
    this.setData({
      account: ""
    })
  },

  // 密码状态
  setShowPwd() {
    this.setData({
      showPwd: !this.data.showPwd
    })
  },

  // 校验
  verify() {
    try {
      if (!this.data.agree) throw '请先同意协议'
      if (!this.data.account) throw '请输入手机号码活借阅卡号'
      if (!this.data.password) throw '请输入密码'
    } catch (err) {
      wx.showToast({
        title: err,
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 登录
  async login() {
    if (!this.verify()) return
    let res = await login({
      username: this.data.account,
      password: this.data.password
    })
    wx.setStorageSync('loginStatus', true)
    wx.setStorageSync('token', res.data.token)
    wx.setStorageSync('userInfo', {
      nickName: res.data.nickname,
      avatarUrl: res.data.icon,
      phone: res.data.phone,
      cardId: res.data.cardId,
      loginType: res.data.loginType,
      authorize: res.data.authorize,
    })
    let that = this
    wx.showToast({
      icon: "success",
      title: '登录成功',
      success() {
        that.to({
          currentTarget: {
            dataset: {
              url: res.data.authorize ? "/pages/index/index" : "/pages/authInfo/authInfo"
            }
          }
        })
      }
    })
  },

  // 修改状态
  setState(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },
})

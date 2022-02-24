import {

} from '../../config/api'

Page({
  data: {
    showPwd: false,
    account: "",
    password: "",
    smsCode: ""
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

  // 登录
  login() {
    let that = this
    // 获取code
    wx.login({
      success(res) {
        that.setData({
          code: res.code
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

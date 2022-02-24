import {
  wxLogin
} from '../../config/api'

Page({
  data: {
    agree: false,
    code: null,
  },

  onLoad() {
    this.getCode()
  },

  // 校验
  verify() {
    try {
      if (!this.data.agree) throw '请先同意协议'
    } catch (err) {
      wx.showToast({
        title: err,
        icon: 'none'
      })
      return false
    }
    return true
  },

  // 获取code
  getCode() {
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

  // 同意协议
  agree() {
    this.setData({
      agree: !this.data.agree
    })
  },

  // 微信手机号登录
  getPhoneNumber(e) {
    // 拒绝授权
    if (e.detail.errMsg != 'getPhoneNumber:ok') {
      return false
    }

    let that = this
    wx.checkSession({
      success() {
        var obj = {
          code: that.data.code,
          iv: e.detail.iv,
          encryptedData: e.detail.encryptedData,
          share: null
        }
        wxLogin(obj).then(res => {
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
        })
      },
      fail() {
        that.login()
      }
    })
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },
})

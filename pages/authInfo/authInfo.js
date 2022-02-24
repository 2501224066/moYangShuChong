import {
  auth
} from '../../config/api'

Page({
  // 授权用户信息
  getUserProfile() {
    let that = this
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        let obj = {
          nickName: res.userInfo.nickName,
          icon: res.userInfo.avatarUrl
        }
        auth(obj).then(() => {
          wx.showToast({
            icon: "success",
            title: '授权成功',
            success() {
              let userInfo = wx.getStorageSync('userInfo')
              userInfo.nickName = res.userInfo.nickName
              userInfo.avatarUrl = res.userInfo.avatarUrl
              userInfo.authorize = 1
              wx.setStorageSync('userInfo', userInfo)
              that.to({
                currentTarget: {
                  dataset: {
                    url: "/pages/my/my"
                  }
                }
              })
            }
          })
        })
      }
    })
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },
})

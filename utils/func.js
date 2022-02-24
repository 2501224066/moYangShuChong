// 全局方法设置
export function setFun() {

  // 跳转
  wx.$dump = (e, remove = false) => {
    // 后退
    if (!e.currentTarget.dataset.url) {
      if (getCurrentPages().length < 2) {
        wx.switchTab({
          url: '/pages/index/index',
        })
        wx.setStorageSync('tabbarIndex', 0)
        return
      }
      wx.navigateBack()
      return
    }
    // 前进
    if (remove) { // 关闭页面跳转
      wx.redirectTo({
        url: e.currentTarget.dataset.url,
      }).catch(() => {
        wx.switchTab({
          url: e.currentTarget.dataset.url,
        })
      })
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      }).catch(() => {
        wx.switchTab({
          url: e.currentTarget.dataset.url,
        })
      })
    }
    if (e.currentTarget.dataset.url == '/pages/index/index') {
      wx.setStorageSync('tabbarIndex', 0)
    }
  }

  // 登录校验
  wx.$verifyLogin = () => {
    if (!wx.getStorageSync('loginStatus')) {
      wx.showToast({
        icon: 'loading',
        title: '请先登录',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 1000)
      return false
    }
    return true
  }

  // 预览
  wx.$showMedia = (url) => {
    wx.previewMedia({
      sources: [{
        url: url,
        type: ['png', 'jpg', 'jpeg', 'gif', 'webp'].indexOf(url.substring(url.lastIndexOf(".") + 1)) > -1 ? 'image' : 'video'
      }],
    })
  }
}

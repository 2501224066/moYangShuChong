import {
  bookDetail,
  collect,
  unCollect
} from "../../config/api"

Page({
  data: {
    tab: {
      index: 0,
      list: ["绘本音频", "绘本介绍", "绘本导读"],
    },
    detail: {},
    playerShow: false,
    small: false,
    nowPlayTitle: null,
    videoContext: null,
    kefushow:false,
  },

  async onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    wx.setStorageSync('audioList', [])
    this.getData(options.id)
    this.setVideo()
  },

  // 视频设置
  setVideo() {
    this.setData({
      videoContext: wx.createVideoContext('myVideo', this)
    })
  },


  canle(){
    this.setData({
      kefushow:false,
    })
  },
  // 视频播放监听
  videoTimeupdate(e) {
    if (wx.getStorageSync('loginStatus')) {
        if (wx.getStorageSync('userType') == 0) {
          if (this.audioCtx.currentTime >= 90) {
            this.audioCtx.seek(0)
            this.audioCtx.pause()
            this.setData({
                kefushow:true,
              })
          return
        }
      }else{
        return
      }
    }
    if (e.detail.currentTime > 90) {
      this.data.videoContext.seek(0)
      this.data.videoContext.stop()
      let that = this
      wx.showModal({
        title: '请登录后查看后续内容',
        success(res) {
          if (res.confirm) {
            that.to({
              currentTarget: {
                dataset: {
                  url: "/pages/login/login"
                }
              }
            })
          }
        }
      })
    }
  },

  // 跳转
  to(e) {
    wx.$dump(e)
  },

  // 收藏
  async collect() {
    if (!wx.$verifyLogin()) return
    await collect({
      id: this.data.detail.id
    })
    this.data.detail.isColl = 1
    this.setData({
      detail: this.data.detail
    })
    wx.showToast({
      title: '操作成功',
      icon: 'none'
    })
  },

  // 取消收藏
  async unCollect() {
    if (!wx.$verifyLogin()) return
    await unCollect({
      id: this.data.detail.id
    })
    this.data.detail.isColl = 0
    this.setData({
      detail: this.data.detail
    })
    wx.showToast({
      title: '操作成功',
      icon: 'none'
    })
  },

  //获取数据
  async getData(id) {
    let res = await bookDetail({
      id: id
    })

    res.data.bookAudio.map((item) => {
      item.title = item.name
      item.audio = item.url
      item.bookId = id
      item.collType = item.collType
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

  // 添加
  add(e) {
    let arr = []
    if (typeof e.currentTarget.dataset.index === 'number') {
      arr.push(this.data.detail.bookAudio[e.currentTarget.dataset.index]) // 单条
    } else {
      arr = this.data.detail.bookAudio // 全部
    }
    wx.setStorageSync('index', 0)
    let audioList = arr.concat(wx.getStorageSync('audioList') ? wx.getStorageSync('audioList') : [])
    // 去重
    let obj = {};
    audioList = audioList.reduce((init, val) => {
      obj[val.audio] ? "" : obj[val.audio] = true && init.push(val);
      return init;
    }, [])
    wx.setStorageSync('audioList', audioList)
    this.setData({
      playerShow: true,
      small: false
    })
  },

  // 当前播放
  nowPlay(obj) {
    wx.setStorageSync('audioAfterPlay', this.data.nowPlayTitle)
    this.setData({
      nowPlayTitle: obj.detail.title
    })
  },

  //分享
  onShareAppMessage() {
    return {
      title: this.data.detail.bookName,
      path: "/pages/bookDetail/bookDetail" + "?id=" + this.data.detail.id,
      imageUrl: this.data.detail.bookImg[0].url
    }
  },

  onShareTimeline: function () {
        return {
          title: this.data.detail.bookName,
          query: {
               path: "/pages/bookDetail/bookDetail" + "?id=" + this.data.detail.id,
          },
          imageUrl: this.data.detail.bookImg[0].url
      }
   },

})

import {
  collectList,
  collectAudioList
} from '../../config/api'


Page({
  data: {
    list: [],
    playerShow: false,
    small: false,
    nowPlayTitle: null,
    audio: []
  },

  onShow() {
    this.getAudio()
  },

  myevent(e) {
    this.getAudio()
  },

  // 添加
  add(e) {
    wx.setStorageSync('index', e.currentTarget.dataset.index)
    this.setData({
      playerShow: true,
      small: false
    })
  },

  // 获取音乐
  async getAudio() {
    let res = await collectAudioList({
      pageNum:1,
      pageSize:999
    })
    this.setData({
      audio: res.data
    })
    wx.setStorageSync('audioList', res.data.reduce((init, val) => {
      init.push({
        bookId :val.bookId,
        collType : val.audio.collType,
        audio: val.audio.url,
        title: val.audio.name
      })
      return init
    }, []))
  },

  // 播放音频
  audioPlay() {
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

  // 跳转
  to(e) {

    wx.$dump(e)
  },
})

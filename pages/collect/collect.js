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
    this.getData()
    this.getAudio()
  },

  // 获取数据
  async getData(add = false) {
    let res = await collectList({})
    this.setData({
      list: res.data.list
    })
  },

  // 获取音乐
  async getAudio() {
    let res = await collectAudioList()
    this.setData({
      audio: res.data
    })
    wx.setStorageSync('audioList', res.data.reduce((init, val) => {
      init.push({
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

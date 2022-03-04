Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (val, oldVal) {
        if (val) {
          this.setData({
            playStatus: true
          })
          this.initData()
        }
      }
    },
    small: {
      type: Boolean,
      value: false,
      observer: function (val, oldVal) {
        if (!val) {
          if (this.audioCtx) this.audioCtx.destroy()
          this.initData()
        }
      }
    }
  },
  data: {
    deg: 0,
    timing: null,
    navHeight: 0,
    navTop: 0,
    list: [], // 音频列表
    index: 0, // 当前播放
    playType: 2, // 1.单曲, 2.循环, 3.随机
    now: 0, // 当前进度
    long: 0, // 总进度
    playStatus: false, // 是否播放
    smallDelShow: false, // 微小模式删除按钮显示
    listShow: false, // 音频列表显示
    touchAfterNow: 0, // 拖动前的now
    touchAfterX: 0, // 拖动前的位置
    collect: false,
  },
  lifetimes: {
    detached() {
      if (this.audioCtx) this.audioCtx.destroy()
      this.removeTiming()
    }
  },
  methods: {
    // 初始化数据
    initData() {
      this.setData({
        navHeight: getApp().globalData.navHeight,
        navTop: getApp().globalData.navTop,
      })
      if (!this.data.playStatus) {
        return
      }
      this.firstPlay()
    },

    // 播放器返回
    playerBack() {
      if (this.data.playStatus) {
        this.setData({
          small: true
        })
      } else {
        this.remove()
      }
    },

    // 开始定时器
    setTiming() {
      this.setData({
        timing: setInterval(() => {
          this.setData({
            deg: this.data.deg + 1
          })
        }, 100)
      })
    },

    // 清除定时器
    removeTiming() {
      clearInterval(this.data.timing)
    },

    // 跳转
    to(e) {
      wx.$dump(e)
    },

    // 初始播放
    firstPlay() {
      // 判断是否从头播
      let newList = wx.getStorageSync('audioList') ? wx.getStorageSync('audioList') : []
      let reset = false;
      if (this.data.list[this.data.index] && this.data.list[this.data.index].audio != newList[this.data.index].audio) {
        reset = true
      }

      this.setData({
        list: newList
      })
      this.audioCtx = wx.createInnerAudioContext()
      this.audioCtx.src = this.data.list[this.data.index].audio
      this.audioCtx.play()
      this.outData()
      this.audioCtx.seek(this.data.now)
      // 开启监听
      this.audioCtx.onCanplay(() => {
        console.log(this.audioCtx.duration)
      })
      // 监听播放
      this.audioCtx.onPlay((e) => {
        this.setTiming()
      })
      // 监听暂停
      this.audioCtx.onPause((e) => {
        this.removeTiming()
      })
      // 监听播放结束
      this.audioCtx.onEnded(() => {
        console.log('[audio] play end')

        this.playeByType()
      })
      this.audioCtx.onTimeUpdate(() => {
        this.unLoginStint()
        this.setData({
          now: this.audioCtx.currentTime,
          long: this.audioCtx.duration
        })
      })
      if (reset) this.audioCtx.seek(0)
    },

    // 按模式继续播放
    playeByType() {
      if (this.data.playType === 1) {
        this.audioCtx.play()
        return
      }
      if (this.data.playType === 2) {
        this.after()
        return
      }
      if (this.data.playType === 3) {
        if (this.data.list.length == 1) {
          this.audioCtx.play()
          return
        }
        this.random()
      }
    },

    // 未登录限制
    unLoginStint() {
      if (wx.getStorageSync('loginStatus')) {
        return
      }
      if (this.audioCtx.currentTime >= 90) {
        this.audioCtx.seek(0)
        this.audioCtx.pause()
        this.setData({
          playStatus: false
        })
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

    // 上一首
    before() {
      this.audioCtx.pause()
      this.setData({
        index: this.data.index === 0 ? this.data.list.length - 1 : this.data.index - 1
      })
      this.audioCtx.src = this.data.list[this.data.index].audio
      this.audioCtx.play()
      this.outData()
    },

    // 下一首
    after() {
      this.audioCtx.pause()
      this.setData({
        index: this.data.index === this.data.list.length - 1 ? 0 : this.data.index + 1
      })
      this.audioCtx.src = this.data.list[this.data.index].audio
      this.audioCtx.play()
      this.outData()
    },

    // 随机一首
    random() {
      this.audioCtx.pause()
      let arr = Array.apply(null, {
        length: this.data.list.length - 1
      }).map((v, i) => i)
      arr.splice(this.data.index, 1)
      let index = Math.round(Math.random() * arr.length)
      this.setData({
        index: index
      })
      this.audioCtx.src = this.data.list[this.data.index].audio
      this.audioCtx.play()
      this.outData()
    },

    // 切换音频
    checkout(e) {
      this.audioCtx.pause()
      this.setData({
        index: e.currentTarget.dataset.index,
      })
      this.audioCtx.src = this.data.list[this.data.index].audio
      this.audioCtx.play()
      this.outData()
    },

    // 播放暂停
    audioPlay() {
      if (this.data.playStatus) {
        this.audioCtx.pause()
      } else {
        this.audioCtx.play()
      }
      this.setData({
        playStatus: !this.data.playStatus
      })
    },

    // 切换播放模式
    setPlayType() {
      this.setData({
        playType: this.data.playType === 1 ? 2 : (this.data.playType == 2 ? 3 : 1)
      })
    },

    // small状态下打开删除
    setSmallDelShow() {
      this.setData({
        smallDelShow: !this.data.smallDelShow
      })
    },

    // 销毁当前实例
    remove() {
      this.audioCtx.destroy()
      this.setData({
        show: false,
        list: [],
        playStatus: false
      })
      this.triggerEvent('nowPlay', {
        title: null,
        audio: null
      })
    },

    // 设置音频列表显示
    setListShow() {
      this.setData({
        listShow: !this.data.listShow
      })
    },

    // 切换向外推出信息
    outData() {
      this.triggerEvent('nowPlay', this.data.list[this.data.index])
    },

    // 拖动开始
    touchstart(e) {
      this.audioCtx.pause()
      this.setData({
        touchAfterNow: this.data.now,
        touchAfterX: e.changedTouches[0].pageX
      })
    },

    // 拖动中
    touchmove(e) {
      let now = 0
      if (this.data.touchAfterX < e.changedTouches[0].pageX) {
        now = +((e.changedTouches[0].pageX / 750) * this.data.long).toFixed(0) + this.data.touchAfterNow
      } else {
        this.data.touchAfterNow - (+((e.changedTouches[0].pageX / 750) * this.data.long).toFixed(0))
      }
      if (now >= this.data.long) {
        now = this.data.long - 10
      }
      if (now <= 0) {
        now = 1
      }
      this.setData({
        now: now
      })
    },

    // 拖动结束
    touchend() {
      this.setData({
        touchAfterNow: 0,
        touchAfterX: 0
      })
      this.audioCtx.seek(this.data.now)
      this.audioCtx.play()
    },

    // 设置收藏
    collect() {
      this.setData({
        collect: !this.data.collect
      })
    }

  }
})

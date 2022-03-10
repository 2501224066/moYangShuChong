import {
  reserveDetail,
  reserve,
  cancel
} from "../../config/api";

Page({
  data: {
    id: null,
    itemid: null,
    hiddenmodal: true,
    tab: {
      index: 0,
      list: ["活动目标", "伴读介绍", "预约规则"],
    },
    detail: {}
  },

  onLoad(options) {
    this.initData(options)
    this.getData()
  },

  // 初始化数据
  initData(options) {
    this.setData({
      id: options.id
    })
  },

  // 获取数据
  async getData() {
    let res = await reserveDetail({
      id: this.data.id
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

  // 预约
  async reserve(e) {
    if (!wx.$verifyLogin()) return
    //   await reserve({
    //     id: e.currentTarget.dataset.id,
    //   })
    //   wx.showToast({
    //     title: '操作成功',
    //     icon: 'none'
    //   })
    //   this.getData()
    //   this.msg()
    // },


    this.setData({
      hiddenmodal: false,
      itemid: e.currentTarget.dataset.id,
    })
  },

  cancelM(e) {
    this.setData({
      hiddenmodal: true,
    })
  },

  async confirmM(e) {
    this.setData({
      hiddenmodal: true,
    })
    await reserve({
      id: this.data.itemid,
    })
    wx.showToast({
      title: '操作成功',
      icon: 'none'
    })

    this.getData()

    this.msg()
  },

  // 订阅
  msg() {
    wx.requestSubscribeMessage({
      tmplIds: ['O5CrpSwaqgJyp2r1b2hoR-q4BQUzShuBCq3xg7fpWtI', 'dtfQ3lsZ_yyoKl6rkOHR9IiZugBtzAXxAP5WPjwsQng', 'gpaC9pYk0ur4U6EkH21FEjO99rbNA3hcVAfZaTDL5Og'],
      success() {
        wx.showToast({
          title: '操作完成',
          icon: 'none'
        })
      }
    })
  },

  // 取消
  async cancel(e) {
    if (!wx.$verifyLogin()) return
    let that = this
      wx.showModal({
        title: '确定取消活动？',
        content: '如果距离开课时间不满6小时，将被扣除伴读时光卡次数哦~',
        cancelText: '取消',
        confirmText: '确认',
        success(res) {
          if (res.confirm) {
            //  cancel({
            //   id: e.currentTarget.dataset.id,
            // })
            // that.getData()

            // wx.showToast({
            //   title: '操作成功',
            //   icon: 'none'
            // })
            let obj = {
              id: e.currentTarget.dataset.id
            }
            cancel(obj).then(res => {
              that.getData();
               wx.showToast({
                title: '操作成功',
                icon: 'none'
              })
            })
          }
        }
    })



    // await cancel({
    //   id: e.currentTarget.dataset.id,
    // })
    // wx.showToast({
    //   title: '操作成功',
    //   icon: 'none'
    // })
    // this.getData()
  },
})

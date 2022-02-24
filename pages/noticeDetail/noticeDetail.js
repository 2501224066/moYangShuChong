import {
  myNotice,
  noticeRead
} from "../../config/api"

Page({
  data: {
    id: null,
    title: [
      '活动消息',
      '课程消息',
      '服务消息'
    ],
    content: '',
    time: ''
  },

  onLoad(options) {
    this.setData({
      id: options.id,
      type: options.type,
      content: JSON.parse(options.content),
      time: options.time,
    })
    this.read()
  },

  // 已读
  read() {
    noticeRead({
      id: this.data.id
    })
  }
})

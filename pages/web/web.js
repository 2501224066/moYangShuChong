import {
  home
} from '../../config/api'

Page({
  data: {
    url: '',
    index:'',
    bannerList:[]
  },

  onLoad(options) {
    this.setData({
      index: options.index
    })
    this.getData()
  },

   // 获取数据
   async getData() {
    let res = await home()
    this.setData({
      url: res.data.homePageImg[this.data.index].link,
    })
  },
})

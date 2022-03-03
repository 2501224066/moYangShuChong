var common = require('./request')

// 首页
export function home(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/voice/homePage' + repair,
    data: data
  })
}

// 绘本详情
export function bookDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/voice/bookDetails' + repair,
    data: data
  })
}

// 热门搜索词条
export function hotSearchKeyword(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/voice/popularSearch' + repair,
    data: data
  })
}

// 搜索
export function search(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/voice/search' + repair,
    data: data
  })
}

// 主题详情
export function classifyDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/voice/subjectDetails' + repair,
    data: data
  })
}

// 微信登录
export function wxLogin(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/miniAppLogin' + repair,
    data: data
  })
}

// 账密登录
export function login(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/login' + repair,
    data: data
  })
}

// 添加收藏
export function collect(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/voice/addCollection' + repair,
    data: data
  })
}

// 取消收藏
export function unCollect(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/voice/cancelCollection' + repair,
    data: data
  })
}

// 我的收藏
export function collectList(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/collectionList' + repair,
    data: data
  })
}

// 更多活动
export function moreActivity(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/moreActivity' + repair,
    data: data
  })
}

// 我的活动
export function myActivity(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/myActivity' + repair,
    data: data
  })
}

// 我的信息
export function myInfo(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/myInformation' + repair,
    data: data
  })
}

// 账号设置
export function setting(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/accountSettings' + repair,
    data: data
  })
}

// 预约列表
export function reserveList(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/readTime/appointmentList' + repair,
    data: data
  })
}

// 预约
export function reserve(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/readTime/appointment' + repair,
    data: data
  })
}

// 取消
export function cancel(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/readTime/cancel' + repair,
    data: data
  })
}

// 预约详情
export function reserveDetail(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/readTime/getById' + repair,
    data: data
  })
}

// 我的消息
export function myNotice(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/messageList' + repair,
    data: data
  })
}

// 授权
export function auth(data, repair = '') {
  return common.go({
    method: 'post',
    url: '/user/authorization' + repair,
    data: data
  })
}

// 消息已读
export function noticeRead(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/readMessage' + repair,
    data: data
  })
}

// 查询有预约的时间
export function reserveHas(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/queryAppointment' + repair,
    data: data
  })
}

// 收藏包含的音乐
export function collectAudioList(data, repair = '') {
  return common.go({
    method: 'get',
    url: '/user/audioList' + repair,
    data: data
  })
}

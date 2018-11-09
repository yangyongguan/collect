import {
  ajax
} from 'src/utils/ajax'

let token = ''
/* 直播互动 */
const LiveManage = {
  /* 获取第三方推流地址 */
  getPushUrl (activityId) {
    return ajax({
      method: 'post',
      url: '/initiator/live/get-third-pub-info',
      params: {
        activityId: activityId
      },
      headers: {
        Authorization: token
      }
    })
  },
  /* 直播设置 */
  setLiveSetting (params) {
    return ajax({
      method: 'post',
      url: '/initiator/live/set',
      params: params,
      headers: {
        Authorization: token
      }
    })
  },
  /* 增加在线人数 */
  addLivePersons (params) {
    return ajax({
      method: 'post',
      url: '/initiator/live/increment-init-user-num',
      params: params,
      headers: {
        Authorization: token
      }
    })
  },
  /* 获取发起端token，每个活动的token不同 */
  getLiveTtoken (activityId) {
    return new Promise((resolve, reject) => {
      ajax({
        method: 'get',
        url: '/initiator/live/get-token',
        params: {
          activityId: activityId
        },
        headers: {
          noAlert: true
        }
      }).then(res => {
        token = res.data
        resolve(res)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  /* paas token获取接口 */
  getPaasParam (activityId) {
    return ajax({
      method: 'get',
      url: '/initiator/live/get-sdk-token',
      params: {
        activityId: activityId
      },
      headers: {
        Authorization: token
      }
    })
  },
  /* 获取参会人员信息 */
  getJoinInfo () {
    return ajax({
      method: 'get',
      url: '/initiator/user/get-user-info',
      headers: {
        Authorization: token
      }
    })
  },
  /* 获取设置信息 */
  querySettingInfo (activityId) {
    return ajax({
      method: 'get',
      url: '/initiator/live/get-setting',
      params: {
        activityId: activityId
      },
      headers: {
        Authorization: token
      }
    })
  },
  /* 获取参会信息 */
  async queryRegActivity (data) {
    const promsObj = await new Promise((resolve, reject) => {
      ajax({
        method: 'get',
        url: '/frontend/user/reg-activity',
        params: data,
        headers: {
          noAlert: true
        }
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
    return promsObj
  },
  /* 根据参会信息获取paas参数 获取观看端token */
  queryPaasParams (activityId, activityUserId) {
    return ajax({
      method: 'get',
      url: '/frontend/live/sdk-token',
      params: {
        activityId: activityId,
        activityUserId: activityUserId
      }
    })
  },
  /* 开始直播 */
  startLive (activityId) {
    return ajax({
      method: 'get',
      url: '/initiator/live/start-live',
      params: {
        activityId: activityId
      },
      headers: {
        Authorization: token
      }
    })
  },
  /* 结束直播 */
  stopLive (activityId) {
    return ajax({
      method: 'get',
      url: '/initiator/live/stop-live',
      params: {
        activityId: activityId
      },
      headers: {
        Authorization: token
      }
    })
  },
  /* 查询活动信息 */
  queryActivityInfo (activityId) {
    return ajax({
      method: 'get',
      url: '/initiator/live/info',
      params: {
        activityId: activityId
      },
      headers: {
        Authorization: token
      }
    })
  },
  /* 观看端--活动信息获取 */
  queryWatchActivityInfo (activityId) {
    return ajax({
      method: 'get',
      url: '/frontend/live/info',
      params: {
        activityId: activityId
      }
    })
  },
  // 获取直播页面数据信息
  getData (activityId) {
    return ajax({
      method: 'get',
      url: '/frontend/live/base-data',
      params: {
        activityId: activityId
      }
    })
  },
  /* 获取活动官网pass参数 */
  queryPassSdkInfo () {
    return ajax({
      method: 'post',
      url: '/common/paas/create-access-token',
      params: {}
    })
  },
  /* 获取真实在线人数 */
  queryOnlineNum (activityId) {
    return ajax({
      method: 'post',
      url: '/frontend/channel/get-online-num',
      params: {
        activityId: activityId
      }
    })
  },
  /***
   * 查询默认回放信息
   * @param data
   * @returns {*}
   */
  queryPlayBackInfoById (activityId) {
    return ajax({
      method: 'post',
      url: '/frontend/replay/default-replay',
      params: {
        activityId: activityId
      }
    })
  },
  /**
   *  通过id获取暖场信息
   */
  queryWarmInfoById (id) {
    return ajax({
      method: 'post',
      url: '/frontend/live/warm-up',
      params: {
        activityId: id
      }
    })
  },
  /**
   *  订阅
   */
  sendSubscribe (params) {
    return ajax({
      method: 'post',
      url: '/frontend/user/email-subscribe',
      params: params
    })
  },
  // 成员列表
  getMember (data) {
    return ajax({
      method: 'get',
      url: `/initiator/channel/user-list`,
      params: data,
      headers: {
        Authorization: token
      }
    })
  },
  // 受限制成员列表
  getLimited (activityId) {
    return ajax({
      method: 'get',
      url: `/initiator/channel/list-limited`,
      params: {
        activityId: activityId
      },
      headers: {
        Authorization: token
      }
    })
  },
  // 全体禁言
  muteAll (data) {
    return ajax({
      method: 'get',
      url: `/initiator/user/gag-all`,
      params: data,
      headers: {
        Authorization: token
      }
    })
  },
  // 取消全体禁言
  cancelMuteall (data) {
    return ajax({
      method: 'get',
      url: `/initiator/user/gag-all`,
      params: data,
      headers: {
        Authorization: token
      }
    })
  },
  // 搜索成员
  searchMember (data) {
    return ajax({
      method: 'get',
      url: `/initiator/channel/search`,
      params: data,
      headers: {
        Authorization: token
      }
    })
  },
  // 获取历史消息记录
  getHistroychat (activityId) {
    return ajax({
      method: 'get',
      url: `/common/paas/message-list`,
      params: {
        activityId: activityId
      }
    })
  },
  // 禁言
  muteMember (data) {
    return ajax({
      method: 'post',
      url: `/initiator/user/gag`,
      params: data,
      headers: {
        Authorization: token
      }
    })
  },
  // 踢出
  kickMember (data) {
    return ajax({
      method: 'post',
      url: `/initiator/user/kick`,
      params: data,
      headers: {
        Authorization: token
      }
    })
  },
  // 发送公告
  sendAnn (data) {
    return ajax({
      method: 'post',
      url: `/initiator/channel/send-announcement`,
      params: data,
      headers: {
        Authorization: token
      }
    })
  },
  /* 获取观看页自定义主题 */
  queryCustomItem (activityId) {
    return ajax({
      method: 'post',
      url: '/manage/brand-manage/get',
      params: {
        activityId: activityId
      }
    })
  },
  /* 获取当前参会人的是否被禁言及踢出 */
  queryJoinStatus (data) {
    return ajax({
      method: 'GET',
      url: '/initiator/channel/get-activity-user-info',
      params: data,
      headers: {
        Authorization: token
      }
    })
  },
  /* 获取直播时间 */
  getLiveTime (activityId) {
    return ajax({
      method: 'GET',
      url: '/initiator/live/get-live-time',
      params: {
        activityId: activityId
      },
      headers: {
        Authorization: token
      }
    })
  },
  /* 获取活动官网 */
  getTemplate (activityId) {
    return ajax({
      method: 'GET',
      url: '/frontend/live/template',
      params: {
        activityId: activityId
      }
    })
  },
  // 获取聊天频道token
  GET_REG_SDK_INFO (data) {
    return ajax({
      method: 'GET',
      url: '/frontend/channel/create-channel-token',
      params: data
    })
  },
  /* 获取活动官网 */
  queryEmailWubscribe (businessUserId) {
    return ajax({
      method: 'GET',
      url: '/frontend/user/email-subscribe-status',
      params: {
        businessUserId: businessUserId
      }
    })
  }

}
export default LiveManage

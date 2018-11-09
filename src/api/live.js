import {
  ajax
} from 'src/utils/ajax'

let token = ''
let LiveManage = {
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
  }
}
export default LiveManage

export default class BasePusher {
  constructor (appId, roomId, inavId, token, rootEleId) {
    this.appId = appId
    this.roomId = roomId
    this.inavId = inavId
    this.token = token
    this.rootEleId = rootEleId
    this.type = ''
    this._accountId = null

    // 一个网页里。 既是主持人又是嘉宾？？？  如果存在这种情况的那么这个interactor也需要分角色，分为host 和 guest
    this.interactor = null
  }

  set accountId (val) {
    this._accountId = val
  }

  get accountId () {
    return this._accountId
  }

  /**
   *
   * 获取设备列表
   * @returns
   * @memberof BasePusher
   */
  getDevices () {
    return new Promise((resolve, reject) => {
      if (!this.interactor) {
        reject(new Error('尚未初始化互动推流端'))
      }
      this.interactor.getDevices(d => {
        resolve(d)
      })
    })
  }

  /**
   *
   * 主动上麦
   * @memberof BasePusher
   */
  publish () {
    if (!this.interactor) {
      console.warn('尚未初始化互动推流端')
      return
    }
    return new Promise((resolve, reject) => {
      this.interactor.publish({
        success: () => resolve(),
        fail: reason => reject(reason)
      })
    })
  }

  /**
   *
   * 主动下麦
   * @memberof BasePusher
   */
  unpublish () {
    if (!this.interactor) {
      console.warn('尚未初始化互动推流端')
      return
    }
    return new Promise((resolve, reject) => {
      this.interactor.unpublish({
        success: () => resolve(),
        fail: reason => reject(reason)
      })
    })
  }

  show (id) {
    if (!this.interactor) {
      console.warn('尚未初始化互动推流端')
      return
    }
    let camPre = this.interactor.camerasPreview({
      videoNode: id,
      success: function () {
      },
      fail: function (reason) {
        console.log(reason)
      }
    })
    camPre.show()
  }

  getStreamId () {
    if (!this.interactor) {
      console.warn('尚未初始化互动推流端')
      return
    }
    this.interactor.getStreamId()
  }

  mute (val) {
    if (!this.interactor) {
      console.warn('尚未初始化互动推流端')
      return
    }
    this.interactor.muteAudio(val)
  }

  showVideo (val) {
    if (!this.interactor) {
      console.warn('尚未初始化互动推流端')
      return
    }
    this.interactor.muteVideo(val)
  }

  getSetting () {
    return this.interactor.getSetting()
  }

  changeSetting (val) {
    let conf = this.getSetting()
    Object.assign(conf, val)
    this.interactor.changeSetting({
      conf: conf
    })
  }

  stop () {

  }

  destroy () {

  }

  /**
   * cam.show() cam.reset(conf) cam.destroy()
   * {'rate':[5,8],discription:'Low'},{'rate':[10,15],discription:'Noraml'}
   *  conf: {
        video: {
          deviceId: '1312312313123'
        },
        audio: {
          deviceId: '1312312313123'
        },
        videoSize: [320, 180, 320, 180],
        videoFrameRate: [5, 8]
      },
   *
   * @param {*} conf
   * @param {*} nodeId
   * @param {*} [successBK=null]
   * @param {*} [failedBK=null]
   * @returns
   * @memberof BasePusher
   */
  createPreview (conf, nodeId, successBK = null, failedBK = null) {
    if (!this.interactor) {
      console.log('尚未初始化互动推流端')
      return null
    }

    let cam = this.interactor.camerasPreview({
      conf: conf,
      videoNode: nodeId,
      success: () => {
        successBK && successBK()
      },
      fail: reason => {
        failedBK && failedBK(reason)
      }
    })

    return cam
  }
}

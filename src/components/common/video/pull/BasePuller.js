/**
 * 拉流基础服务
 *
 * @export
 * @class BasePuller
 */
export default class BasePuller {
  constructor (appId, rootEleId, token) {
    this.appId = appId
    this.rootEleId = rootEleId
    this.token = token
    this.type = ''
    this._accountId = null
    this.player = null
  }

  set accoundId (val) {
    this._accountId = val
  }

  get accoundId () {
    return this._accountId
  }

  play (callBK = null) {
    this.player.play()
    callBK && callBK()
  }

  pause (callBK = null) {
    this.player.pause()
    callBK && callBK()
  }

  resume (callBK = null) {
    this.player.play()
    callBK && callBK()
  }

  /**
   *
   *
   * @returns  {Array}   清晰度数组,如: [same,720,480],same为原画
   * @memberof BasePuller
   */
  getQuality () {
    return this.player.getQuality()
  }

  setQuality (quality, callBK = null) {
    this.player.setQuality(quality)
    callBK && callBK()
  }

  setFullScreen (val, callBK = null) {
    this.player.setFullScreen(val)
    callBK && callBK()
  }

  isFullscreen () {
    return this.player.isFullscreen()
  }

  /**
   *
   * 声音设置， 0~~100
   * @memberof BasePuller
   */
  set volume (val) {
    this.player.setVolume(val)
  }

  set width (val) {
    this.player.setWidth(val)
  }

  set height (val) {
    this.player.setHeight(val)
  }

  get netWorkState () {
    return this.player.getNetworkState()
  }

  destroy () {
    if (this.player) {
      this.player.destroy()
    }
  }
}

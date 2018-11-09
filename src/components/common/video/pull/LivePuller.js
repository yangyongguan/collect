import BasePuller from './BasePuller'

/**
 *
 * 普通观看  非互动的时候用的播放器
 * @export
 * @class LivePuller
 */
export default class LivePuller extends BasePuller {
  constructor (appId, roomId, rootEleId, token) {
    super(appId, rootEleId, token)
    this.type = 'live'
    this.roomId = roomId
  }

  initLivePlayer (autoplay = false, completionBK = null) {
    window.Vhall.ready(() => {
      window.VhallPlayer.init({
        roomId: this.roomId,
        type: 'live',
        videoNode: this.rootEleId,
        complete: () => {},
        ready: () => {
          completionBK && completionBK()
          if (autoplay) {
            window.VhallPlayer.play()
          }
        }
      })
      this.player = window.VhallPlayer
    })
  }

  set accountId (val) {
    super.accoundId = val

    console.log('aaa', this.appId, this.roomId, this.rootEleId, this.token)
    window.Vhall.config({
      appId: this.appId,
      accountId: val,
      token: this.token
    })
  }
}

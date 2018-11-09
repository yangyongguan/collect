import BasePuller from './BasePuller'

export default class VodPuller extends BasePuller {
  constructor (appId, recordId, rootEleId, token) {
    super(appId, rootEleId, token)
    this.type = 'vod'
    this.recordId = recordId
  }

  initVodPlayer (autoplay = false, completionBK = null) {
    // let VhallPlayer = window.VhallPlayer
    window.VhallPlayer.init({
      recordId: this.recordId,
      type: 'vod',
      videoNode: this.rootEleId,
      complete: () => {
        completionBK && completionBK()
        if (autoplay) {
          window.VhallPlayer.play()
        }
      }
    })

    this.player = window.VhallPlayer
  }

  get duration () {
    return this.player.getDuration() || 0
  }

  get currentTime () {
    return this.player.getCurrentTime() || 0
  }

  seek (val) {
    this.player.seek(val)
  }
}

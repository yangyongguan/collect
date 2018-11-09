import BasePusher from './BasePusher'

export default class GuestPusher extends BasePusher {
  constructor (appId, roomId, inavId, token, rootEleId) {
    super(appId, roomId, inavId, token, rootEleId)
    this.type = 'guest'
  }

  initGuestPusher (successBK = null, failedBK = null) {
    let VhallInteractionGuest = window.VhallInteractionGuest
    // let VhallSDK = window.Vhall

    window.Vhall.ready(() => {
      this.interactor = new VhallInteractionGuest({
        inavId: this.inavId,
        videoNode: this.rootEleId,
        localVideoWidth: '100%',
        localVideoHeight: '100%',
        success: result => {
          successBK && successBK(result)
        },
        fail: reason => {
          failedBK && failedBK(reason)
        }
      })
    })
  }
}

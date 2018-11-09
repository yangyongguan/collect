export function getCodeId (data) {
  return this.$ajax({
    method: 'post',
    url: '/common/message/get-captchaid',
    params: data
  })
}
export function getCode (data) {
  return this.$ajax({
    method: 'post',
    url: '/common/message/send-code',
    params: data
  })
}
export function verifyCode (data) {
  return this.$ajax({
    method: 'post',
    url: '/common/message/verify-code',
    params: data
  })
}

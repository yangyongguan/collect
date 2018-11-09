export function getSiteData (data) {
  return this.$ajax({
    url: '/frontend/live/template',
    params: data
  })
}

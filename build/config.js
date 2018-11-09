const config = {
  buildDetail: false,
  local: {
    BUILD_ENV: 'local',
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/',
    IMGHOST: '',
    PC_HOST: '//localhost:6688/webinar/',
    proxyTable: {
      '/api': {
        target: 'http://test-api-zhike.vhall.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  dev: {
    BUILD_ENV: 'dev',
    API_PATH: '/api',
    SUB_DIR: 'static',
    IMGHOST: '',
    PUBLIC_PATH: '/'
  },
  test: {
    BUILD_ENV: 'test',
    API_PATH: '/web/api',
    SUB_DIR: 'static',
    IMGHOST: '',
    PUBLIC_PATH: ''
  },
  prod: {
    BUILD_ENV: 'prod',
    API_PATH: '/web/api',
    SUB_DIR: 'static',
    IMGHOST: '',
    PUBLIC_PATH: '/'
  }
}
module.exports = config

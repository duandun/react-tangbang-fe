import { storage } from '@/util'

const ENV_CONFIG = {
  production: {
    api: '/api',
    rest: '/rest',
    sso: ''
  },
  development: {
    apiHost: 'http://47.93.29.71',
    api: '/api',
    rest: '/rest',
    sso: ''
  },
  staging: {
    apiHost: 'http://47.93.29.71',
    api: '/api',
    rest: '/rest',
    sso: ''
  }
}

const isDebugMode = process.env.NODE_ENV !== 'production'
export const curEnv = process.env.NODE_ENV || 'development'
const host = storage.local.get('debugApiHost') || (function () {
  const ENV = ENV_CONFIG[curEnv]
  let curApiHost = ENV['apiHost']
  if (isDebugMode) {
    return curApiHost
  }
  curApiHost = window.location.origin
  return curApiHost
})()

const loginUrl = {
  staging: 'http://mis-test.diditaxi.com.cn/auth/sso/login?app_id=362&version=1.0',
  production: 'http://mis.diditaxi.com.cn/auth/sso/login?app_id=362&version=1.0',
  development: 'http://mis-test.diditaxi.com.cn/auth/sso/login?app_id=362&version=1.0'
}

export function getHost () {
  return host
}
export const envConf = ENV_CONFIG[curEnv]
export function getLoginUrl () {
  return loginUrl[curEnv]
}
isDebugMode && console.log('curEnv is [%s]', curEnv)
isDebugMode && console.log('curApiHost is [%s]', getHost())

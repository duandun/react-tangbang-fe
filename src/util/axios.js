import axios from 'axios'
import { getHost, envConf } from '@/constant/env'

export const HTTP = axios.create({
  timeout: 5000,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
})

function handleParams (api, rawData, rawMethod, apiHost) {
  let newUrl
  if (api.indexOf('http') === 0 || api.indexOf('https') === 0) {
    newUrl = api
  } else {
    newUrl = getHost() + envConf[apiHost] + api
  }
  const method = rawMethod.toUpperCase()
  let data
  switch (method) {
    case 'GET':
      data = { params: rawData }
      break
    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      data = { data: rawData }
      break
    default:
      data = { params: rawData }
      break
  }

  return Promise.resolve({
    url: newUrl,
    method,
    data
  })
}

function handleFail (option) {
  const { error, reject } = option
  const { response } = error
  if (response) {
    switch (response.status) {
      case 401:
        // 重定向到登录
        const curHref = location.href
        location.replace(`${response.data.message}&jumpto=${curHref}`)
        break
      case 400:
      case 403:
        break
      case 404:
        break
      case 500:
        break
      default:
        break
    }
    reject(response)
  } else {
    reject(new Error(error.message))
  }
}

export const fetch = (api, rawData = {}, method = 'GET', apiHost = 'api') => {
  return handleParams(api, rawData, method, apiHost).then(options => {
    return new Promise((resolve, reject) => {
      HTTP({
        url: options.url,
        method: options.method,
        ...options.data
      })
        .then(resp => {
          resolve(resp.data)
        }, error => {
          handleFail({
            error,
            reject,
            options
          })
        })
    })
  })
}

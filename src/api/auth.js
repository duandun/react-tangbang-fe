import { fetch } from '@/util/axios'

export function list (params) {
  return fetch('/user/list', params, 'GET')
}

export function logout () {
  return fetch('/user/logout')
}

export function addRole (params) {
  return fetch('/user/addRole', params)
}

export function getUserInfo () {
  return fetch('/user/getUserInfo')
}

export function getOtherUserInfo (id) {
  return fetch('/user/getOtherUserInfo', { id })
}

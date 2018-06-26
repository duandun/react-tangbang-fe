import api from '@/api'
import {
  LIST_LOAD,
  LIST_FAIL,
  LIST_SUCCESS,
  BEFORE_SAVE,
  SAVE_SUCCESS,
  SAVE_FAIL
} from './actionTypes'

// export function list (params) {
//   return dispatch => {
//     dispatch(listLoad(params))
//     return search(params, dispatch)
//   }
// }

export function list (params) {
  return {
    types: [LIST_LOAD, LIST_SUCCESS, LIST_FAIL],
    promise: () => api.contract.list(params)
  }
}

function beforeSave (params) {
  return {
    type: BEFORE_SAVE,
    params
  }
}

function saveFail (params) {
  return {
    type: SAVE_FAIL,
    params
  }
}

function saveSuccess (results) {
  return {
    type: SAVE_SUCCESS,
    results
  }
}

function saving (params, dispatch) {
  return api.contract.save(params)
    .then(results => {
      dispatch(saveSuccess(results))
    })
    .catch(err => {
      dispatch(saveFail(err))
    })
}

export function save (params) {
  return dispatch => {
    dispatch(beforeSave(params))
    return dispatch(saving(params, dispatch))
  }
}

import api from '@/api'

export const LIST_LOAD = 'contract/LIST_LOAD'
export const LIST_SUCCESS = 'contract/LIST_SUCCESS'
export const LIST_FAIL = 'contract/LIST_FAIL'

function listLoad (params) {
  return {
    type: LIST_LOAD,
    params
  }
}

function listSuccess ({results, params}) {
  return {
    type: LIST_SUCCESS,
    results,
    params
  }
}

function listFail (error) {
  return {
    type: LIST_FAIL,
    error
  }
}

const search = (params, dispatch) => {
  return api.contract.list(params)
    .then(results => {
      dispatch(listSuccess({results, params}))
    })
    .catch(err => {
      dispatch(listFail(err))
    })
}

export function list (params) {
  return dispatch => {
    dispatch(listLoad(params))
    return search(params, dispatch)
  }
}

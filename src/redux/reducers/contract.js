import {
  LIST_LOAD,
  LIST_SUCCESS,
  LIST_FAIL
} from '../actions/contract'

const initState = {
  isLoading: false,
  tableList: [],
  isFail: false,
  errMsg: '',
  total: 0,
  pageStart: 1,
  pageSize: 10
}

export default function contract (state = initState, action = {}) {
  switch (action.type) {
    case LIST_LOAD:
      return {
        ...state,
        isLoading: true
      }
    case LIST_SUCCESS:
      const { results, params } = action
      return {
        ...state,
        isLoading: false,
        tableList: results.data,
        total: results.recordsTotal,
        pageStart: params.pageStart || state.pageStart,
        pageSize: params.pageSize || state.pageSize
      }
    case LIST_FAIL:
      return {
        ...state,
        errMsg: action.error,
        isFail: true,
        isLoading: false
      }
    default:
      return state
  }
}

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import createPromiseMiddleware from './middleware/promiseMiddleware'
import rootReducer from './reducers'
const loggerMiddleware = createLogger()

const middleware = [createPromiseMiddleware(), loggerMiddleware, thunkMiddleware]
const store = createStore(
  rootReducer,
  applyMiddleware(
    ...middleware
  )
)

export default store

import React from 'react'
import ReactDom from 'react-dom'
import App from 'components/App/App'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import './styles/main.less'

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

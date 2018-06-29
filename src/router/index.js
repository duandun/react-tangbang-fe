import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import ContractRouters from './contract'
import Loadable from 'react-loadable'
import LoadingComp from './loading'
import Hello from 'components/Hello/Hello'

const makeLoadable = (component) => Loadable({
  loader: component,
  loading: LoadingComp
})

const makeRouters = (routers) => routers.map(route => {
  return {
    path: route.path,
    name: route.name,
    component: makeLoadable(route.component)
  }
})

class RouteMap extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" component={Hello} exact />
          { makeRouters(ContractRouters).map((router, k) =>
            <Route path={router.path} render={(props) => <router.component {...props} meProp />} key={k} />) }
        </Switch>
      </Router>
    )
  }
}

export default RouteMap

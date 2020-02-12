import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import BizChart from './BizChart'
import AntvChart from './AntvChart'
import ViserChart from './ViserChart'
import BasicChart from './BasicChart'

export default function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/antv">AntvChart</Link>
        </li>
        <li>
          <Link to="/biz">BizChart</Link>
        </li>
        <li>
          <Link to="/viser">ViserChart</Link>
        </li>
        <li>
          <Link to="/basic">项目demo</Link>
        </li>
      </ul>
      <div>
        <Switch>
          <Route path="/biz">
            <BizChart />
          </Route>
          <Route path="/antv">
            <AntvChart />
          </Route>
          <Route path="/viser">
            <ViserChart />
          </Route>
          <Route path="/basic">
            <BasicChart />
          </Route>
          <Route exact path="/">
            请选择一个demo
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

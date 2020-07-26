import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import Article from './components/Article'
import FrontPage from './components/FrontPage'
import NotFound from './components/NotFound'

import './App.css'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <FrontPage />
          </Route>
          <Route path="/:id">
            <Article />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

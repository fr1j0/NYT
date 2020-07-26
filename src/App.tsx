import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Article from './Article';
import FrontPage from './FrontPage';
import NotFound from './NotFound';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
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
  );
}

export default App;

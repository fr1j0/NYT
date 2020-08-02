import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ArticleDetail from "./components/ArticleDetail";
import FrontPage from "./components/FrontPage";
import NotFound from "./components/NotFound";
import Header from "./components/Header";

import "./styles/App.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app--main">
          <Switch>
            <Route exact path="/">
              <FrontPage />
            </Route>
            <Route exact path="/:id">
              <ArticleDetail />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

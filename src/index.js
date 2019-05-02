import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Game from "./components/Game.jsx";
import Landing from "./components/Landing.jsx";
import {Provider} from 'react-redux'
import store from './store'


ReactDOM.render(
  <Provider store={store}>
    <Router>
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/game" component={Game} />
        </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
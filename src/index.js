import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router'
import GameContainer from "./components/GameContainer.jsx";
import Landing from "./components/Landing.jsx";
import {Provider} from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <div className="main">
          <Route exact path="/" component={Landing} />
          <Route exact path="/game" 
              render = {() => (
                store.getState().user.name 
                ? <GameContainer /> 
                : <Redirect to='/'/>
          )}/>
        </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
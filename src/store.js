import { createStore } from "redux";
import reducer from "./reducers";

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

const store = createStore(reducer, enhancer)

export default store 
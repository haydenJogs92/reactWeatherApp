import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import freeze from "redux-freeze"

import reducer from "./reducers"

const middleware = applyMiddleware(promise(), thunk, freeze, logger())

export default createStore(reducer, middleware)

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'

import allProducts from './allProducts'
import singleProduct from './singleProduct'
import admin from './admin'
import allOrders from './allOrders'
import cart from './cart'

const reducer = combineReducers({
  user,
  allProducts,
  singleProduct,
  admin,
  allOrders,
  cart
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allOrders'

import 'antd/lib/style/index.less' // antd core styles
import './components/kit/vendors/antd/themes/default.less' // default theme antd components
import './components/kit/vendors/antd/themes/dark.less' // dark theme antd components
import './global.scss' // app & third-party component styles

import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import * as dotenv from 'dotenv'
import { ApolloProvider } from '@apollo/client'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider as ReduxProvider } from 'react-redux'
// import { logger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import Router from './router'
import reducers from './redux/reducers'
import sagas from './redux/sagas'
import Localization from './localization'
import * as serviceWorker from './serviceWorker'

/* eslint-disable */
import { client } from './services/apollo/client'
/* eslint-enable */

// load env
dotenv.config()

// middlewared
const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [sagaMiddleware, routeMiddleware]

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }
const store = createStore(reducers(history), composeWithDevTools(applyMiddleware(...middlewares)))
sagaMiddleware.run(sagas)

ReactDOM.render(
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <Localization>
        <Router history={history} />
      </Localization>
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
export { store, history }

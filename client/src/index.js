import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { StoreProvider } from 'easy-peasy'
import { store as easyStore } from './store/easyPeasy'
// import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import { Helmet } from 'react-helmet'

ReactDOM.render(
  <Provider store={store}>
    <StoreProvider store={easyStore}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ODE-APP</title>
      </Helmet>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </StoreProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

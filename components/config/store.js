import { AsyncStorage } from 'react-native'

//redux
import { 
  createStore, 
  applyMiddleware, 
  compose 
}                           from 'redux'
import thunk                from 'redux-thunk'
import { 
  persistStore, 
  autoRehydrate 
}                           from 'redux-persist'
import logger               from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

//reducers
import reducers from './root-reducer'

//sagas
import appSaga from '../app-saga'

//sagas
const saga = createSagaMiddleware

const store = createStore(reducers, {}, compose(
  autoRehydrate(),
  applyMiddleware(thunk, logger, saga)
))

if (module.hot) {
  module.hot.accept('./root-reducer', () => {
    const nextRootReducer = require('./root-reducer')
    store.replaceReducer(nextRootReducer)
  })
}

saga.run(appSaga)
persistStore(store, { storage: AsyncStorage })

export default store
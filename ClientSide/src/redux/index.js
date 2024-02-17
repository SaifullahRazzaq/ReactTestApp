import { applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import RootReducer from './Reducers';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';

// const Store = createStore(
//   RootReducer,
//   {},
//   applyMiddleware(
//     createLogger(),
//     thunk
//   ),
// );
const Store = configureStore(

  {
    reducer: RootReducer,

  },
  applyMiddleware(
    createLogger(),
    thunk
  ),
)
let Persistor = persistStore(Store);
// console.log("store===>", Store)
export { Store, Persistor };

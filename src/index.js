import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore, applyMiddleware} from 'redux'; //, combineReducers
import { Provider } from 'react-redux';
import { eventsReducer } from './reducers'
import thunk from 'redux-thunk'

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

//const rootReducer = combineReducers({ eventsReducer, usersReducer });
const store = createStore(eventsReducer, applyMiddleware(thunk)); //later switch to rootReducer
//console.log(store.getState());

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.css';
import App from './components/App';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker.js';
import {createStore} from 'redux';
import rootReducer from './reducers';







//STORE -- where all our data is
let store = createStore(rootReducer);

store.subscribe(() => console.log(store.getState()));

//DISPATCH -- sends action to reducer

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();


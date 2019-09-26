/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import { name as appName } from './app.json';
import reducer from './src/reducers/myappReducer';

const store = createStore(reducer,applyMiddleware(thunk));
const AppContainer = () => 
    <Provider store={store}>
        <App/>
    </Provider>
AppRegistry.registerComponent(appName, () => AppContainer);
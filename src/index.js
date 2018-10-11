import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux'; //apply middleware lets you... apply... middleware to your app
import { createLogger } from 'redux-logger'; //This is a middleware that logs what actions get triggered
import thunkMiddleware from 'redux-thunk'; //middleware that lets you write asyncronous redux. Looks for actions that return functions and acts on them.
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { searchRobots, requestRobots } from './containers/reducers';
import 'tachyons';

const logger = createLogger();

const rootReducer = combineReducers({ searchRobots, requestRobots}); //combineReducers combines the reducers into one root reducer which can now be used for either of these reducers
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

//by using store as a prop on provider and wrapping the app in the provider, this passes the store down the component tree to all of the componenets in the app.
ReactDOM.render(
	<Provider store={store}> 
		<App /> 
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();

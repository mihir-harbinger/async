import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/'

const middleware = [
	thunkMiddleware
]

const configureStore = preloadedState => {
	const store = createStore(
		rootReducer,
		compose(
			applyMiddleware(...middleware),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	)

	if(module.hot){
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}

export default configureStore
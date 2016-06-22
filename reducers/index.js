import { combineReducers } from 'redux'
import * as actions from '../constants'

const defaultReddit = 'reactjs'
const defaultState = {
	isFetching: false,
	didInvalidate: false,
	items: []
}

const selectedReddit = (state=defaultReddit, action) => {
	switch(action.type){
		case actions.SELECT_REDDIT:
			return action.reddit
		default:
			return state
	}
}

const posts = (state=defaultState, action) => {
	switch(action.type){
		case actions.INVALIDATE_REDDIT:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case actions.REQUEST_POSTS:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			})
		case actions.RECEIVE_POSTS:
			//console.log(action.posts)
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.posts,
				lastUpdated: Date.now()
			})
		default:
			return state
	}
}

const postsByReddit = (state={}, action) => {
	switch(action.type){
		case actions.INVALIDATE_REDDIT:
		case actions.REQUEST_POSTS:
		case actions.RECEIVE_POSTS:
			return Object.assign({}, state, {
				[action.reddit]: posts(state[action.reddit], action)
			})
		default:
			return state
	}
}

const rootReducer = combineReducers({
	selectedReddit,
	postsByReddit
})

export default rootReducer
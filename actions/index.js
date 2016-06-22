import * as actions from '../constants'

export const selectReddit = reddit => {
	return {
		type: actions.SELECT_REDDIT,
		reddit
	}
}

const invalidateReddit = reddit => {
	return {
		type: actions.INVALIDATE_REDDIT,
		reddit
	}
}

const requestPosts = reddit => {
	return {
		type: actions.REQUEST_POSTS,
		reddit
	}
}

const receivePosts = (reddit, json) => {
	return {
		type: actions.RECEIVE_POSTS,
		reddit,
		posts: json.data.children.map(child => child.data),
		receivedAt: Date.now()
	}
}

const fetchPosts = reddit => {
	return dispatch => {
		dispatch(requestPosts(reddit))
		return fetch(`https://www.reddit.com/r/${reddit}.json`)
			.then(response => response.json())
			.then(json => dispatch(receivePosts(reddit, json)))
	}
}

const shouldFetchPosts = (state, reddit) => {
	const posts = state.postsByReddit[reddit]
	if(!posts){
		return true
	}
	if(posts.isFetching){
		return false
	}
	return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => {
	return(dispatch, getState) => {
		if(shouldFetchPosts(getState(), reddit)){
			return dispatch(fetchPosts(reddit))
		}
	}
}

export const refreshReddit = reddit => {
	return dispatch => {
		dispatch(invalidateReddit(reddit))
		dispatch(fetchPostsIfNeeded(reddit))
	}
}
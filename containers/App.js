import React, {Component} from 'react'
import { connect } from 'react-redux'

import Picker from '../components/Picker'
import Posts from '../components/Posts'
import { selectReddit, refreshReddit, fetchPostsIfNeeded } from '../actions'

export default class App extends Component{

	constructor(props){
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleRefresh = this.handleRefresh.bind(this)
	}
	componentDidMount(){
		const {dispatch, selectedReddit } = this.props
		dispatch(fetchPostsIfNeeded(selectedReddit))
	}
	componentWillReceiveProps(nextProps){
		const {dispatch, selectedReddit} = nextProps
		dispatch(fetchPostsIfNeeded(selectedReddit))
	}
	handleChange(reddit){
		this.props.dispatch(selectReddit(reddit))
	}
	handleRefresh(e){
		e.preventDefault()
		const {dispatch, selectedReddit} = this.props
		dispatch(refreshReddit(selectedReddit))
	}
	render(){
		const {posts, selectedReddit, lastUpdated, isFetching} = this.props
		return(
			<div>
				<h1>App</h1>
				<Picker 
					onChange={this.handleChange} 
					options={['reactjs', 'frontend']} 
					value={selectedReddit} 
				/>
				<p>
				{lastUpdated && <span>last updated at {new Date(lastUpdated).toLocaleString()}. {' '}</span>}
				<a href="#" onClick={this.handleRefresh}>Refresh</a>
				</p>
				<div style={{opacity: isFetching ? 0.5 : 1}}>
					<Posts posts={posts} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {selectedReddit, postsByReddit} = state
	
	const {
		isFetching, 
		lastUpdated, 
		items: posts
	} = postsByReddit[selectedReddit] || {
		isFetching: true, items: []
	}

	return {
		selectedReddit,
		isFetching,
		lastUpdated,
		posts
	}
}

export default connect(mapStateToProps)(App)
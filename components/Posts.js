import React, { Component } from 'react'

export default class Posts extends Component{
	render(){
		const {posts} = this.props
		return(
			<div>
				<ul>
				{
					posts.map((post, i) => <li key={i}>{post.title}</li>)
				}
				</ul>
			</div>
		)
	}
}
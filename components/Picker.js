import React, { Component } from 'react'

export default class Picker extends Component{
	render(){
		const {onChange, onClick, options, value} = this.props
		return(
			<div>
				<select onChange={(e) => onChange(e.target.value)} value={value}>
					{
						options.map(option => <option key={option} value={option}>{option}</option>)
					}
				</select>
			</div>
		)
	}
}
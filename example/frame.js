import React, { Component } from "react"
import { store$ } from "./store"

export class Frame extends Component {
	constructor(props) {
		super(props)
		this.state = {
			image: "",
		}
	}

	componentDidMount() {
		this.store = store$.subscribe(({ image }) => {
			this.setState({
				image,
			})
		})
	}

	componentWillUnmount() {
		this.store.unsubscribe()
	}

	render() {
		const { image } = this.state
		return (
			<div>
				<img width="200" style={{border: "2px red solid"}} src={ image } alt="" />
			</div>
		)
	}
}


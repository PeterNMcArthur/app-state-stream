import React, { Component } from "react"
import { store$ } from "./store"

export class Frame extends Component {
	constructor(props) {
		super(props)
		this.state = {
			img: "",
		}
	}

	componentDidMount() {
		this.store = store$.subscribe(({ img }) => {
			this.setState({
				img: img && img.src,
			})
		})
	}

	componentWillUnmount() {
		this.store.unsubscribe()
	}

	render() {
		const { img } = this.state
		return (
			<div>
				<img width="200" style={{border: "2px red solid"}} src={ img } alt="" />
			</div>
		)
	}
}


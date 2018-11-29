import React, { Component } from "react"
import { store$ } from "./store"
import { getNewDogPicture$ } from "./store/images"
import { openChat$ } from "./store/chat"
import { submitValue$ } from "./store/submit"
import { Frame } from "./frame"

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			submitted: "",
			img: "",
			show: false,
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.toggleShow = this.toggleShow.bind(this)
	}

	componentDidMount() {
		getNewDogPicture$()
		this.chatStream = openChat$.subscribe()
		this.store = store$.subscribe(({ chat, img, submitted, updated }) => {
			this.setState({
				messages: updated === "chat" ? [...this.state.messages, chat.message] : this.state.messages,
				img: img,
				submitted: submitted,
			})
		})
	}

	toggleShow() {
		this.setState({
			show: !this.state.show
		})
	}

	handleChange(e) {
		this.setState({
			type: e.target.value
		})
	}

	componentWillUnmount() {
		this.store.unsubscribe()
		this.chatStream.unsubscribe()
	}

	handleSubmit() {
		submitValue$(this.state.type)
	}

	render() {
		const { messages, img, submitted, show } = this.state
		return (
			<div>
				<h2>Rx test</h2>
				<h3>{ submitted }</h3>
				<input type="text" onChange={this.handleChange} />
				<button onClick={this.handleSubmit}>update title</button>
				<img width="200" src={ img } alt="" />
				<button onClick={getNewDogPicture$}>change pic</button>
				{ show && <Frame /> }
				<button onClick={this.toggleShow}>toggle show</button>
				<ul>
					{ messages.map((x, i) => <li key={i}>{x}</li>) }
				</ul>
			</div>
		)
	}
}

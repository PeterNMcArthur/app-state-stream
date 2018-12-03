# state-stream

## Install 

```npm install --save state-stream```

## Usage

state-stream uses rxjs subjects merged in to a larger stream to share information between different subsribers. To start if you need to create a new subject:

### Creating new subjects

```
// src/store/user.js
import { createNewSubject } from "state-stream"

export const {
	user$,
	updater
} = createNewSubject("user")

```

This will give us a new stream which we can pass new values to using the provided updater function which ensures the updates are isolated to desired stream. The `createNewSubject` function takes two arguments:
1) (required) name of the subject you're creating, this must be a valid variable name as it will be used to create the exported variable with an appended $ to domate that it's a stream.
2) (optional) The initial value for the subject.

### Creating the application state stream

```
// src/store.js

import { createStateStream } from "state-stream"
import { user$ } from "./store/user"

export const store$ = createStateStream(
	user$,
)
```

To create your state-stream you need to pass all the subjects you've created in to the createStateStream function and export the result to use as your store.

### Using newly create Store

```
import React, { Component } from "react"
import { store$ } from "./store"

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {},
		}
	}

	componentDidMount() {
		this.store = store$.subscribe(({ user }) => {
			this.setState({
				user,
			})
		})
	}

	componentWillUnmount() {
		this.store.unsubscribe() // you must unsubscribe to the store on componentWillUnmount to avoid leaks.
	}

	render() {
		const { user } = this.state
		return (
			<header>
				<h1>Welcome Back</h1>
				<p>{user.userName}</p>
			</header>
		)
	}
}
```

import { createStore } from "./store/createStore"
import { image$ } from "./store/images"
import { chat$ } from "./store/chat"
import { submitted$ } from "./store/submit"

export const store$ = createStore(
	image$,
	chat$,
	submitted$,
)


import { createStateStream } from "../src"
import { image$ } from "./store/images"
import { chat$ } from "./store/chat"
import { submitted$ } from "./store/submit"

export const store$ = createStateStream(
	image$,
	chat$,
	submitted$,
)


import { interval } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import faker from "faker"
import { createStateStream } from "./createStateStream"

export const {
	chat$,
	updater
} = createStateStream("chat")

export const openChat$ = interval(2000).pipe(
	map(x => updater({
		message: faker.lorem.sentence()
	})),
)

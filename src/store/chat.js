import { interval, Subject } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import faker from "faker"

const _chat$ = new Subject()
const subject = "chat"

const newValue = x => ({
	subject,
	...x,
})

const updater = x => _chat$.next(newValue(x))

export const openChat$ = interval(2000).pipe(
	map(x => updater({
		subject: "sentence",
		message: faker.lorem.sentence()
	})),
)

export const chat$ = _chat$

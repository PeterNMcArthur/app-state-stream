import { interval, Subject } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import faker from "faker"
import { createNewValue } from "./newValue"

const _chat$ = new Subject()
const subject = "chat"

const newValue = createNewValue(subject)

const updater = x => _chat$.next(newValue(x))

export const openChat$ = interval(2000).pipe(
	map(x => updater({
		message: faker.lorem.sentence()
	})),
)

export const chat$ = _chat$

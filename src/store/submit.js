import { Subject } from "rxjs"
import { startWith, takeUntil } from "rxjs/operators"

const _submitted$ = new Subject()
const subject = "submitted"

const newValue = x => ({
	subject,
	...x,
})

const updater = x => _submitted$.next(newValue(x))

const initialState = newValue({
	val: "first message",
})

export const submitValue$ = val => from({ val }).
	pipe(
		map(updater),
		takeUntil(_submitted$)
	)

export const submitted$ = _submitted$
	.pipe(
		startWith(initialState)
	)


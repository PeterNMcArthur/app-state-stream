import { Subject, from } from "rxjs"
import { startWith, takeUntil } from "rxjs/operators"
import { createNewValue } from "./newValue"

const _submitted$ = new Subject()
const subject = "submitted"

const newValue = createNewValue(subject)

const updater = x => _submitted$.next(newValue(x))

const initialState = newValue("first message")

export const submitValue$ = updater

export const submitted$ = _submitted$
	.pipe(
		startWith(initialState)
	)


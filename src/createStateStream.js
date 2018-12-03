import { merge, isObservable  } from "rxjs"
import { scan, shareReplay, startWith } from "rxjs/operators"
import { set, lensProp } from "ramda"
import { isNil } from "./helpers/isNil"
import { compose } from "./helpers/compose"

const allStreamsAreValid = streams => streams.reduce((isValid, observable) => isValid && isObservable(observable), true)

const updateError = update => {
	if (isNil(update.subject)) {
		return "No subject key was supplied to the store. In order to update the store you must provide the subject you wish to update"
	}
	if (isNil(update.nextValue)) {
		return "No nextValue key was supplied to the store. In order to update the store you must provide the nextValue"
	}
	return false
}
const updateApplicationStateStream = (acc, x) => {
	try {
		if (updateError(x)) throw new Error(updateError(x))
		const updatedState = compose(
			set(lensProp("updated"), x.subject),
			set(lensProp(x.subject), x.nextValue)
		)
		return updatedState(acc)
	} catch(e) {
		console.error("createStore error: ", e)
		return acc
	}
}

export const createStateStream = (...streams) => {
	try {
		if (!allStreamsAreValid(streams)) throw new Error("Only observables are valid paramteres")
		return merge(...streams)
			.pipe(
				startWith({}),
				scan(updateApplicationStateStream),
				shareReplay()
			)
	} catch (e) {
		console.error("createStore error: ", e)
	}
}

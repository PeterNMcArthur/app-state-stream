import { merge, isObservable, combineLatest } from "rxjs"
import { scan, shareReplay, startWith, skip } from "rxjs/operators"
import { isNil } from "./helpers/isNil"
import { compose } from "./helpers/compose"

const isEmpty = x => x.length !== 0

const head = array => array[0]
const sort = sorter => array => array.sort(sorter)
const prop = name => obj => obj && obj[name]

const mostRecent = (a, b) => b.updatedAt - a.updatedAt

const getMostRecentlyUpdated = compose(
	sort(mostRecent),
	head,
	prop("subject"),
)

export const allStreamsAreValid = streams => streams.reduce((isValid, observable) => isValid && isObservable(observable), isEmpty(streams))

const verifyStream = ({ subject, nextValue }) => {
	if (isNil(subject)) {
		return "No subject key was supplied to the store. In order to update the store you must provide the subject you wish to update"
	}
	if (isNil(nextValue)) {
		return "No nextValue key was supplied to the store. In order to update the store you must provide the nextValue"
	}
	return false
}

export const checkStreamForErrors = (error, stream) => error === false ? verifyStream(stream) : false

export const updateApplicationStateStream = (acc, streams) => {
	try {
		const streamError = streams.reduce(checkStreamForErrors, false)
		if (streamError) throw new Error(streamError)
		
		return {
			...streams.reduce((nextStream, { subject, nextValue }) => ({ ...nextStream, [subject]: nextValue }), {}),
			updated: getMostRecentlyUpdated(streams),
		}
	} catch(e) {
		console.error("createStore error: ", JSON.stringify(e))
		return acc
	}
}

export const createStateStream = (...streams) => {
	try {
		if (!allStreamsAreValid(streams)) throw new Error("Only observables are valid paramteres")
		return combineLatest(...streams)
			.pipe(
				scan(updateApplicationStateStream, {}),
				shareReplay()
			)
	} catch (e) {
		console.error("createStore error: ", e)
	}
}

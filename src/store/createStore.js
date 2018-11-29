import { merge } from "rxjs"
import { scan, shareReplay, startWith } from "rxjs/operators"
import { lensProp, set, omit, prop, compose } from "ramda"

export const createStore = (...streams) => merge(...streams)
	.pipe(
		startWith({}),
		scan((acc, x) => {
			try {
				if (!x.subject) {
					throw new Error("No subject key was supplied to the store. In order to update the store you must provide the subject you wish to update")
				}
				if (!x.nextValue) {
					throw new Error("No nextValue key was supplied to the store. In order to update the store you must provide the nextValue")
				}
				const updatedState = compose(
					set(lensProp("updated"), x.subject),
					set(lensProp(x.subject), x.nextValue)
				)
				return updatedState(acc)
			} catch(e) {
				return acc
			}
		}),
		shareReplay()
	)


import { merge } from "rxjs"
import { scan, shareReplay, startWith } from "rxjs/operators"
import { lensProp, set, omit, compose } from "ramda"

export const createStore = (...streams) => merge(...streams)
	.pipe(
		startWith({}),
		scan((acc, x) => {
			try {
				if (!x.subject) {
					throw new Error("No subject key was supplied to the store. In order to update the store you must provide the subject you wish to update")
				}
				const updatedState = compose(
					set(lensProp("updated"), x.subject),
					set(lensProp(x.subject), omit(["subject"], x))
				)
				return updatedState(acc)
			} catch(e) {
				console.error(e)
				return acc
			}
		}),
		shareReplay()
	)


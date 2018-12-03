import { BehaviorSubject, Subject } from "rxjs"
import { isNil } from "./helpers/isNil"

export const genericSubjectUpdater = subject => x => ({
	subject,
	nextValue: x,
})

const isInvalidSubjectName = subjectName => !subjectName || typeof subjectName !== "string" || !/^[a-z_-]+$/gi.test(subjectName)

export const createNewSubject = (subjectName, initialState) => {
	try {
		if (isInvalidSubjectName(subjectName)) {
			throw new Error("You must provide a subject string which can only contain letters - and _")
		}
		const setNextValue = genericSubjectUpdater(subjectName)
		const subject$ = !isNil(initialState) ? new BehaviorSubject(setNextValue(initialState)) : new Subject()
		const updater = x => subject$.next(setNextValue(x))
		
		return {
			[`${subjectName}$`]: subject$,
			[`set${subjectName.replace(/^./g, x => x.toUpperCase())}`]: updater,
		}
	} catch (e) {
		console.error(e)
	}
}


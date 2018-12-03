import { interval } from "rxjs"
import { map, switchMap } from "rxjs/operators"
import faker from "faker"
import { createNewSubject } from "../../src"

export const {
	chat$,
	setChat,
} = createNewSubject("chat")

export const openChat$ = interval(2000).pipe(
	map(x => setChat({
		message: faker.lorem.sentence()
	})),
)

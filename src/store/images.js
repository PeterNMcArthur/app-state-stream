import { from, Subject } from "rxjs"
import { flatMap, startWith, switchMap, takeUntil, map } from "rxjs/operators"
import { createNewValue } from "./newValue"

const _image$ = new Subject()
const subject = "img"

const newValue = createNewValue(subject)

const initialState = newValue("https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp?cid=3640f6095bfe8760394a387a2e9b8c85.gif")

const updater = x => _image$.next(newValue(x))

export const getNewDogPicture$ = () => from(fetch("https://dog.ceo/api/breeds/image/random"))
	.pipe(
		flatMap(x => x.json()),
		map(({ message }) => message),
		switchMap(updater),
		takeUntil(_image$),
	).subscribe()


export const image$ = _image$
	.pipe(
		startWith(initialState)
	)


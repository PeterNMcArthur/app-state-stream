import { from, Subject } from "rxjs"
import { flatMap, startWith, switchMap, take, map } from "rxjs/operators"
import { createStateStream } from "./createStateStream"

export const {
	image$,
	updater
} = createStateStream("image", "https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg")

export const getNewDogPicture$ = () => {
	return from(fetch("https://dog.ceo/api/breeds/image/random"))
		.pipe(
			flatMap(x => x.json()),
			map(({ message }) => message),
			take(1)
		)
}
export const getImages = () => getNewDogPicture$().subscribe(updater)

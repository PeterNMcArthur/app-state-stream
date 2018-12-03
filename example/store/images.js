import { from, Subject } from "rxjs"
import { flatMap, take, map } from "rxjs/operators"
import { createNewSubject } from "../../src"

export const {
	image$,
	setImage
} = createNewSubject("image", "https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg")

export const getImages = () => from(fetch("https://dog.ceo/api/breeds/image/random"))
	.pipe(
		flatMap(x => x.json()),
		map(({ message }) => message),
		take(1)
	).subscribe(setImage)

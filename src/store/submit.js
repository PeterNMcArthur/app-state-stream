import { Subject, from } from "rxjs"
import { startWith, takeUntil } from "rxjs/operators"
import { createStateStream } from "./createStateStream"

export const { submitted$, updater } = createStateStream("submitted")

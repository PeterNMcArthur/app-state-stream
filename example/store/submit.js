import { Subject, from } from "rxjs"
import { startWith, takeUntil } from "rxjs/operators"
import { createNewSubject } from "../../src"

export const { submitted$, setSubmitted } = createNewSubject("submitted")

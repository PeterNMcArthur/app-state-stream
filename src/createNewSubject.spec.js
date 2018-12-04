import { expect } from "chai"
import { genericSubjectUpdater, createNewSubject } from "./createNewSubject"
import { isObservable } from "rxjs"

describe("genericSubjectUpdater", () => {
	it("Will compose functions together on a single value", () => {
		const chatUpdater = genericSubjectUpdater("chat")
		expect(chatUpdater({ message: "Good morning sunshine" })).to.deep.equal({
			subject: "chat",
			nextValue: {
				message: "Good morning sunshine",
			},
		})
	})
})

describe("createNewSubject", () => {
	it("Will create a new object with a setter and a named stream", () => {
		expect(Object.keys(createNewSubject("chat", { message: "Hello" }))).to.deep.equal([
			"chat$", "setChat"
		])
	})
	it("The created stream will be an observable", () => {
		const { chat$ } = createNewSubject("chat", { message: "Hello" })
		expect(isObservable(chat$)).to.be.true
	})
	it("The stream will have an intial state equivalent to that set in the createNewSubject", () => {
		const { chat$, setChat } = createNewSubject("chat", { message: "Hello" })
		const stream = chat$.subscribe(x => {
			expect(x).to.deep.equal({
				subject: "chat",
				nextValue: {
					message: "Hello"
				}
			})
		})
		stream.unsubscribe()
	})
	it("The setter will set a new value for the stream", () => {
		const { chat$, setChat } = createNewSubject("chat", { message: "Hello" })
		setChat({ message: "Goodbye" })
		const stream = chat$.subscribe(x => {
			expect(x).to.deep.equal({
				subject: "chat",
				nextValue: {
					message: "Goodbye"
				}
			})
		})
		stream.unsubscribe()
	})
})

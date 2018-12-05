import { expect } from "chai"
import { createStateStream, allStreamsAreValid, updateApplicationStateStream, checkStreamForErrors } from "./createStateStream"
import { from, Subject, BehaviorSubject } from "rxjs"
import { map } from "rxjs/operators"
import { createNewSubject } from "./createNewSubject"

describe("allStreamsAreValid", () => {
	it("If all items are observables then the streams are valid", () => {
		expect(allStreamsAreValid([
			from([]),
			new Subject(),
		])).to.be.true
	})
	it("If an item is not an observables then the streams are invalid", () => {
		expect(allStreamsAreValid([ from([]), {}, ])).to.be.false
		expect(allStreamsAreValid([ from([]), null, ])).to.be.false
		expect(allStreamsAreValid([ from([]), "", ])).to.be.false
		expect(allStreamsAreValid([])).to.be.false
	})
})

describe("updateApplicationStateStream", () => {
	it("will return an updated stream variable", () => {
		const newState = updateApplicationStateStream({}, [
			{
				subject: "chat",
				nextValue: {
					message: "Good morning",
				},
			}
		])
		expect(newState).to.deep.equal({
			chat: {
				message: "Good morning",
			},
		})
		const updatedState = updateApplicationStateStream(newState, [
			{
				subject: "chat",
				nextValue: {
					message: "Good morning",
				},
			},
			{
				subject: "image",
				nextValue: "a-wholesome-picture-for-the-whole-family-to-enjoy.jpg",
			}
		])
		expect(updatedState).to.deep.equal({
			chat: {
				message: "Good morning",
			},
			image: "a-wholesome-picture-for-the-whole-family-to-enjoy.jpg",
		})
	})
})

describe("checkStreamForErrors", () => {
	it("If the stream is valid will return false", () => {
		expect(checkStreamForErrors(false, { subject: "chat", nextValue: "Hello there" })).to.be.false
	})
	it("If the stream is invalid will return a string message", () => {
		expect(checkStreamForErrors(false, { nextValue: "Hello there" })).to.be.a("string")
		expect(checkStreamForErrors(false, { subject: "chat" })).to.be.a("string")
	})
})

describe("createStateStream", () => {
	it("will merge streams and emit the composed state stream", (done) => {
		const { chat$ } = createNewSubject("chat", "You're my best friend")
		const { user$ } = createNewSubject("user", {
			id: 1,
			userName: "captianUnderPants",
		})

		const newStore = createStateStream(chat$, user$)

		const store$ = newStore.subscribe(x => {
			expect(x).to.deep.equal({
				chat: "You're my best friend",
				user: {
					id: 1,
					userName: "captianUnderPants",
				},
			})
			done()
		})
		store$.unsubscribe()
	})
})

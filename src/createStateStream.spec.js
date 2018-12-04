import { expect } from "chai"
import { allStreamsAreValid, updateApplicationStateStream } from "./createStateStream"
import { from, Subject } from "rxjs"

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
		const newState = updateApplicationStateStream({}, {
			subject: "chat",
			nextValue: {
				message: "Good morning",
			},
		})
		expect(newState).to.deep.equal({
			chat: {
				message: "Good morning",
			},
			updated: "chat",
		})
		const updatedState = updateApplicationStateStream(newState, {
			subject: "image",
			nextValue: "a-wholesome-picture-for-the-whole-family-to-enjoy.jpg",
		})
		expect(updatedState).to.deep.equal({
			chat: {
				message: "Good morning",
			},
			image: "a-wholesome-picture-for-the-whole-family-to-enjoy.jpg",
			updated: "image",
		})
	})
})

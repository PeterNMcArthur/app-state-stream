import { expect } from "chai"
import { compose } from "./compose"

describe("compose", () => {
	it("Will compose functions together on a single value", () => {
		const arrayToSentence = compose(
			x => x.join(" "),
			x => x.replace(/^./, y => y.toUpperCase()),
			x => x.replace(/.$/, y => `${y}.`),
		)
		expect(arrayToSentence(["hello", "there", "my", "friends"])).to.equal("Hello there my friends.")
	})
})


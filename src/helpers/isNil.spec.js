import { expect } from "chai"
import { isNil } from "./isNil"

describe("isNil", () => {
	it("is true value is undefined or null", () => {
		expect(isNil(null)).to.be.true
		expect(isNil(undefined)).to.be.true
		expect(isNil()).to.be.true
	})
	it("is false if any type other than null or undefined", () => {
		expect(isNil("")).to.be.false
		expect(isNil(0)).to.be.false
		expect(isNil([])).to.be.false
		expect(isNil({})).to.be.false
		expect(isNil(false)).to.be.false
	})
})


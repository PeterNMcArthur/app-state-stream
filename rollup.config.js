import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default {
	input: "src/index.js",
	output: {
		file: "bundle.js",
		format: "cjs"
	},
	plugins: [
		resolve({
			only: [/ramda/]
		}),
		babel({
			plugins: [ "ramda" ]
		}),
		commonjs({
			include: 'node_modules/**',
		}),
	],
}

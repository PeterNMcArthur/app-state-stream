import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

export default {
	input: "src/index.js",
	output: {
		name: "appStateStream",
		file: "bundle.js",
		format: "umd",
		globals: {
			"rxjs": "rxjs",
			"rxjs/operators": "rxjs.operators"
		}
	},
	external: [ "rxjs", "rxjs/operators" ],
	plugins: [
		commonjs({
			include: /node_modules/,
		}),
	],
}

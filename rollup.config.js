import babel from "rollup-plugin-babel"

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
		babel({
			babelrc: false,
			presets: ["@babel/preset-env"]
		}),
	],
}

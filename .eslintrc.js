module.exports = {
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"mocha": true,
    "jest": true,
    "amd": true,
    "node": true
	},
	"plugins": [
		"react",
		"jsx-a11y",
		"import"
	],
	"rules":{
		"indent": [2, "tab"],
		"no-tabs": 0,
		"no-undef": "error",
		"semi": ["error", "never"],
		"quotes": ["error", "double"],
		"comma-dangle": ["error", "always-multiline"],
		"function-paren-newline": ["error", "multiline"],
		"no-unused-vars": "error",
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"react/jsx-uses-vars": 1,
		"react/jsx-uses-react": 1,
		"react/react-in-jsx-scope": 1,
		"react/prop-types": 2,
	}
}

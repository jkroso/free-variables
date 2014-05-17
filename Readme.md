
# free-variables

  Get a list of free variables used in a JS program. A free variable is one which is used but not declared.

## Installation

With your favorite package manager:

- [packin](//github.com/jkroso/packin): `packin add free-variables`
- [component](//github.com/component/component#installing-packages): `component install jkroso/free-variables`
- [npm](//npmjs.org/doc/cli/npm-install.html): `npm install free-variables`

then in your app:

```js
var free = require('free-variables')
```

## API

### free(ast)

Takes any [standard](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API) JS AST and returns and `Array` of `String`'s

```js
var parse = require('esprima').parse
free(parse('console.log')) // => ['console']
free(parse('console[log]')) // => ['console', 'log']
free(parse('function b(){a}')) // => ['a']
free(parse('var a = 1; a + b')) // => ['b']
free(parse('a; var a')) // => []
```

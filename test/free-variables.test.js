
var parse = require('esprima').parse
var free = require('..')

function test(js, vars){
  assert.deepEqual(free(parse(js)), vars, JSON.stringify(js))
}

it('basic', function(){
  test('a', ['a'])
  test('Error', ['Error'])
})

it('declared variables', function(){
  test('var a;a', [])
  test('var a;b', ['b'])
})

it('function declarations', function(){
  test('function a(){};a;b', ['b'])
  test('function a(){a;b}', ['b'])
  test('function a(b){a;b}', [])
})

it('function expressions', function(){
  test('var a = function b(){};a;b', ['b'])
  test('a = function b(){};a;b', ['a', 'b'])
  test('a = function b(){b;a}', ['a'])
  test('var a = function b(){b;a}', [])
  test('var a = function b(){b;a};b', ['b'])
})

it('try-catch', function(){
  test('try{}catch(e){e}', [])
  test('try{a}catch(e){e}', ['a'])
  test('try{a}catch(e){e;b}', ['a', 'b'])
})

it('member expressions', function(){
  test('console.log', ['console'])
  test('console[log]', ['console', 'log'])
})

it('late declarations', function(){
  test('a;var a', [])
  test('a;b;var b', ['a'])
  test('a;function a(){}', [])
  test('a;b;function a(){};var b', [])
})

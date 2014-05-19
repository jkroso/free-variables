
var children = require('ast-children')
var unique = require('unique')

function freeIdents(node, env){
  switch (node.type) {
    case 'VariableDeclaration':
      node.declarations.forEach(function(v){
        env[v.id.name] = true
      })
      break
    case 'FunctionDeclaration':
      env[node.id.name] = true // falls through
    case 'FunctionExpression':
      env = Object.create(env)
      if (node.id) env[node.id.name] = true
      node.params.forEach(function(p){
        env[p.name] = true
      })
      break
    case 'CatchClause':
      return freeIdents(node.body, env).filter(function(name){
        return name != node.param.name
      })
    case 'MemberExpression':
      if (!node.computed) return freeIdents(node.object, env)
      break
    case 'Identifier':
      if (!env[node.name]) return node.name
      break
  }
  return children(node).reduce(function(res, child){
    return res.concat(freeIdents(child, env))
  }, []).filter(function(name){
    return !env[name]
  })
}

module.exports = function(ast){
  return unique(freeIdents(ast, {}))
}


/**
 * Hydro configuration
 *
 * @param {Hydro} hydro
 */

module.exports = function(hydro) {
  hydro.set({
    suite: 'free-variables',
    timeout: 500,
    plugins: [
      require('hydro-bdd')
    ],
    globals: {
      assert: require('assert/')
    }
  })
}

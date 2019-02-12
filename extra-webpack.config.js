// Helper file to parse command line arguments and send them to `ng test`

const args = process.argv.slice(2)
console.log(args)
const webpack = require('webpack')
const FILTER = args[1]
let KARMA_SPEC_FILTER = /\.spec\.ts$/
if (FILTER) {
  KARMA_SPEC_FILTER = `/${FILTER}.spec.ts$/`
}
module.exports = {
  plugins: [new webpack.DefinePlugin({ KARMA_SPEC_FILTER })]
}

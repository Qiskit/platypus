const path = require('path')

module.exports = {
  configureWebpack: {
    context: path.resolve(__dirname)
  },
  css: {
    extract: false
  }
}

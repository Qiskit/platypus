const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const yaml = require('js-yaml')

const tableOfContents = JSON.stringify(yaml.load(fs.readFileSync('notebooks/toc.yaml', 'utf8')))

module.exports = {
  configureWebpack: {
    context: path.resolve(__dirname),
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_MEGA_MENU_TOC': `\`${tableOfContents}\``
      })
    ]
  },
  css: {
    extract: false
  }
}

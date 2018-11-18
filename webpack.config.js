const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'bsp.js',
    library: 'bsp',
    libraryTarget: 'umd',
  }
}

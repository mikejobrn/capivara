module.exports = {
  watch: true,
  bail: false,
  entry: './src/main.ts',
  output: {
    filename: './build/bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  },
  module: {
    loaders: [
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};

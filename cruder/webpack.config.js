const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  externals: [
    nodeExternals({
      additionalModuleDirs: ['../node_modules'],
      allowlist: [/@k8s-demo-byjean/]
    })
  ],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { configFile: 'tsconfig.webpack.json' },
        exclude: /\.\.\/node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
    //  plugins: [PnpWebpackPlugin]
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'cruder.js'
  }
};

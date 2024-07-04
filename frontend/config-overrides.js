const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    "zlib": require.resolve("browserify-zlib"),
    "querystring": require.resolve("querystring-es3"),
    "path": require.resolve("path-browserify"),
    "crypto": require.resolve("crypto-browserify"),
    "fs": false,
    "stream": require.resolve("stream-browserify"),
    "http": require.resolve("stream-http"),
    "net": false,
    "url": require.resolve("url/"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
    "process": require.resolve("process/browser"),
    "assert": require.resolve("assert/"),
    "vm": require.resolve("vm-browserify"),
    "async_hooks": false // 'async_hooks' is not available in the browser
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  );

  return config;
};

const fs = require('fs');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "assets": '@/assets',
        "common": '@/common',
        "components": '@/components',
        "views": '@/views',
        "network": '@/network',
        "api": '@/api',
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/xamall/'
    : '/',
  // devServer: {
  //   before(app, serve) {
  //     app.get('/api/goods/home', (req, res) => {
  //       fs.readFile('../data.json', 'utf8', (err, data) => {
  //         if (!err) {
  //           res.json(JSON.parse(data));
  //         }
  //       })
  //     })
  //   }
  // }
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3333"
      }
    }
  },
}

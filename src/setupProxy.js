const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://beta.api.uniswap.org/v1/graphql',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/', // remove base path
      },
    })
  )
  app.use(
    '/api/beta',
    createProxyMiddleware({
      target: 'https://temp.api.uniswap.org/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/api/beta': '/', // remove base path
      },
    })
  )
  app.use(
    '/cmc',
    createProxyMiddleware({
      target: 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json',
      changeOrigin: true,
      pathRewrite: {
        '^/cmc': '/', // remove base path
      },
    })
  )
}

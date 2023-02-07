const { createProxyMiddleware } = require('http-proxy-middleware')

const apiProxy = createProxyMiddleware('/beta', {
  target: 'https://temp.api.uniswap.org/v1',
  changeOrigin: true,
  includePrefix: false,
  pathRewrite: {
    '^/beta': '/' // strip "/api" from the URL
  },
  onProxyReq(proxyReq) {
    proxyReq.setHeader('origin', 'http://localhost:3000')
    proxyReq.setHeader('Content-Type', 'application/json')
    proxyReq.setHeader('Referer', 'http://localhost:3000/')
    proxyReq.setHeader('Host', 'temp.api.uniswap.org')
    proxyReq.setHeader('TE', 'trailers')
    proxyReq.setHeader('User-Agent', 'User-Agent Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0')
  },
  onProxyRes(proxyRes) {
    proxyRes.headers['Cache-Control'] = 's-maxage=1, stale-while-revalidate'
  },
  logLevel: 'debug'
})

function proxy(req, res) {
  return apiProxy(req, res)
}
proxy.middleware = apiProxy

module.exports = proxy

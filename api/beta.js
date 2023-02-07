// Create a proxy to redirect requests of the "/api/*" path to "https://example.org".
//
// Examples:
// GET /api/hello → GET https://example.org/hello
// POST /api/test?color=red → POST https://example.org/test?color=red
//
// Additionally, the proxy will:
// - Add an "x-added" header
// - Remove the "x-removed" header
// From the proxied response.
//
// You can/should update the proxy to suit your needs.
// See https://github.com/chimurai/http-proxy-middleware for more details.
const { createProxyMiddleware } = require('http-proxy-middleware')

const apiProxy = createProxyMiddleware({
  target: 'https://temp.api.uniswap.org/v1',
  changeOrigin: true,
  pathRewrite: {
    '^/api/beta': '' // strip "/api" from the URL
  },
  onProxyReq(proxyReq) {
    proxyReq.setHeader('origin', 'app.uniswap.org')
  },
  onProxyRes(proxyRes) {
    proxyRes.headers['Cache-Control'] = 's-maxage=1, stale-while-revalidate'
  },
  logLevel: 'debug'
})

// Expose the proxy on the "/api/*" endpoint.
export default function (req, res) {
  return apiProxy(req, res)
}

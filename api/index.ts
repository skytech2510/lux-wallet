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
  target: 'https://beta.api.uniswap.org/v1/graphql',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '' // strip "/api" from the URL
  },
  // onProxyRes(proxyRes) {
  //   proxyRes.headers['x-added'] = 'foobar' // add new header to response
  //   delete proxyRes.headers['x-removed'] // remove header from response
  // }
})

// Expose the proxy on the "/api/*" endpoint.
export default function (req, res) {
  return apiProxy(req, res)
}

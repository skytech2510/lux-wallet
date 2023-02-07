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
  onProxyReq(proxyReq) {
    proxyReq.setHeader('origin', 'http://localhost:3000')
    proxyReq.setHeader('Content-Type', 'application/json')
    proxyReq.setHeader('Referer', 'http://localhost:3000/')
    proxyReq.setHeader('Cookie', 'AMP_0000000000=JTdCJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJkZXZpY2VJZCUyMiUzQSUyMmY3Y2U2YjZjLTk2YTEtNDI0Ny1hNTdjLWVjY2NmOWUyMjNlZiUyMiUyQyUyMmxhc3RFdmVudFRpbWUlMjIlM0ExNjc1NzUwNDEyMzMyJTJDJTIyc2Vzc2lvbklkJTIyJTNBMTY3NTc1MDQxMDA3OCU3RA==; AMP_MKTG_0000000000=JTdCJTdE; _hp2_id.2120523489=%7B%22userId%22%3A%221901858558924873%22%2C%22pageviewId%22%3A%226086101989268534%22%2C%22sessionId%22%3A%227284413905776725%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _ga_M5131VBRN3=GS1.1.1675324128.4.1.1675326878.60.0.0; _ga=GA1.1.2101045042.1675291292; _fbp=fb.0.1675291683098.113117798; _ga_KDP9B6W4H8=GS1.1.1675642019.2.0.1675642019.0.0.0')
  },
  onProxyRes(proxyRes) {
    proxyRes.headers['Cache-Control'] = 's-maxage=1, stale-while-revalidate'
  }
  logLevel: 'debug'
})

// Expose the proxy on the "/api/*" endpoint.
export default function (req, res) {
  return apiProxy(req, res)
}

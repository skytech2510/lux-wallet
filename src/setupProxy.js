module.exports = function(app) {
  // Order matters here
  app.use('/api/beta', require('../api/beta').middleware)
  app.use('/api/cmc', require('../api/cmc').middleware)
  app.use('/api', require('../api/index').middleware)
}

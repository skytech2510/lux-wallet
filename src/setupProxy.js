module.exports = function(app) {
  // Order matters here
  app.use('/api',  require('../api/index').middleware)
  app.use('/beta', require('../api/beta').middleware)
  app.use('/cmc',  require('../api/cmc').middleware)
}

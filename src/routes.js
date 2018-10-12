const { getFormatedPaths } = require('./services')

const addRoutes = (app, graph, jsonDatas) => {
  app.get('/path', (req, res) => {
    if (!req.query || !req.query.from || !req.query.to) {
      res.status(422).send({ error: 'Missing parameter' })
    }
    try {
      const formatedPaths = getFormatedPaths(jsonDatas, graph, req.query.from, req.query.to)
      res.send(formatedPaths)
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: 'Internal error' })
    }
  })
  app.get('/map', (req, res) => {
    res.send(jsonDatas)
  })
}

module.exports = {
  addRoutes
}

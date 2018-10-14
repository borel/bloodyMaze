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
  app.get('/markers', (req, res) => {
    const markers = []
    jsonDatas.forEach(geoPoint => {
      markers.push({ id: geoPoint.id, tooltip: `${geoPoint.id} ${geoPoint.name}`, position: { lat: geoPoint.latitude, lng: geoPoint.longitude } })
    })
    res.send(markers)
  })
  app.get('/select', (req, res) => {
    const options = []
    jsonDatas.forEach(geoPoint => {
      options.push({ value: geoPoint.id, text: `${geoPoint.id} ${geoPoint.name}` })
    })
    res.send(options)
  })
}

module.exports = {
  addRoutes
}

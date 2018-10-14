const express = require('express')
const services = require('./src/services')
const routes = require('./src/routes')
const config = require('config')
const jsonDatas = require('./datas/lyonMapData.json')

const runSever = async () => {
  // At run time , buulding graph with the initial json data to be compliant with dijkstra lib
  const graph = await services.buildDijkstraGraph(jsonDatas)
  if (Object.keys(graph).length === 0) {
    console.error('The server is not running, the graph is empty')
  } else {
    const app = express()

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
    routes.addRoutes(app, graph, jsonDatas)

    app.listen(config.get('appConfig.port'), config.get('appConfig.host'))
    console.log(`Running on http://${config.get('appConfig.host')}:${config.get('appConfig.port')}`)
  }
}

runSever()

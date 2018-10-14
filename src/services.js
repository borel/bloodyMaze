const dijkstra = require('dijkstrajs')

/**
 * Build graph for djikstra lib from a json geopoint file
 * @param {*} geoPoints
 */
const buildDijkstraGraph = (geoPoints) => {
  const graph = {}
  try {
    geoPoints.forEach(geoPoint => {
      if (geoPoint.id) {
        graph[geoPoint.id] = {}
        geoPoint.links.forEach(link => {
          graph[geoPoint.id][link.id] = link.distance
        })
      }
    })

    const nbElement = Object.keys(graph).length
    if (nbElement === 0) {
      console.warn('There is no entry in the Djikstra graph, please check the format of your file')
    }
    console.log(`Graph created with ${nbElement} elements `)
  } catch (error) {
    console.error('Error during formating data, please check the format of your file')
  }
  return graph
}

/**
 * Get path from one point to another using Dijkstra algorithm and format the result
 * @param {*} graph
 * @param {*} startingGeoPointId
 * @param {*} endingGeoPointId
 */
const getFormatedPaths = (jsonDatas, graph, startingGeoPointId, endingGeoPointId) => {
  const paths = getPaths(graph, startingGeoPointId, endingGeoPointId)
  if (paths && paths.length > 0) {
    return buildingFormatedPaths(paths, jsonDatas)
  }
  return []
}

/**
 * Get path from one point to another using Dijkstra algorithm
 * @param {*} graph
 * @param {*} startingGeoPointId
 * @param {*} endingGeoPointId
 */
const getPaths = (graph, startingGeoPointId, endingGeoPointId) => {
  try {
    return dijkstra.find_path(graph, startingGeoPointId, endingGeoPointId)
  } catch (error) {
    console.log('erros =>', error)
    return []
  }
}

/**
 * Building formated response
 *  - we get the distance informations ( distance from point to point and distance from first point to current point ) from the initial json file
 *
 * @param {*} paths
 * @param {*} jsonDatas
 */
const buildingFormatedPaths = (paths, jsonDatas) => {
  const steps = []
  let distanceFromBegining = 0

  // Get the full first step to get the name
  const fullFirstStep = getStep(jsonDatas, paths[0])
  const firstStep = buildStep(fullFirstStep.id, fullFirstStep.name, fullFirstStep.latitude, fullFirstStep.longitude, 0, 0)
  steps.push(firstStep)

  paths.forEach((path, index) => {
    const nextStepId = paths[index + 1]
    if (nextStepId) {
      // Getting distance information from initial json file
      const fullCurrentStep = getStep(jsonDatas, path)
      const nextStep = fullCurrentStep.links.find(link => Number(link.id) === Number(nextStepId))
      const fullNextStep = getStep(jsonDatas, nextStepId)
      distanceFromBegining += nextStep.distance
      const step = buildStep(fullNextStep.id, fullNextStep.name, fullNextStep.latitude, fullNextStep.longitude, nextStep.distance, distanceFromBegining)
      steps.push(step)
    }
  })
  return steps
}

/**
 * Building step
 * @param {*} id
 * @param {*} name
 * @param {*} latitude
 * @param {*} longitude
 * @param {*} distance
 * @param {*} distanceFromBegining
 */
const buildStep = (id, name, latitude, longitude, distance, distanceFromBegining) => {
  const step = {}
  step.id = Number(id)
  step.tooltip = `${id} ${name}`
  step.position = { lat: latitude, lng: longitude }
  step.distance = distance
  step.distance_from_begining = distanceFromBegining
  return step
}

/**
 * Getting step from json file
 * @param {*} jsonDatas
 * @param {*} id
 */
const getStep = (jsonDatas, id) => {
  return jsonDatas.find(geoPoint => Number(geoPoint.id) === Number(id))
}

module.exports = {
  buildDijkstraGraph,
  getPaths,
  buildingFormatedPaths,
  getFormatedPaths
}

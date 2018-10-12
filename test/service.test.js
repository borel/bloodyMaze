const {
  getFormatedPaths,
  buildDijkstraGraph
} = require('../src/services')

const simpleJsonDatas = require('../datas/simpleJsonData.json')

/* global expect */
/* eslint-env mocha */
describe('Service', () => {
  describe('#buildDijkstraGraph', () => {
    const dataDriven = [
      {
        desc: 'Should return an empty json object if the geopoint json file is empty',
        element: {
          geoPoints: []
        },
        expected: {}
      },
      {
        desc: 'Should return an empty json object if the geopoint json file is not well formated',
        element: {
          geoPoints: [{ john: 2, name: [{ doh: 3 }] }]
        },
        expected: {}
      },
      {
        desc: 'Should return a formated json object if the geopoint json file is well formated',
        element: {
          geoPoints: simpleJsonDatas
        },
        expected: {
          '1': {
            '2': 10,
            '3': 60
          },
          '2': {
            '3': 10,
            '4': 10
          },
          '3': {
            '2': 10
          },
          '4': {
          }
        }
      }
    ]
    dataDriven.forEach((ctx) => {
      it(ctx.desc, () => {
        const res = buildDijkstraGraph(ctx.element.geoPoints)
        expect(res).to.eql(ctx.expected)
      })
    })
  })
})
describe('#getFormatedPaths', () => {
  const simpleGraph = buildDijkstraGraph(simpleJsonDatas)

  const dataDriven = [
    {
      desc: 'Should return an array of one element with distance and distance_from_begining are equal to O , when the startingGeoPointId and endingGeoPointId are the same ',
      element: {
        jsonDatas: {}, graph: [], startingGeoPointId: 1, endingGeoPointId: 1
      },
      expected: [{
        'distance': 0,
        'distance_from_begining': 0,
        'id': 1
      }]
    },
    {
      desc: 'Should path with 1 & 2 with distance 0 & 10 , when this is a simple and direct path ',
      element: {
        jsonDatas: simpleJsonDatas, graph: simpleGraph, startingGeoPointId: 1, endingGeoPointId: 2
      },
      expected: [{
        'distance': 0,
        'distance_from_begining': 0,
        'id': 1
      },
      {
        'distance': 10,
        'distance_from_begining': 10,
        'id': 2
      }]
    },
    {
      desc: 'Should return 1 & 2 & 4  with distance 0 & 10 & 10, when this is a multi and direct path with no concurency ',
      element: {
        jsonDatas: simpleJsonDatas, graph: simpleGraph, startingGeoPointId: 1, endingGeoPointId: 4
      },
      expected: [{
        'distance': 0,
        'distance_from_begining': 0,
        'id': 1
      },
      {
        'distance': 10,
        'distance_from_begining': 10,
        'id': 2
      },
      {
        'distance': 10,
        'distance_from_begining': 20,
        'id': 4
      }]
    },
    {
      desc: 'Should return 1 & 2 & 3  with distance 0 & 10 & 10 when this is a multi and direct path with direct concurency with a higher distance ( 1 to 3 costs 60 ) ',
      element: {
        jsonDatas: simpleJsonDatas, graph: simpleGraph, startingGeoPointId: 1, endingGeoPointId: 3
      },
      expected: [{
        'distance': 0,
        'distance_from_begining': 0,
        'id': 1
      },
      {
        'distance': 10,
        'distance_from_begining': 10,
        'id': 2
      },
      {
        'distance': 10,
        'distance_from_begining': 20,
        'id': 3
      }]
    }
  ]

  dataDriven.forEach((ctx) => {
    it(ctx.desc, () => {
      const res = getFormatedPaths(ctx.element.jsonDatas, ctx.element.graph, ctx.element.startingGeoPointId, ctx.element.endingGeoPointId)
      expect(res).to.eql(ctx.expected)
    })
  })
})

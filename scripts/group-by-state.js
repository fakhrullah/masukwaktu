#!/usr/bin/env node

const zones = require('../src/data/zones-and-same-zones.json')

const groupByStates = zones.zones.reduce((objA, objB) => {
    const val = objB['negeri']
    objA[val] = (objA[val] || []).concat(objB)
    return objA
}, {})

console.log(JSON.stringify({groupByStates: groupByStates}))

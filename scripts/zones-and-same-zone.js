#!/env/node

const zones = require('../src/data/zones.json')
const groupZones = require('../src/data/grouped-zones.json')
const results = groupZones.results;

let zonesAndSameZone = []

zones.zones.map((zone) => {
    const id = `${zone.lokasi.toLowerCase().split(' ').join('-')}_${zone.negeri.toLowerCase().split(' ').join('-')}`
    zonesAndSameZone.push({
        id,
        ...zone,
        othersInSameZone: results.find(groupZone => sameZone(groupZone.zone, zone.zone)).location
    })
})

function sameZone (groupZone, currentZone) {
    return groupZone === currentZone
}

console.log(JSON.stringify(zonesAndSameZone))

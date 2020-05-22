#!/usr/bin/env node

const data = require("../src/data/zones.json");

function compareZone (a, b) {
    if (a.zone <= b.zone) return -1;
    else return 1;
}
const sortedZones = data.zones.sort(compareZone);
let groupedZones = [];

let tempZone = ''
let tempGroupedZone = {}


sortedZones.map(({zone, negeri, lokasi}, index) => {
    if (tempZone !== zone) {
        if (index !== 0) {
            groupedZones.push(tempGroupedZone);
        }
        tempZone = zone
        tempGroupedZone = {
            zone: zone,
            state: negeri,
            location: [lokasi]
        }

        if (index === sortedZones.length - 1) {
            groupedZones.push(tempGroupedZone);
        }
    } else {
        tempGroupedZone.location.push(lokasi);
    }
})

console.log(JSON.stringify(groupedZones))

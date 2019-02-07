'use strict'
const _ = require('lodash'),
    R = require('ramda'),
    computeScore = require('../modules/scoreFunction.js'),
    canTakeRide = require('../libs/canTakeRide.js'),
    getRideInfo = require('../libs/getRideInfo.js');


/**
 *
 * @typedef ReturnProcess
 * @property {number} score
 * @property {Object} outputObject
 *
 * @param {Object} inputObject
 * @return {ReturnProcess}
 */
function processInput(inputObject){
    const outputObject = {};

    inputObject.rides.forEach(ride => {
        const availableVehicule = inputObject.vehicules.filter(v => canTakeRide(v, ride))[0];
        if (availableVehicule) {
            const infos = getRideInfo(availableVehicule, ride, availableVehicule.clock);
            ride.vehiculeClock = availableVehicule.clock;
            availableVehicule.rides.push(ride);
			availableVehicule.position = ride.endPoint;
            availableVehicule.clock = infos.totalTime;
        }
    })
    outputObject.vehicules = inputObject.vehicules;

    return {
        score: computeScore(inputObject, outputObject),
        outputObject
    };
}






module.exports = processInput;
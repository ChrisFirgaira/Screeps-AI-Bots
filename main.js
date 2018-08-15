var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require ('role.repairer');
var roleWallRepairer = require ('role.wallrepairer');
var roleFarHarvester = require ('role.farharvester');
require('role.tower');
//pewpew
module.exports.loop = function () {
    // clear memory
    for (let name in Memory.creeps)
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }

    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role == 'wallrepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role == 'farharvester') {
            roleFarHarvester.run(creep);

        }
    }
    var maximumNumberOfHarvesters = 6;
    var maximumNumberOfUpgraders = 1;
    var maximumNumberOfBuilders = 2;
    var maximumNumberOfRepairers = 0;
    var maximumNumberOfWallRepairers = 2;
    var maximumNumberOfFarHarvesters = 0;

    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfWallRepairers =  _.sum(Game.creeps, (c) => c.memory.role == 'wallrepairer');
    var numberOfFarHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'farharvester');

    var name = undefined;

    if(numberOfHarvesters < maximumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],
        { role: 'harvester',working: false});
    }
    else if(numberOfUpgraders < maximumNumberOfUpgraders) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE],
        { role: 'upgrader',working: false});
    }

    else if(numberOfBuilders < maximumNumberOfBuilders) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE],
        { role: 'builder',working: false});
    }

    else if(numberOfRepairers < maximumNumberOfRepairers) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE],
        { role: 'repairer',working: false});
    }

    else if(numberOfWallRepairers < maximumNumberOfWallRepairers) {
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],
            { role: 'wallrepairer',working: false});
    }

        else if(numberOfFarHarvesters < maximumNumberOfFarHarvesters) {
        name = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE],
            { role: 'farharvester',working: false});
    }

    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }

    if (!(name < 0)){
        console.log("Spawning new creep: " + name + " who is a " + creep.memory.role);
        console.log("There are now " + numberOfHarvesters
        + " harvesters," + numberOfUpgraders + " of Upgraders "
        + " ,Builders: " + numberOfBuilders  + ", Repairers: " + numberOfRepairers
        + " and " + numberOfWallRepairers + " Wall Repairers"
        + " and " + numberOfFarHarvesters + " Far Harvesters");
    }
};

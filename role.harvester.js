var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep) {

        if (creep.room.name != creep.memory.home) {
            //console.log(Game.spawns.Spawn1.room.energyAvailable);
            // find exit to home room

            var exit = creep.room.findExitTo(creep.memory.home);

            // and move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }

        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);

            }
        }
        // Check to see whether worker has now collected all the energy possible, set status to true to indicate the
        // worker is now ready to return to base
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;


        }
        if (creep.memory.working == true && Game.spawns.Spawn1.room.energyAvailable == 300) {
            roleUpgrader.run(creep);
        }

        else if (creep.memory.working == true && Game.spawns.Spawn1.room.energyAvailable < 300) {
            if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn1);
                //This log tells you teh carrying capacity  of the Harvesters
                //.log('The Carrying capacity of ' + creep.name + ' is ' + creep.carryCapacity);
            }
        }
         else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};
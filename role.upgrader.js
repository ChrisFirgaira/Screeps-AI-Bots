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
            // switch state
             creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy < creep.carryCapacity) {
            creep.memory.working = true; 
        }
        
        if (creep.memory.working == true) {
            if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            //    creep.name + " currently has " + creep.energyAvailable + " energy left";
            }
        }
    }
};
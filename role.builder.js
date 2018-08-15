var roleUpgrader = require('role.upgrader');
var roleHarvester = require('role.harvester');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        
        
        if (creep.room.name != creep.memory.home) {
            //console.log(Game.spawns.Spawn1.room.energyAvailable);
            // find exit to home room

            var exit = creep.room.findExitTo(creep.memory.home);

            // and move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite != undefined) {
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(constructionSite);
                }
            }
            // if no constructionSite is found
            else {
                // go harvesting
                roleHarvester.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};





// var roleUpgrader = require('role.upgrader');

// module.exports = {
//     run: function(creep) {

//         if (creep.memory.working == true && creep.carry.energy == 0) {
//             // switch state
//              creep.memory.working = false;
// console.log("did you just set me to false again?!" + creep.name);
//         }
//         else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
//             creep.memory.working == true;
// console.log("set me to true baby!");
//         }

//         if (creep.memory.working = true) {
//             var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
//             if (constructionSite != undefined) {
//                 if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
//                   moveTo(constructionSite);
//                   console.log("GOING TO " + constructionSite);
//                 }
//             }    
        
            
//         else { var source = creep.pos.findClosestByPath(FIND_SOURCES);
//             if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(source);
//                 console.log(creep.name + " currently has " + creep.energyAvailable + " energy left");
                    
//                 }    
//             }
//         }
//     }
// };



//         // else { roleUpgrader.run(creep);
//         // console.log("I'm being an upgrader, w00t w00t!!! but I could have been building!")
//         // }
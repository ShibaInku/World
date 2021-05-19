/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
			creep.memory.storing = false;
			creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
		else if (creep.store.getFreeCapacity() == 0 && creep.room.find(FIND_MY_STRUCTURES).hits <= creep.room.find(FIND_MY_STRUCTURES).hitsMax - 20000,{
			filter: {
				structureType: STRUCTURE_CONTAINER
			}
		})
		{
			creep.memory.building = false;
			creep.memory.storing = false;
			creep.memory.repairing = true;
			creep.say(' repair');
		}
	    else if(creep.store.getFreeCapacity() == 0 && creep.room.find(FIND_MY_CONSTRUCTION_SITES).length != 0) {
	        creep.memory.building = true;
			creep.memory.storing = false;
			creep.memory.repairing = false;
	        creep.say('🚧 build');
	    }
		else if (creep.store.getFreeCapacity() == 0)
		{
			creep.memory.building = false;
			creep.memory.storing = true;
			creep.memory.repairing = false;
			creep.say(' store');
		}

	    if(creep.memory.building) 
		{
	        var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
		else if(creep.memory.storing)
		{
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
			if(targets.length > 0) {
				if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
		}
		else if (creep.memory.repairing)
		{
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
				}
			});
			if(targets.length > 0) {
				if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
		}
	    else 
		{
            const target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(target) 
            {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
	    }
	}
};

module.exports = roleBuilder;
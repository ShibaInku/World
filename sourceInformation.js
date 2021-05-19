/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
var sourceInfo = {
    run: function()
    {
        var sources = Room.find(FIND_SOURCES);
        var source1;
        var source2;

        for (var x = 0; x < sources.length; x++)
        {
            if(x == 0)
            {
                source1 = sources[0];
            }
            else
            {
                source2 = sources[1];
            }
        }
        var source1Position = source1.pos;
        var source2Position = source2.pos;
        var terrain = Game.map.getRoomTerrain(room.name);
        /**@param {Source.pos} sourcePosition */
        for(var x = sourcePosition.x - 1; x < sourcePosition.x + 1; x++)
        {
            for(var y = sourcePosition.y - 1; y < sourcePosition.y + 1; y++)
            {
                const pos = new RoomPosition(x, y, room.name);
                var creeps = Room.find(FIND_CREEPS);
                creeps.forEach(creep => {
                    //If a screep is standing in this spot or it's a wall, it is taken and inaccessible.
                    if(creep.pos == pos || terrain.get(pos.x, pos.y) == 1)
                    {
                        
                    }
                    else
                    {
                        return false;
                    }
                });
            }
        }
        
    }
}

module.exports = sourceInfo;
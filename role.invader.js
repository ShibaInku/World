/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.invader');
 * mod.thing == 'a thing'; // true
 */
var roleInvader = {
    /**@param {Creep} creep */
    run: function(creep)
    {
        creep.room.findExitTo(FIND_EXIT_TOP);
    }
}
module.exports = roleInvader;
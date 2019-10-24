const Sequelize = require('sequelize')
const db = require('../db')
// Here: Initializing the Defining of relations
const Team = require ('../team/model')

const Player = db.define(
    'player',
    {
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        number: {
            type: Sequelize.INTEGER,
            ///field: 'number'
        }
    },
    //{ tableName: 'players' }
)

// Below: Defining the relationship
// 1. Make sure Models are imported correct
//    Make sure force: true is on (!!!) in db
// --> otherwise we cannot change a table!
Player.belongsTo(Team, {onDelete: 'cascade'}) 
// cascade, lets us delete all players within the team that is deleted
// get me the team for this player --> se if 
// teamid is added 
Team.hasMany(Player) /// get me the players of the team
/// both of the dependencies SHOULD be in the same model (!!!)

module.exports = Player
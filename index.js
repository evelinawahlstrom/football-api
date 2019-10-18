const express = require ('express')
const teamRouter = require ('./team/router')
const playerRouter = require ('./players/router')
const bodyParser = require('body-parser')
const cors = require('cors')
const Team = require('./team/model')
const Player = require('./players/model')
const db = require('./db')



/*{ Declare a constant named app and set 
    it to the output of the express function.}*/
const app = express()
const middleware = cors()
const jsonParser = bodyParser.json()
// THE MIDDLEWARE NEED TO BE before teamRouter, otherwise it won't work
app.use(middleware)
app.use(jsonParser)
app.use(teamRouter)
app.use(playerRouter)


//const db = require ('./db') - imported in teamRouter now
// const Team = require ('./team/model') - imported in 
// teamRouter now


/*{Declare a constant named port equal to the process.env.PORT if it is defined. If it is not defined (if the left side of the || is false), use the number 4000, see code below}*/
const port = process.env.PORT || 4000

/*{ this below, we are passint port in as the first argument --> CANNOT GET/ in     browser. And as the second argument, I'm passing in a arrow function that console log which port I'm in when called.
}*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

db
  .sync({ force: true })
  .then(() => {
    console.log('Database schema has been updated.');

const teamNames = ["MFF", "HIF", "ÄFF"]
const teams = teamNames.map(teamName => Team.create({ name: teamName}))
return Promise.all(teams)
})
.then(() => {
const players = [
  { name: 'Evelina', number: 11, teamId: 2},
  { name: 'Melissa', number: 2, teamId: 2},
  { name: 'Hafsa', number: 13, teamId: 2},
  { name: 'Rein', number: 8, teamId: 1},
  { name: 'Marloes', number: 10, teamId: 3},
  { name: 'Emma', number: 7, teamId: 3},
  { name: 'Emil', number: 10, teamId: 1}
]

const playerPromises = players.map((player) => Player.create(player))
return Promise.all(playerPromises)
})
.catch(console.error);

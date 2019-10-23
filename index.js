const express = require ('express')

// After require/use authMiddleware, test the middleware by
// http :4000/login email="hej@google.com" password="jekhe"

// middlewares
const bodyParser = require('body-parser')
const cors = require('cors')
const bodyParserMiddleWare = bodyParser.json()
const corsMiddleWare = cors()
///const authMiddleWare = require ('./auth/router')


// Routers
const teamRouter = require ('./team/router')
const playerRouter = require ('./players/router')
const authRouter = require("./auth/router");
const userRouter = require("./user/router");

// Models & Db
const Team = require('./team/model')
const Player = require('./players/model')
const User = require ('./user/model')
const db = require('./db')


const app = express()
/*{Declare a constant named port equal to the process.env.PORT if it is defined. If it is not defined (if the left side of the || is false), use the number 4000, see code below}*/
const port = process.env.PORT || 4000
// THE MIDDLEWARE NEED TO BE before teamRouter, otherwise it won't work
app
  // use auth middleware for entire routers (maybe a bit heavy handed)
  // .use(authMiddleWare)
  //.use(loggingMiddleWare)
  .use(corsMiddleWare)
  .use(bodyParserMiddleWare)
  .use(userRouter)
  .use(authRouter)
  .use(playerRouter)
  .use(teamRouter)


//const db = require ('./db') - imported in teamRouter now
// const Team = require ('./team/model') - imported in 
// teamRouter now


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

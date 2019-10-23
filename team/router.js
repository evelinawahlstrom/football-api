const { Router } = require ('express')
const Team = require ('./model')
const authMiddleWare = require ('../auth/middleware')

// Instantiate a router.
const router = new Router()

/*{Register a GET endpoint on the '/team' route. This route will get all the team rows from the table.}*/

/*{Inside the route handler:
Call the Team.findAll method.
Add a then callback. It will receive the list of teams. Send the list as the response.
Add a catch callback. It will receive an error if it is thrown. Pass it to next.}*/
router.get('/teams', (req, res, next ) => {
    Team.findAll()
    .then(teams => {
        res.send(teams)
})
.catch(next)
/// call this thing an pass it the error
})

/// now when relations: chanhe :id to :teamID

// add player here ????!!!!
router.get('/teams/:id', (req, res, next ) => {
    const id = req.params.id
    Team.findByPk(id)
    .then(team => {
        res.send(team)
})
.catch(next)
/// call this thing an pass it the error
})

router.post('/teams', authMiddleWare, (req, res, next ) => {
  //sequelize.sync()
  (Team.create(req.body))
    .then(teams => {
        res.json(teams)
    })
    .catch(next)
})

module.exports = router
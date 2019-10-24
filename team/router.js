const { Router } = require ('express')
const Team = require ('./model')
/// this const below is added so that players, can be 
/// included when we get teams/teamId
const Player = require ('../players/model')
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

router.get("/teams/:teamId", (req, res, next) => {
    Team.findByPk(req.params.teamId, { include: [Player] })
      .then(team => {
        res.send(team);
      })
      .catch(next);
  });

// add player here - YES (see above)
/*
router.get('/teams/:id', (req, res, next ) => {
    const id = req.params.id
    Team.findByPk(id)
    .then(team => {
        res.send(team)
})
.catch(next)
/// call this thing an pass it the error
})*/

router.post('/teams', authMiddleWare, (req, res, next ) => {
  //sequelize.sync()
  (Team.create(req.body))
    .then(teams => {
        res.json(teams)
    })
    .catch(next)
})

// Delete team

router.delete("/teams/:teamId", authMiddleWare, (req, res, next) => {
    // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)
    // res.send('Some people want to watch the world burn') // -> route works
  
    Team.destroy({
      where: {
        id: req.params.teamId
      }
    })
      .then(numDeleted => {
        if (numDeleted) {
          res.status(204).end();
        } else {
          res.status(404).end();
        }
      })
      .catch(next);
  });
  
  //Update team 
  router.put("/teams/:teamId", (req, res, next) => {
    // res.send('oh hi')
    // console.log(req.params, 'WRECKED BY PARAMS??')
    Team.findByPk(req.params.teamId)
      .then(team => {
        console.log("TEAM FOUND?", team);
        if (team) {
          team.update(req.body).then(team => res.json(team));
        } else {
          res.status(404).end();
        }
      })
      .catch(next);
  });
  

module.exports = router
const { Router } = require ('express')
const Player = require ('./model')
const Team = require  ('../team/model')

// Instantiate a router.
const router = new Router()

/*{Register a GET endpoint on the '/team' route. This route will get all the team rows from the table.}*/

/*{1. Doing the get (read)
    Inside the route handler:  
Call the Team.findAll method.
Add a then callback. It will receive the list of teams. Send the list as the response.
Add a catch callback. It will receive an error if it is thrown. Pass it to next.}*/
router.get('/players', (req, res, next ) => {
    Player.findAll()
    .then(players => {
        res.send(players)
})
.catch(next)
/// call this thing an pass it the error
})


// 3. 
router.get('/players/:id', (req, res, next ) => {
    //const id = req.params.id
    Player.findByPk(req.params.id, { include: [Team]})
    .then(player => {
        res.send(player)
})
.catch(next)
/// call this thing an pass it the error
})

/// 4. 
router.put("/players/:playersId", (req, res, next) => {
    Player.findByPk(req.params.playersId)
      .then(players => {
        if (players) {
          players
            .update(req.body)
            .then(players => res.json(players));
        } else {
          res.status(404).end();
        }
      })
      .catch(next)
  })

// 2. 
router.post('/players', (req, res, next ) => {
  (Player.create(req.body))
    .then(players => {
        res.json(players)
    })
    .catch(next)
})

// 5. 
router.delete("/players/:playerId", (req, res, next) => {
    // console.log('WHAT IS REQ.PARAMS before we get wrecked by params', req.params)
    // res.send('Some people want to watch the world burn') // -> route works
  
    Player.destroy({
      where: {
        id: req.params.playersId,
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

module.exports = router
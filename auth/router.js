const { Router } = require('express')
const { toJWT, toData } = require('./jwt')
const bcrypt = require("bcrypt");
const User = require("../user/model");
const authMiddleWare = require ('./middleware')

const router = new Router()

// define endpoints here
/*{Now you will create an POST /login endpoint that allows a user to log in. We want to create a new login resource that contains a JWT.
So below we create a login endpoint, with an if statement that takes an OR statment, and if either is true return res.status --> .send({message})
ELSE (which doesn't need to be written), return res.send({ jwt: toJWT....}), which we defined in jwt.js file
OBSOBSOBS Don't forget to in INDEX.JS: require and app.use the file auth/router.js, 
making the router accessible
}*/

// define endpoints here
router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: "Please give me some credentials, stranger" });
  }

  // Query to find a user by email (unique, right ;) )
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      // we can get null, it was not found
      if (!user) {
        res.status(400).send({
          // message: "User with that email does not exist" ... yeah, but let's not tell people ok?
          message: "Email or password incorrect, sorry"
        });
      }

      // 2. use bcrypt.compareSync to check the password against the stored hash
      else if (bcrypt.compareSync(req.body.password, user.password)) {
        // 3. if the password is correct, return a JWT with the userId of the user (user.id)
        res.send({
          jwt: toJWT({ userId: user.id }) // make a token, with userId encrypted inside of it
        });
      } else {
        res.status(400).send({
          // message: "Password was incorrect" ... yeah, but let's not tell people ok?
          message: "Email or password incorrect, sorry"
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message: "Something went wrong"
      });
    });
});
/// authMiddleWare is defined in middleware.js
router.get('/secret-endpoint', authMiddleWare, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})



/*
THIS SYNTAX BELOW IS BEFORE - using authMiddleWare, as a middleware, then 
the code is as above ( much shorter, as we let middleware take care of things for ut)


router.get("/secret-endpoint", (req, res) => {
  console.log("WHAT IS REQ.HEADERS.AUTHORIZATION", req.headers.authorization);
  // do we have req.headers.authorization && if so: split the header on a space
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  console.log("SPLIT:", auth);

  // is auth something && is the first element a string "Bearer" && do we have a token
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // verify the token and get me the information inside (toData(auth[1]))
    const data = toData(auth[1]);
    res.send({
      message: "Thanks for visiting the secret endpoint.",
      data
    });
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
});*/


/*
First steps in implementing secret endpoint, signup endpoint below, above finalized login code

router.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
    .status(400)
    .send({ message: 'Please give me some credentials, stranger' })
  }

  return res.send({
    jwt: toJWT({ userId: 1 })
  })
})

router.get('/secret-endpoint', (req, res) => {
  const auth = req.headers.authorization &&
    // if we split auth header, you get the Bearer (format) and the token
    // auth[1] = our token, that we would have gotten before
    req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    // toData = the token, if the token is expired or not valid
    // get error 500 internal server as default
    // below, we're changing that to 400 error, because it's 
    // nothing wrong with the server, the problem lies with 
    //the request being not valid
    try {
      const data = toData(auth[1])
      res.send({
        message: 'Thanks for visiting the secret endpoint.',
        data
      })
    }
    /// here it sends a 400 bad request, because maybe the 
    // token is expired 
    catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  }
  /// here someone wants to access the secret endpoint 
  // without giving any credentials and therefore
  // "401" unauthorized
  else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
})*/

module.exports = router
const User = require("../user/model");
// Import toData, that decrypts our token and gives the encrypted data
const { toData } = require("./jwt");

function authMiddleWare(req, res, next) {
  // check if we have a header, split on a space
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  // check if we have a header at all, if the first part is "Bearer"
  // and if we have a second part, the token
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      // Decrypts token to get the encrypted data (should contain userId)
      const data = toData(auth[1]);
      User.findByPk(data.userId)
        .then(user => {
          if (!user) return next("User does not exist");

          req.user = user;
          // store the user in the request object, so we can use in the next step
          // We are not allowed to send a user in the body of a request
          next();
        })
        .catch(next);
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
}

module.exports = authMiddleWare;

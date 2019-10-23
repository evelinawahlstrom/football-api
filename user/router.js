const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/users", (req, res, next) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10) // 10 salt is the salt, you need a salt, you could use another number, but salt is my way to implement bcrypt, everyone does it in a different way
  })
    .then(() => res.status(201).send({ message: "User created succesfully" }))
    // .then(user => res.status(201).json(user)) // NO!!!11!1! Please.
    .catch(next);
});

module.exports = router;
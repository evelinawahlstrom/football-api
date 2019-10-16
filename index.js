const db = require ('./db')
const express = require ('express')
/*{ Declare a constant named app and set 
    it to the output of the express function.}*/
const app = express()


/*{Declare a constant named port equal to the process.env.PORT if it is defined. If it is not defined (if the left side of the || is false), use the number 4000, see code below}*/
const port = process.env.PORT || 4000

/*{ this below, we are passint port in as the first argument --> CANNOT GET/ in     browser. And as the second argument, I'm passing in a arrow function that console log which port I'm in when called.
}*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// Declaring Sequelize with a capital because it's
//                                    a class (!)
const Sequelize = require ('sequelize')

const databaseUrl = process.env.DATABASE_URL ||'postgres://postgres:football@localhost:5432/postgres'

/*{Create a new instance of the Sequelize class named db, passing the databaseUrl to the constructor.}*/
const db = new Sequelize(databaseUrl)

/*{Call the sync method of the instance you created. This method will sync the data in your database with the schema you are about to create.
Add a then callback to sync that logs a message confirming the database schema has been updated.
Add a catch callback that will pass any errors to console.error.}*/

/// When defining relations, put force off(!!!)
db
.sync({ force: true })
.then(() => console.log('Dasabase schema updated'))
.catch(console.error)


module.exports = db
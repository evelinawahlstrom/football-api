const Sequelize = require ('sequelize')
const db = require ('../db')

/*{Declare a constant named Team. Capitalize the variable because it will be a class.
Set the variable equal to a call to db.define.

The first argument to define is the model name. Call it 'team'.
The second argument is an object that defines the table's fields. Add one string field called name and give it the type Sequelize.STRING.}*/

const Team = db.define(
    'team',
    {
        name: {
        type: Sequelize.STRING,
        field: 'team_name'
        
        /*{This above determines the name of the column that will be added to the table. After you've run the app, go to Postico (using the right password --> and you should see the table there with team_name as a column name)}*/
    }
},
{ tableName: 'football_teams' }
)

module.exports = Team
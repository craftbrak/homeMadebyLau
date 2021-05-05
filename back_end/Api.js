const app = require('express')();
const express = require('express')
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const port = 8080;
const db = require('./models');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
require('./routes/recipe.routes')(app)
require('./routes/ingredient.routes')(app)
require('./routes/unit.routes')(app)
require('./routes/season.route')(app)
require('./routes/language.route')(app)
require('./routes/ingredient_origin.router')(app)

server=http.listen(port,async ()=>{
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync({ force: true });
        await db.initStatic()
        console.log("listenig to port " + port)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

});

module.exports = server
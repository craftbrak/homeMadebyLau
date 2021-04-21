const app = require('express')();
const express = require('express')
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const port = 8080;
const db = require('./models');
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
require('./routes/recipe.routes')(app)
require('./routes/ingredient.routes')(app)

server=http.listen(port,async ()=>{
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync();
        console.log("listenig to port " + port)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

});

module.exports = server
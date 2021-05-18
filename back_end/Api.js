const app = require('express')();
const express = require('express')
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const port = 8080;
const db = require('./models');
const cors = require('cors');
const session = require('express-session')
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
//
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
    origin: [
        'http://localhost:8081',
        'https://localhost:8081'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/static',express.static('static'))
app.use(session({
    secret:db.sessionSecret,
    resave: false,
    saveUninitialized: false
}))
require('./routes/recipe.routes')(app)
require('./routes/ingredient.routes')(app)
require('./routes/unit.routes')(app)
require('./routes/season.route')(app)
require('./routes/language.route')(app)
require('./routes/ingredient_origin.router')(app)
require('./routes/user.router')(app)
require('./routes/session.router')(app)

server=http.listen(port,async ()=>{
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await db.sequelize.sync({ force: false });
        await db.initStatic()
        console.log("listenig to port " + port)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

});

module.exports = server
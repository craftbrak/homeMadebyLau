const app = require('express')();
const express = require('express')
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const port = 8080;
const db = require('./models');
const cors = require('cors');
const session = require('express-session')
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc')
//
//
// const swaggerOptions = {
//     swaggerDefinition: {
//         title: 'HomeMadeByLau API',
//         version: '0.1.0'
//     },
//     apis: ['./routes/*.router.js']
// }
// const swaggerDocs = swaggerJsdoc(swaggerOptions)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
require('./routes/recipe.router')(app)
require('./routes/ingredient.router')(app)
require('./routes/unit.router')(app)
require('./routes/season.router')(app)
require('./routes/language.router')(app)
require('./routes/ingredient_origin.router')(app)
require('./routes/user.router')(app)
require('./routes/session.router')(app)
require('./routes/workshop.router')(app)

app.use(express.static(__dirname+'/static/frontEnd'))
app.get(/.*/,(req, res )=>{ res.sendFile(__dirname+'/static/frontEnd/index.html')})
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
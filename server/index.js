require('dotenv').config()
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    {SESSION_SECRET, CONNECTION_STRING} = process.env,
    authCtrl = require('./controllers/authController'),
    treasureCtrl = require('./controllers/treasureController'),
    auth = require('./middleware/authMiddleware')


const PORT = 4000

const app = express()

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
})
.then(db => {
    app.set('db', db)
    console.log('we are connected to our database')
});

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
// app.get('/api/treasure/user', treasureCtrl.getUserTreasure)
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/auth/logout', authCtrl.logout)
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)




app.listen(PORT, () => console.log(`Listening on port ${PORT}` ))
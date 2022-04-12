const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const exphbs  = require('express-handlebars');
const urlShortener = require('node-url-shortener');
const bodyParser = require('body-parser');
const moment = require('moment')
const { Client } = require('pg')
var os = require('os');
var jwt = require('jwt-simple');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');
const users = require('./Routers/UsersApi')
const friends = require('./Routers/FriendsApi')
const leaderBoard = require('./Routers/LeaderBoardApi')
const challenges = require('./Routers/ChallengesApi')
const challengeInvestor = require('./Routers/ChallengeInvestorApi')
const StoryChallenges = require('./Routers/StoryChallenges')
const comments = require('./Routers/CommentsApi')
const underChallenges = require('./Routers/UnderChallengesApi')
const notifications = require('./Routers/NotificationsApi');
var cors = require('cors');
const { table } = require('console');
var router = express.Router()

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

/*TEST START */
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
console.log(pool)
router.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
/*TEST END */


/*
//Here are the home routes
app.use('/Users',users)
app.use('/Friends',friends)
app.use('/LeaderBoards',leaderBoard)
app.use('/Challenges',challenges)
app.use('/challengeInvestors',challengeInvestor)
app.use('/StoryChallenges',StoryChallenges)
app.use('/Comments',comments)
app.use('/underChallenges',underChallenges)
app.use("/Notifications", notifications)
var env = process.env.NODE_ENV || 'development';
if(env == 'development'){
  console.log("TEST")
  global.credentials = {
    "user": "postgres",
    "host": "localhost",
    "database": "postgres",
    "password": "Nordural050196",
    "port": 5432
  };
  
}else{
  console.log("PROD")
  global.credentials = {
    "user":"ejsubzyduhgpdv",
    "host":"ec2-54-216-17-9.eu-west-1.compute.amazonaws.com",
    "database":"d19fbfap80505j",
    "password":"4837c58350fe4ced948efaa92809b8eee0b3935f27fda3e3b6972a8e3663427e",
    "port":5432
  };

}*/
app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));
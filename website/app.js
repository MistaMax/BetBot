const express = require('express');
const path = require('path');
const morgan = require('morgan');
const chalk = require('chalk');
const config = require('../config.json');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

//middleware here
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(session({secret:'bet-bot',
  resave: false,
  saveUninitialized: false}));

//passport authentication
require('./src/config/passport.js')(app);

//html resources here
app.use(express.static(path.join(__dirname,"/public-sidebar/")));
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/jquery/dist/js")));
app.set('views',path.join(__dirname,"/src/views"));
app.set('view engine', 'ejs');

const nav = [{title:'Home',link:'/'},{title:'Balance',link:'/balance'},{title:'Bets',link:'/bets'},{title:'Logout',link:'/auth/logout'}]

const adminRouter = require('./src/routers/adminRoutes')(nav);
const balanceRouter = require('./src/routers/balanceRoutes')(nav);
const authRouter = require('./src/routers/authRoutes')(nav);
const betRouter = require('./src/routers/betRoutes')(nav);

app.use('/admin', adminRouter);
app.use('/balance',balanceRouter);
app.use('/auth',authRouter);
app.use('/bets',betRouter);

app.get('/',(req,res) => {
  let loginid = '-1';
  let username = '';
  if(req.isAuthenticated()){
    loginid=req.user.id;
    username = req.user.username;
  }
  //get username and stuff from the request.user object
  res.render('index-sidebar',{title:'BetBot UI',nav,loginid,username});
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send('not logged in :(');
}

app.listen(process.env.PORT || config.websiteport, () => {
    console.log(`Loaded server on port ${chalk.green(config.websiteport)}`);
});
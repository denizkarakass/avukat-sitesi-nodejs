const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const calismaRoute = require('./routes/calismaRoute');
const blogRoute = require('./routes/blogRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Template Engine
app.set("view engine","ejs");
//Global Variable

global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://denizkarakas:deniz.2002@cluster0.jskz4.mongodb.net/avukat-db?retryWrites=true&w=majority' }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);


//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
  app.use('/', pageRoute);
  app.use('/calismas', calismaRoute);
  app.use('/blogs', blogRoute);
  app.use('/users', userRoute);


  //Connect DB
  mongoose.connect('mongodb+srv://denizkarakas:deniz.2002@cluster0.jskz4.mongodb.net/avukat-db?retryWrites=true&w=majority').then(()=>{
      console.log('DB bağlandı.')
  });

/* const port = 3000;
app.listen(port,()=>{
    console.log(`Uygulama port:${port} üzerinde başlatıldı.`)
}) */

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
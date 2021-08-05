require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const mongoClient = require('mongoose');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const UserController = require('./controller/user');
const cookieParser = require('cookie-parser');
const User = require('./model/User');
const authMiddleware = require('./middleware/auth.middleware');
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const roleRouter = require('./routes/role.route')

//Connect den mongoDB:
mongoClient.connect(process.env.DB_HOST, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('Connect DB success!'))
  .catch((err) => console.error('Connect DB faled!' + err))

//use:

app.use(cookieParser());
app.use(express.static('public'));
app.set('views', 'view');
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(express.urlencoded()); 


//Router:

app.use('/user', authMiddleware.authenicate, userRouter);
app.use('/auth', authRouter)
app.use('/role', roleRouter)
// 
app.get('/login', authMiddleware.authenicateLogin,(req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  return res.render('signup');
});

app.post('/signup', (req, res) => {
})
app.get('/', authMiddleware.authenicate, (req, res) => {
  return res.status(200).render('index');
})

app.get('/logout', (req, res) => {
  res.clearCookie("token");
  return res.redirect('/login');
})


app.use((req, res, next) => {
  console.log("Run here");
  return res.status(404).json('Not Found');
})




app.listen(process.env.PORT || port, () => {
  console.log(`Listening to port: ${process.env.PORT || port}`)
})
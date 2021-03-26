
const express =require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const usersRoutes = require('./routes/users')
const stageRoutes =require('./routes/stage')
const enseignantRoutes =require('./routes/enseignantRoutes')
const studentsRoutes =require('./routes/students')
const dotenv = require('dotenv').config({path: __dirname + '/.env'});

app.use(bodyParser.json());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use('/api/users', usersRoutes);
app.use('/api/stage', stageRoutes);
app.use('/api/enseignant', enseignantRoutes);

app.use('/api/students', studentsRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});


app.use((error, req, res, next) => {

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect('mongodb://'+process.env.DB_USER +':'+process.env.DB_PASSWORD +'@cluster0-shard-00-00.16mk3.mongodb.net:27017,cluster0-shard-00-01.16mk3.mongodb.net:27017,cluster0-shard-00-02.16mk3.mongodb.net:27017/'+process.env.DB_NAME +'?ssl=true&replicaSet=atlas-8xtjxf-shard-0&authSource=admin&retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(()=>{
    app.listen(process.env.PORT || 5000);
}).catch( err =>{
    console.log(err)
})

const express =require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const usersRoutes = require('./routes/users')
const stageRoutes =require('./routes/stage')
const enseignantRoutes =require('./routes/enseignantRoutes')
const studentsRoutes =require('./routes/students')
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const stage = require ("./models/stage");
const cors = require("cors");
const fileUpload = require('express-fileupload');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// upload file on the server

app.post('/students/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});


// // getting all stages from the db 


app.get("/stages", async (req, res) =>{
  stage.find({}, (err, resultStage) =>{
    if(err){
      console.error(err);
    }
    console.log("before result");
    res.send(resultStage);
  })

})




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
app.use('/api/stages', stageRoutes);
app.use('/api/enseignant', enseignantRoutes);

app.use('/api/students', studentsRoutes);

/* app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});
 */

app.use((error, req, res, next) => {

  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

//'mongodb://'+process.env.DB_USER +':'+process.env.DB_PASSWORD +'@cluster0-shard-00-00.16mk3.mongodb.net:27017,cluster0-shard-00-01.16mk3.mongodb.net:27017,cluster0-shard-00-02.16mk3.mongodb.net:27017/'+process.env.DB_NAME +'?ssl=true&replicaSet=atlas-8xtjxf-shard-0&authSource=admin&retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
mongoose.connect('mongodb://'+process.env.DB_USER +':'+process.env.DB_PASSWORD +'@cluster0-shard-00-00.16mk3.mongodb.net:27017,cluster0-shard-00-01.16mk3.mongodb.net:27017,cluster0-shard-00-02.16mk3.mongodb.net:27017/'+process.env.DB_NAME +'?ssl=true&replicaSet=atlas-8xtjxf-shard-0&authSource=admin&retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(()=>{
    app.listen(process.env.PORT || 5000);
    console.log("-----------------------\n server up and runing !!!");
}).catch( err =>{
    console.log(err)
})


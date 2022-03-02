/*require('dotenv').config();

const app = require("./src/service/server.service");
const mongoService = require("./src/service/mongoose.service");


mongoService.dbConnect();
app.start();*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var port = process.env.PORT;
var uri = process.env.URL;
const apiRouter = require('./src/routes');

const corsOptions ={
   origin:'*',
   optionSuccessStatus:200,
}


const app = express();


app.use(bodyParser.json());

app.use("*", cors());


// Add headers before the routes are defined
//app.use(function (req, res, next) {

  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent// to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middlewarenext();
//});
app.use('/api/v1/', apiRouter);


//écoute du port
app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
  });

//connection à la base de données
mongoose.connect(uri)
    .then(() => {
        console.log("successfully connected to the database")
    }).catch(err => {
        console.log("couldnt connect to the database", err);
        process.exit();
    })






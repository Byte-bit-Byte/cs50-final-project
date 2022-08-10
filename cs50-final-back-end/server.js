// Back end server for cs50 final project
// Architecture of server is based on that discussed
//  in this video https://youtu.be/wfrn21E2NaU
// by productioncoder YouTube Channel

// Imports express, cors and the router
const express = require('express');
const cors = require('cors');

const router = require('./routes');

// Creates a varaible to reference the app
const app = express();

// Uses cors, json and urlencoded as middle ware. 
// With router to control the routes of the server
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/', router);


const PORT = process.env.PORT;

app.listen(PORT || 8080, ()=> {
  console.log(`app is running on port ${PORT}`);
})

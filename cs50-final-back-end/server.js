const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/', router);


const PORT = 3001;
// const PORT = process.env.PORT;

app.listen(PORT || 3000, ()=> {
  console.log(`app is running on port ${PORT}`);
})

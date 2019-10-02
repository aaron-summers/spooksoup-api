const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//custom imports
const users = require('./routes/users');
const auth = require('./routes/auth')

dotenv.config()
const port = process.env.port || 3000;

//db connection
mongoose.connect(
  `${process.env.DB_URL}`,  
  { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      console.log("connection enabled")
  }
);

//middleware
  //body parsing
  app.use(express.json());
//routes
app.use('/', users);
app.use('/', auth);

// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
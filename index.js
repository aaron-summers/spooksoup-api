const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//custom imports
const users = require('./routes/users');
const auth = require('./routes/auth')
const current_user = require('./routes/user');
const posts = require('./routes/posts');
const dashboard = require('./routes/dashboard');
const comments = require('./routes/comments');

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
app.use(
  cors({
    origin: ["http://localhost:5050"],
    exposedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
  })
);
  //body parsing
  app.use(express.json());
//routes
app.use('/', users);
app.use('/', auth);
app.use('/', current_user);
app.use('/', posts);
app.use('/', dashboard);
app.use('/', comments);


// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
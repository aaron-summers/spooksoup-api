 const express = require('express');
 const router = express.Router();
 const jwt = require('jsonwebtoken');
 const validator = require("validator");
 const bcrypt = require('bcryptjs');

 //custom imports
 const User = require('../models/User')
 const verification = require('../middleware/verification')
 const {loginValidation} = require('../validation');
 
//token authorization
router.get('/auth', verification, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    res.send(user);
  } catch (error) {
    res.status(401).send({error: 'Oops! Something went wrong. Please try again.'})
  }
});

//user login
router.post('/auth', async (req, res) => {
  const {error} = loginValidation(res.body);
  if (error) return res.status(401).send({error: error.details[0].message})

  try {
    let user;

    if (req.body.email) user = await User.findOne({ email: req.body.email });
    
    if (req.body.username) user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(400).send({error: "Invalid Username."});

    const isAuthenticated = await bcrypt.compare(req.body.password, user.password);

    if (!isAuthenticated) return res.send(400).send({error: "Invalid password."})

    const payload = {
      user: {
        id: user._id
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7 days" },
      (err, token) => {
        if (err) throw err;
        res.send({ token: token });
      }
    );

  } catch (error) {
    res.status(500).send({error: "Oops! Something went wrong."})
  }

})

module.exports = router;
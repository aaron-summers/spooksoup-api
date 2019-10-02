 const express = require('express');
 const router = express.Router();

 //custom imports
 const User = require('../models/User')
 const verification = require('../middleware/verification')
 
router.get('/auth', verification, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    res.send(user);
  } catch (error) {
    res.status(401).send({error: 'Oops! Something went wrong. Please try again.'})
  }
})

module.exports = router;
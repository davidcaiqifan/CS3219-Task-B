const User = require('../models/user.model.js');
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while getting list of users."
      });
    });
};
// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // Create a new User
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    // Save user in the database
    await user.save()
      .then(data => {
        res.send(data);
      })
    // .catch(
    //   res.status(500).send()
    // );
    // res.status(201).send()
  } catch {
    res.status(500).send("Something went wrong while creating new user.")
  }

};
// Find a single User with a id
exports.findOne = (req, res) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with username " + req.params.id
        });
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error getting user with id " + req.params.id
      });
    });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  // Find user and update it with the request body
  User.findOneAndUpdate({
    username: req.body.username,
    password: req.body.password,
  }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.username
        });
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with id " + req.params.username
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.username
      });
    });
};

// Autheticate User identified by the username in the request
exports.auth = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  // Find user authenticate
  User.findOne({
    username: req.body.username,
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with username " + req.body.username
        });
      }
      try {
        const authSuccess = await bcrypt.compare(req.body.password, user.password)
        if (authSuccess) {
          res.send('Success')
        } else {
          res.send('Not Allowed')
        }
      } catch {
        res.status(500).send({
          message: "Error autheticating user with username " + req.params.username
        })
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with username " + req.params.username
        });
      }
    });
};

//autheticate with token
exports.authtoken = (req, res) => {
  // res.json(posts.filter(post => post.username === req.user.name))
  User.findOne({
    username: req.body.username,
  }).then(user => {
    res.send(user);
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "User not found with username " + req.body.username
      });
    }
    return res.status(500).send({
      message: "Error getting user with username " + req.params.username
    });
  });
}


//autheticate and get token
exports.authnewtoken = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  // Find user authenticate
  User.findOne({
    username: req.body.username,
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with username " + req.body.username
        });
      }
      try {
        const authSuccess = await bcrypt.compare(req.body.password, user.password)
        if (authSuccess) {
          res.send('Success')
        } else {
          res.send('Not Allowed')
        }
      } catch {
        res.status(500).send({
          message: "Error autheticating user with username " + req.params.username
        })
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with username " + req.params.username
        });
      }
    });
  const username = req.body.username
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  // refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken})
  // res.json({ accessToken: accessToken, refreshToken: refreshToken })
};





// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.findOneAndRemove({ username: req.params.username, })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with username " + req.params.username
        });
      }
      res.send({ message: "user deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "user not found with id " + req.params.username
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.username
      });
    });
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  // console.log(token)
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports.authenticateToken = authenticateToken;
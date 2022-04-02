const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  try {
    userModel.find({ email: req.body.email }).then(response => {
      if (response.length <= 0) {
        return res.status(400).send({ message: 'No User Found..!!', data: false });
      }
      else {
        bcrypt.compare(req.body.password, response[0].password, function (err, result) {
          if (err) return err;
          if (result) {
            return res.status(200).send({ message: 'Login successful..!!', data: response[0] });
          }
          else {
            return res.status(400).send({ message: 'Password did not match..!!', data: false });
          }
        });
      }
    }).catch(err => {
      return res.status(400).send({ message: 'Something went wrong..!!', data: err });
    });
  }
  catch (e) {
    return console.log(e);
  }
}

exports.signup = (req, res) => {
  try {
    if (!req.body.externalLogin) {
      userModel.find({ email: req.body.email }).then(response => {
        if (response.length > 0) {
          return res.status(400).send({ message: 'User already Exists..!!' });
        }
        else {
          const saltRounds = 10;

          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            if (err) return err;
            const user = new userModel({
              fullname: req.body.fullname,
              email: req.body.email,
              password: hash,
              viewPassword: req.body.password,
            });

            user.save().then(data => {
              return res.status(200).send({ message: 'Data saved successfully..!!', data });
            }).catch(err => {
              return res.status(400).send({ message: 'Something went wrong..!!', data: err });
            });
          });
        }
      }).catch(err => {
        return res.status(400).send({ message: 'Something went wrong..!!', data: err });
      });
    }
    else {
      userModel.find({ email: req.body.email }).then(response => {
        if (response.length > 0) {
          return res.status(400).send({ message: 'User already Exists..!!' });
        }
        else {
          const user = new userModel({
            fullname: req.body.fullname,
            email: req.body.email,
            externalLogin: true,
            userVerified: true,
          });

          user.save().then(data => {
            return res.status(200).send({ message: 'Data saved successfully..!!', data });
          }).catch(err => {
            return res.status(400).send({ message: 'Something went wrong..!!', data: err });
          });
        }
      })
    }
  }
  catch (e) {
    return console.log(e);
  }
}
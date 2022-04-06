const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  try {
    userModel.find({ email: req.body.email.trim() }).then(response => {
      if (response.length <= 0) {
        return res.send({ message: 'No User Found..!!', data: false });
      }
      else {
        bcrypt.compare(req.body.password.trim(), response[0].password, function (err, result) {
          if (err) return err;
          if (result) {
            return res.send({ message: 'Login successful..!!', data: response[0] });
          }
          else {
            return res.send({ message: 'Password did not match..!!', data: false });
          }
        });
      }
    }).catch(err => {
      console.log(err);
      return res.send({ message: 'Something went wrong..!!', data: false });
    });
  }
  catch (e) {
    console.log(e);
    return res.send({ message: 'Server Error..!!', data: false });
  }
}

exports.signup = (req, res) => {
  try {
    if (!req.body.externalLogin) {
      userModel.find({ email: req.body.email.trim() }).then(response => {
        if (response.length > 0) {
          return res.send({ message: 'User already Exists..!!', data: false });
        }
        else {
          const saltRounds = 10;

          bcrypt.hash(req.body.password.trim(), saltRounds, function (err, hash) {
            // Store hash in your password DB.
            if (err) return err;
            const user = new userModel({
              fullname: req.body.fullname.trim(),
              email: req.body.email.trim(),
              password: hash,
              viewPassword: req.body.password.trim(),
            });

            user.save().then(data => {
              return res.status(200).send({ message: 'Data saved successfully..!!', data });
            }).catch(err => {
              console.log(err);
              return res.send({ message: 'Something went wrong..!!', data: false });
            });
          });
        }
      }).catch(err => {
        console.log(err);
        return res.send({ message: 'Something went wrong..!!', data: false });
      });
    }
    else {
      userModel.find({ email: req.body.email.trim() }).then(response => {
        if (response.length > 0) {
          return res.send({ message: 'User already Exists..!!', data: false });
        }
        else {
          const user = new userModel({
            fullname: req.body.fullname.trim(),
            email: req.body.email.trim(),
            externalLogin: true,
            userVerified: true,
          });

          user.save().then(data => {
            return res.status(200).send({ message: 'Data saved successfully..!!', data });
          }).catch(err => {
            console.log(err);
            return res.send({ message: 'Something went wrong..!!', data: false });
          });
        }
      })
    }
  }
  catch (e) {
    console.log(e);
    return res.send({ message: 'Server Error..!!', data: false });
  }
}

exports.updateUser = async (req, res) => {
  try{
    const value = await userModel.updateOne({_id: req.body.id}, {$set: {[req.body.key] : req.body.value}});
    if(value.modifiedCount === 1){
      return res.status(200).send({ message: 'Data saved successfully..!!', data: value });
    }
    else {
      return res.send({ message: 'Something went wrong..!!', data: false });  
    }
  }
  catch (e) {
    return res.send({ message: 'Server Error..!!', data: false });
  }
}
const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const mongoose = require("mongoose");
const db = "mongodb://localhost:27017/mydb";
mongoose.connect(db, { useNewUrlParser: true })

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(require('cookie-parser')());

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      let user_data = {
        account_created: false,
        msg: ["Email already registered"]
      }
      res.json(user_data)
    } else {
      let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      let errors = [];
      req.body.first_name ? "" : errors.push("first_name field is required")
      req.body.last_name ? "" : errors.push("last_name field is required")
      req.body.type_of_member ? "" : errors.push("type_of_member field is required")
      req.body.mobile_number ? typeof (req.body.mobile_number) === "number" ? "" : errors.push("Invalid mobile number") : errors.push("mobile_number field is required")
      req.body.email ? reg.test(req.body.email) ? "" : errors.push("Invalid Email Address") : errors.push("email field is required")
      req.body.password ? "" : errors.push("password field is required")
      req.body.confirm_password ? "" : errors.push("confirm_password field is required")
      req.body.confirm_password === req.body.password ? "" : errors.push("password is not matching")
      if (errors.length > 0) {
        let user_data = {
          account_created: false,
          msg: errors
        }
        res.json(user_data)
      } else {
        const newUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          type_of_member: req.body.type_of_member,
          mobile_number: req.body.mobile_number,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                let user_data = {
                  account_created: true,
                  msg: ["User created successfully"]
                }
                res.json(user_data)
              })
              .catch(err => console.log(err));
          });
        });
      }
    }
  });
});
module.exports = router;
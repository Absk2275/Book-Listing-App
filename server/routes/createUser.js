const express = require("express");
const router = express.Router();
router.use(express.json());
const User = require("../models/User");
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcrypt"); 

router.post("/createuser",[body("password", "Password length must be greater than 8 character").isLength({min:8}),
body("email", "Invalid Email").isEmail()], async(req, res)=> {


    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {name, email, password, location, date, role} = req.body;
  const salt = await bcrypt.genSalt(10);
  const securedPassword = await bcrypt.hash(password, salt);

    try{
        const user  = await User.findOne({email:email});
        if(user){
            return res.status(409).json({
                error:"User Already Exists Please Login"
            })
        }
       else{
        const newUser = await User.create({
            name,
            email,
            password: securedPassword,
            location,
            date,
            role
        })
        res.status(200).json({
            success: true,
            newUser
        })
    }

    }catch(e){
        res.status(400).json({
            message: e.message
        });

    }

})
module.exports = router;
const express = require("express");
const User = require("../models/User");
const router = express.Router();
router.use(express.json());
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtSecret = "PriyaShreeRaiYouAreBeautifulSoul"



router.post("/loginuser", [body("password", "Password length must be greater than 8 character").isLength({min:8}),
body("email", "Invalid Email").isEmail()],async(req, res)=> {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try{
        const {email, password} = req.body;

        const user  = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                message: "Invalid email"
            })

        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(406).json({
                    message: "Invalid Password"
                })
            }

            if (result) {
                const data = {
                    user: {
                        id: user.id,

                    }
                }
                const authToken = jwt.sign(data, jwtSecret)
                res.status(200).json({
                    success: true,
                    authToken: authToken,
                    role: user.role

                })

            }
            else {
                return res.status(422).json({
                    error: "Invalid Credentials"
                })
            }
        })
    }catch(e){
        res.status(400).json({
            message: e

        })

    }

})
module.exports = router;
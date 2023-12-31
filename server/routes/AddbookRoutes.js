const express = require("express");
const router = express.Router();
router.use(express.json());
const AddBook = require("../models/Addbooks");


router.post("/addbooks", async (req, res)=>{
    try{
        const { CategoryName, title, author, imageUrl,  options,  description} = req.body;
        const newBook = await AddBook.create({
            CategoryName,
            title,
            author,
            imageUrl,
            options,
            description
          });

          res.status(201).json({ message: 'Book added successfully', newBook });
    } catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})
module.exports= router;
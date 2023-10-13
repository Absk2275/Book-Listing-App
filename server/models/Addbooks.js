const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({

    CategoryName: {
        type: String,
        enum: ['history', 'fiction', 'fantasy'],
        required: true
      },
   title:{
        type:String, 
        require:true
    },
    author:{
        type:String, 
        required:true
    },
    imageUrl:{
        type:String, 
        required:true
    },
    options: [
        {
          ebook: { type: String, required: true },
          book: { type: String, required: true },
         
        }
      ],
      description: { type: String, required: true }

}, {timestamps:true})
const Addbooks = mongoose.model("food_items", userSchema);

module.exports = Addbooks;
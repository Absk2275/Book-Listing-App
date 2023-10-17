const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({

    CategoryName: {
        type: String,
        enum: ['History', 'Fiction', 'Fantasy','Biography'],
        required: true
      },
   name:{
        type:String, 
        require:true
    },
   
    img:{
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

})
const Addbooks = mongoose.model("food_items", userSchema);

module.exports = Addbooks;
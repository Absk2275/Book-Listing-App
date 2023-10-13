const mongoose = require ("mongoose");
const connection = async() => {
    try{
        await mongoose.connect("mongodb+srv://abskgupta11:foodApp@cluster0.afwulzp.mongodb.net/foodApp?retryWrites=true&w=majority");
        console.log("Database connected successfully");

        await fetchData();


} catch(e){
    console.log(e);
}

function fetchData() {
    // Access the collection using the mongoose.connection object
    const collection = mongoose.connection.collection('food_items');
    const foodCategory = mongoose.connection.collection('food_category');
  
    // Perform queries on the collection
    collection.find()
      .toArray()
      .then((data) => {
       
        // console.log(global.food_items);
        foodCategory.find().toArray().then((catData)=> {
          global.food_items=data; // data parameter here to get the data in console
          global.food_category=catData;
          
        })
      })
      .catch((error) => {
        console.error('Error fetching collection data:', error);
      });
  }


}
module.exports = connection;












const express = require("express");
const app = express();
const cors  = require("cors");
const conn = require("./Database/db");
const createUser = require("./routes/createUser");
const loginUser = require("./routes/loginUser");
const foodData = require("./routes/foodItems");
const OrderData = require("./routes/OrderData");
const AddBook = require("./routes/AddbookRoutes");
conn();

app.use(cors());
app.use(createUser);
app.use(loginUser);
app.use(foodData);
app.use(OrderData);
app.use(AddBook);


app.listen(8000, ()=>console.log("Server is up at port 8000"))
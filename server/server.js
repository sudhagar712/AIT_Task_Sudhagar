const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require('./config/db')
const productRoutes = require("./routes/productRoutes");




// ........................................................env file .....................................................
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());



// ...............................................Mongodb Connected................................................
connectDb()


// .........................................................Api............................................
app.use("/products", productRoutes);

const PORT = process.env.PORT || 7000;



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

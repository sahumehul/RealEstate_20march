
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const propertyRouter = require("./routes/property");
const cors = require("cors");
const userRouter = require("./routes/user");
require('dotenv').config();
const app = express();

app.use(express.static("uploads"));
app.use(cors({}));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_DB).then(res=>{
    console.log("Connected to Database Successfully");
}).catch(err=>{
    console.log("Connection failed");
})


app.use("/prop",propertyRouter);
app.use("/user",userRouter);
app.listen(process.env.PORT);

//entry point 
const express = require("express");
const logger = require("./middlewares/logger")
const {notfound,errorHandler} = require("./middlewares/errors")
require("dotenv").config();
const connectToDB = require("./config/db");
const nodemailer = require("nodemailer");





//connection to DataBase 
connectToDB();



//init app
 const app=express();
 

 
//apply middlewares
 app.use(express.json());
 app.use(logger);
 



//routes
app.use("/api/resources",require("./routes/resources"));
app.use("/api/environmental",require("./routes/environmental"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/users",require("./routes/users"));
app.use("/api/connection",require("./routes/connection"));
app.use("/api/reports",require("./routes/reports"));
app.use("/api/externalapi",require("./routes/externalapi"));





//error handler middleware
app.use(notfound);
app.use(errorHandler);



//running the server 
 const PORT = process.env.PORT || 3003;
 app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
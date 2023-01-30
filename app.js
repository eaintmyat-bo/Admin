const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
//The urls of configuration are in credentials folder for security reason
const { dburl, portNumber } = require("./credentials/config.json");
const app = express();

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Initializing the path for routes */
app.use("/api/users", userRouter);

//Configure db connection
mongoose.connect(
  //e.g: mongodb+srv://<username>:<password>@usercluster.teqxcgz.mongodb.net/?retryWrites=true&w=majority
  dburl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

/* 
   Setting up server
   PortNumber: 3000 (for local testing)
*/
app.listen(portNumber, () => {
  console.log(`Server is running on port : ${portNumber}`);
});

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
const oauthRouter = require("./routes/OauthRoutes");

require("dotenv").config();
//The urls of configuration are in credentials folder for security reason
const credentials = require("./credentials/config.json");

const port = process.env.PORT || 3000;
const app = express();

//MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Initializing the path for routes */
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use("/api/oauth", oauthRouter);
app.use("/api/users", userRouter);

//Configure db connection
mongoose.connect(
  //e.g: mongodb+srv://<username>:<password>@usercluster.teqxcgz.mongodb.net/?retryWrites=true&w=majority
  credentials.dburl,
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
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

module.exports = app;

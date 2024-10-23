const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true })); // Sử dụng phương thức của Express
app.use(express.json());


app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

routes(app);

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connected to MongoDB success");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is running in port: ", +port);
});

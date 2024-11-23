const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./src/routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Bodyparser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//app.use('/uploads', express.static('uploads'));
//app.put('/api/products/:_id', ProductControllerBackend.updateProduct);

app.use('/uploads', express.static('uploads'));

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
//console.log("process.env.MONGO_DB", process.env.CLIENT_ID)
app.listen(port, () => {
  console.log("Server is running in port: ", +port);
});

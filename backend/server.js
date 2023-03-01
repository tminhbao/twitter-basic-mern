require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

// Import error handler
const { errorHandler } = require("./middleware/errorHandler");

// Connect DB
const { connectDB } = require("./config/database");
connectDB();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

// Route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoute);

// Unhandle routes
app.all("*", (req, res, next) => {
  const err = new Error("The route cannot be found");
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

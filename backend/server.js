require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

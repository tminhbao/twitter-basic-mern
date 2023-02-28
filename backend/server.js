require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Connect DB
const { connectDB } = require("./config/database");
connectDB();

// Cors
app.use(cors());

// Body Parser
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      posts: [
        {
          content: "Hello",
          date: "28/02/2023",
        },
      ],
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

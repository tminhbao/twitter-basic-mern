const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

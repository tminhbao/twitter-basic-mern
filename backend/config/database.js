require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const result = await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true,
    });
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB };

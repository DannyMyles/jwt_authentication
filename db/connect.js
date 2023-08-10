const mongoose = require("mongoose");
require('dotenv').config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
	console.log('Db Connected!')
  } catch (error) {
	console.log(`Error connecting to db ${error}`);
  }
};

module.exports = connectDb
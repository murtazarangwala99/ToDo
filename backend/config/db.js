const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => {
      console.log(`DATABASE CONNECTED AT : ${conn.connection.host}`);
    })
    .catch((error) => {
      console.log("Database Error : ", error.message);
    });
};

module.exports = connectToDB;

const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const dbConnect = asyncHandler(async () => {
  const conObj = await mongoose.connect(process.env.MONGO_URI);

  if (conObj) {
    console.log(
      `👽 Database is connected to the host ${conObj.connection.host}`
    );
  } else {
    console.log(`Database not connected!`);
  }
});

module.exports = dbConnect;

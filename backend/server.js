const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const express = require("express");
const errorHandler = require("./middleware/errorMiddleware");
const bookRoutes = require('./routes/bookinfo.route');
const wishlist = require('./routes/wishlist.route');
const request = require('./routes/bookrequest.route');
const requestlist = require('./routes/bookreqlist.route');
const bookpals_reviewRoutes = require('./routes/bookpals_reviewRouter');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3500;

dbConnect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/bookpals", require("./routes/auth.routes"));
app.use("/bookpals/notifications", require("./routes/notifications.routes"));
app.use("/bookpals/books", require("./routes/book.routes"));
app.use("/bookpals/donations", require("./routes/donations.routes"));
app.use('/book' , bookRoutes); 
app.use('/wishlist' , wishlist);
app.use('/bookrequest' , request );
app.use('/bookreqlist' , requestlist);
app.use('/api/exchangead', require('./routes/exchangead_route'));
app.use('/bookpals/exchangerequests', require('./routes/bookrequest.route'));
app.use('/api/reviews', bookpals_reviewRoutes);


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🤖 Server is up and running on port ${PORT} 🤖`);
});

module.exports = app;

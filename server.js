const app = require('./src/app');
const connectDB = require('./src/db/db');
require("dotenv").config();
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000; 
connectDB();

app.use(cookieParser());

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


module.exports = app;
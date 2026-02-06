const app = require('./src/app');
const connectDB = require('./src/db/db');
require("dotenv").config()



const PORT = 3000;
async function startServer() {
  try {
    connectDB()
    console.log('connect to database');

    app.listen( PORT,()=>{
        console.log(`server running on port ${PORT}` );
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

startServer()
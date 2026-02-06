const mongoose = require('mongoose');

async function connectDB() {
  try {

    await mongoose.connect(process.env.MONGO_DB)
  
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to connect with database" });
  }
}

module.exports = connectDB;
// db.js
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...", process.env.MONGO_URI);
    const conn = await connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5 // Maintain at least 5 socket connections
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Connection events
    mongoose.connection.on('connecting', () => {
      console.log('🔄 Connecting to MongoDB Atlas...');
    });

    mongoose.connection.on('connected', () => {
      console.log('✅ Successfully connected to MongoDB Atlas');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB Atlas reconnected');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB Atlas disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Atlas connection error:', err.message);
    });

  } catch (error) {
    console.error(`❌ Error connecting to MongoDB Atlas: ${error.message}`);
    
    // Provide helpful error messages
    if (error.name === 'MongoParseError') {
      console.error('⚠️  Please check your MONGODB_URI format in .env file');
      console.error('⚠️  Format should be: mongodb+srv://username:password@cluster.mongodb.net/database');
    }
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('⚠️  Cannot connect to MongoDB Atlas. Please check:');
      console.error('    1. Your internet connection');
      console.error('    2. MongoDB Atlas IP whitelist settings');
      console.error('    3. Database user credentials');
    }
    
    process.exit(1);
  }
};

// Close MongoDB connection gracefully
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = connectDB;
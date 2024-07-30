const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://kiran:kiran@mern1.wu5jtp4.mongodb.net/?retryWrites=true&w=majority&appName=mern1'

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;

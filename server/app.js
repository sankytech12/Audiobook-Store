const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const audiobookRoutes=require('./routes/audiobookRoutes');
const userRoutes=require('./routes/userRoutes');
const {errorHandler}=require('./middleware/errorMiddleware');

const app=express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api', audiobookRoutes);
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use(errorHandler);

// MongoDB Connection
const MONGODB_URI=process.env.MONGODB_URI;;
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

module.exports = app;

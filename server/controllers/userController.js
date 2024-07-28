const User=require('../models/userModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

// Register a new user
exports.registerUser=async(req, res) => {
    const {name, email, password}=req.body;

    try{
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});

        // res.cookie('token', token, {httpOnly:true, secure: process.env.NODE_ENV==='production'});
        res.status(201).json({user:{id:user._id, name:user.name, email:user.email,tokens:token}});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

// Login a user
exports.loginUser=async(req, res) => {
    console.log("login");
    const {email, password}=req.body;

    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid credentials'});
        }

        const isMatch=await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token=jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});

        // res.cookie('token', token, {httpOnly: true, secure:process.env.NODE_ENV === 'production'});
        res.json({user: {id:user._id, name:user.name, email:user.email}, token});
    } catch(error){
        res.status(500).json({message:error.message});
    }
};

// Logout a user
exports.logoutUser=(req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out' });
};

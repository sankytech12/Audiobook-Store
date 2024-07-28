const express=require('express');
const router=express.Router();
const {registerUser, loginUser, logoutUser}=require('../controllers/userController');
const {protect}=require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check', protect, (req, res) => {
    console.log("check");
    res.json({user: req.user});
});

module.exports=router;

const express= require('express');
const router=express.Router();
const {getAudiobooks, getAudiobookById, addReview, getAudiobooksByGenre} = require('../controllers/audiobookController');
const {protect}=require('../middleware/authMiddleware');


router.get('/audiobooks', getAudiobooks);
router.get('/audiobooks/:id', getAudiobookById);
router.get('/audiobooks/genre/:genre', getAudiobooksByGenre);
router.post('/audiobooks/:id/reviews', protect, addReview);

module.exports=router;

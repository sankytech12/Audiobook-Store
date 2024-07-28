const Audiobook=require('../models/audiobookModel');
const reviewSchema=require('../models/audiobookModel');

// Get all audiobooks
exports.getAudiobooks=async(req, res) =>{
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page
    try {
        const audiobooks = await Audiobook.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const totalAudiobooks = await Audiobook.countDocuments();

        res.json({
            audiobooks,
            totalPages: Math.ceil(totalAudiobooks / pageSize),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get audiobooks filtered by genre
exports.getAudiobooksByGenre=async(req, res) =>{
    const param=req.params.genre.toString();
    const genre = param.charAt(0).toUpperCase()+param.slice(1);
    // const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page
    console.log(genre);

    try {
        const audiobooks = await Audiobook.find({ genre:genre });
        if (!audiobooks){
            return res.status(404).json({message: 'Audiobook not found'});
        }
        res.status(200).json({
            audiobooks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single audiobook by ID
exports.getAudiobookById=async(req, res) =>{
    const _id=req.params.id;
    // console.log(_id);
    try{
        const audiobook=await Audiobook.findById(_id);
        if (!audiobook){
            return res.status(404).json({message: 'Audiobook not found'});
        }
        res.json(audiobook);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

// Add a review to an audiobook
exports.addReview = async (req, res) => {
    try {
        const audiobook = await Audiobook.findById(req.params.id);
        if (!audiobook) {
            return res.status(404).json({ message: 'Audiobook not found' });
        }

        const { rating, comment } = req.body;
        const review = {
            userId: req.user._id,
            rating,
            comment,
        };
    

        audiobook.reviews.push(review);
        audiobook.rating = (audiobook.rating * audiobook.reviews.length + rating) / (audiobook.reviews.length + 1);

        await audiobook.save();
        res.status(201).json(audiobook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

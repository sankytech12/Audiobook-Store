const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    rating:{type:Number, required:true},
    comment:{type:String, required:true},
},{timestamps:true});

const audiobookSchema=new mongoose.Schema({
    title:{type:String, required:true},
    author:{type:String, required:true},
    genre:{type:String, required:true},
    coverImage:{type:String, required:true},
    description:{type:String, required:true},
    rating:{type:Number,default:0},
    reviews:[reviewSchema],
}, {timestamps:true});

const Audiobook=mongoose.model('Audiobook', audiobookSchema);
module.exports=Audiobook;

const fake = require('@faker-js/faker');
const mongoose=require('mongoose');
const Audiobook=require('../models/audiobookModel');

require('dotenv').config();

const MONGODB_URI="mongodb+srv://sankytech12:Sasank12@cluster0.ihn4md3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(MONGODB_URI);
mongoose.connect(MONGODB_URI).
then(() => console.log('MongoDB connected')).
catch((error) => console.log(error));

const faker=fake.faker;
const audiobookEnums=["Motivation","Comedy","Drama","Horror","Mystery","Romance","Science Fiction","Self Help","Thriller","True Crime","Young Adult","Biography","Business","Cookbooks","Fantasy","History","Religion","Science","Sports","Travel"];
const size=audiobookEnums.length;
const generateAudiobooks=async(num) => {
    for(let i = 0; i < num; i++){
        const audiobook=new Audiobook({
            title: faker.lorem.words({ min: 1, max: 3 }),
            author: faker.person.firstName(),
            genre: audiobookEnums[faker.number.int({ min: 0, max: size - 1 })],
            description: faker.lorem.paragraph(),
            coverImage: faker.image.url(), 
            rating: faker.number.float({ min: 3, max: 5, fractionDigits:1 }),
            reviews: [],
        });
        await audiobook.save();
    }
    console.log(`${num} audiobooks generated`);
    mongoose.disconnect();
};
generateAudiobooks(100);

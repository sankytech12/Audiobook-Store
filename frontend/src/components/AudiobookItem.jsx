import React from 'react';
import { Link } from 'react-router-dom';

const AudiobookItem = ({ audiobook }) => {
    return (
        <div className='audiobook-card'>
            <Link to={`/audiobooks/${audiobook._id}`}>
                <h2>{audiobook.title}</h2>
                <p>{audiobook.author}</p>
                <p>Genre: {audiobook.genre}</p>
                <p> <strong>Rating: {audiobook.rating.toFixed(1)}</strong> </p>
                <img src={audiobook.coverImage} alt={audiobook.title} />
            </Link>
        </div>
    );
};

export default AudiobookItem;

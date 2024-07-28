import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import '../styles/AudiobookPage.css';


const AudiobookPage = () => {
    const { id } = useParams();
    const [audiobook, setAudiobook] = useState(null);
    const { user } = useAuth();
    const [comment, setReview] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const fetchAudiobook = async () => {
            const { data } = await axios.get(`http://localhost:5050/api/audiobooks/${id}`);
            setAudiobook(data);
        };
        fetchAudiobook();
    }, [id,rating]);

    const submitReview = async () => {
        let token=document.cookie;
        token=token.split('=')[1];
        const url=`http://localhost:5050/api/audiobooks/${id}/reviews?token=${token}`;
        await axios.post(url, { rating, comment });
        setReview('');
        setRating(0);
    };
        

    if (!audiobook) return <div>Loading...</div>;

    return (
        <div className="audiobook-container">
            <h1>{audiobook.title}</h1>
            <p><strong>Author:</strong> {audiobook.author}</p>
            <p><strong>Genre:</strong> {audiobook.genre}</p>
            <p>{audiobook.description}</p>
            <img src={audiobook.coverImage} alt={audiobook.title} />
            <div className="review-section">
                {audiobook.reviews.length && (
                    <div>
                        <h3>Reviews:</h3>
                        {audiobook.reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p><strong>Comment:</strong> {review.comment}</p>
                                <p><strong>Rating:</strong> {review.rating}</p>
                            </div>
                        ))}
                    </div>
                )}
                {user && (
                    <div>
                        <textarea
                            value={comment}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write a review"
                        />
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            placeholder="Rating"
                        />
                        <button onClick={submitReview}>Submit Review</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudiobookPage;

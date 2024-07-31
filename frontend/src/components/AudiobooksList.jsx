import React, { useEffect, useState } from 'react';
import AudiobookItem from './AudiobookItem';
import Filter from './Filter';
import axios from 'axios';

const AudiobookList = () => {
    const [audiobooks, setAudiobooks] = useState([]);
    const [filters, setFilters] = useState({ genre: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchAudiobooks = async () => {
            if(filters.genre){
                const { data } = await axios.get(
                    `https://audiobook-store-backend.onrender.com/api/audiobooks/genre/${filters.genre}`
                  );
                  setAudiobooks(data.audiobooks);
                  setTotalPages(data.totalPages);
                  return;
            }
            const  {data}  = await axios.get(
                `https://audiobook-store-backend.onrender.com/api/audiobooks?page=${page}`
              );
              setAudiobooks(data.audiobooks);
              setTotalPages(data.totalPages);
        };
        fetchAudiobooks();
    }, [filters, page]);

    return (
        <div className='home_container'>
            <Filter filters={filters} setFilters={setFilters} />
            <div className='audiobook-list'>
                {audiobooks.map(audiobook => (
                    <AudiobookItem key={audiobook._id} audiobook={audiobook}/>
                ))}
            </div>
            <div className='pagination'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => setPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AudiobookList;

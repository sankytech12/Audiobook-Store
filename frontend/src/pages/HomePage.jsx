import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AudiobookList from "../components/AudiobooksList";

const HomePage = () => {
  // const [audiobooks, setAudiobooks] = useState([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  // useEffect(() => {
  //   const fetchAudiobooks = async () => {
  //     const { data } = await axios.get(
  //       `http://localhost:5050/api/audiobooks?page=${page}`
  //     );
  //     setAudiobooks(data.audiobooks);
  //     setTotalPages(data.totalPages);
  //   };
  //   fetchAudiobooks();
  // }, [page]);

  return (
    <>
      <AudiobookList/>
    </>
  );
};

export default HomePage;

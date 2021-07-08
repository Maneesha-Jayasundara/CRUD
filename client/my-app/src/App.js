import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {
  const [mName, setName] = useState('');
  const [mReview, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data)
    });
  }, [])

  // const submitReview = () => {
  //   Axios.post("http://localhost:3001/api/insert", {
  //     mName:mName, 
  //     mReview:mReview,
  //   }).then(() => {
  //     setMovieList([
  //       ...movieReviewList, 
  //       {mName:mName, mReview: mReview},
  //     ]);  // success of post request
  //   });
    
   
  // };
  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      mName:mName, 
      mReview:mReview,
    });

    setMovieList([
      ...movieReviewList, 
      {mName:mName, mReview: mReview},
    ]);  // success of post request 
  };

  const deleteReview = (movie) => {
    Axios.delete("http://localhost:3001/api/delete/${movie}");
  };

  return (
    <div className="App"> 
      <h1>CRUD application</h1>

      <div className="form">
        <label>Movie Name</label>
        <input type="text" 
               name="mName"
               onChange={(e) => {
                 setName(e.target.value);
               }}>
        </input>

        <label>Movie Review</label>
        <input type="text" 
               name="mReview"
               onChange={(e) => {
                setReview(e.target.value);
              }}>
        </input>

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
            <h1>{val.mName}</h1> 
            <p>{val.mReview}</p>| 

            <button onClick={() => {deleteReview(val.mName)}}>Delete</button>
            <input type="text" id="updateInput"/>
            <button>Update</button>
          </div>
          );
         
        })}
      </div>
    </div>
  );
}

export default App;

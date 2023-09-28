// queries for reset all colors to 0 in mongo db compass shell:
// use vidly
// db.getCollection('movies').updateMany({}, { $set: { color: 1 } })
// db.getCollection('movies').updateMany({ sura: 2 }, { $set: { color: 1 } })



import React, { useState, useEffect, useRef } from "react";
import api from "../services/api";
import "./App.css";

//2
let current_sura = 2;
let current_part = 23;
//3
//let current_sura = 3;
//let current_part = 7;
//4
//let current_sura = 4;
//let current_part = 1;
//5
//let current_sura = 5;
//let current_part = 1;
//6
//let current_sura = 6;
//let current_part = 1;
//7
//let current_sura = 7;
//let current_part = 1;
//8
//let current_sura = 8;
//let current_part = 1;
//9
//let current_sura = 9;
//let current_part = 1;
//27
// let current_sura = 27;
// let current_part = 14;


function App() {
  const moviesEndpoint = "/movies";
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();


  const fetchMovies = async (sura, part) => {
    try {
      const { data } = await api.get(moviesEndpoint + '?sura=' + sura +'&part=' + part);
      setMovies(data);
      // const updatedMovies = movies.filter(movie => movie.color !== 2);
      // setMovies(updatedMovies);
    } catch (error) {
      setError("Could not fetch the movies!");
    }
  };

  const changeColor = async (movieId,sura,part,NewColor) => {
    try {
      const updatedData = {
        color: NewColor
      };
      if(NewColor == 0){
        const updatedmovies = movies.map(movies =>
          movies.id === movieId ? { ...movies, color: 0 } : movies
        );
        setMovies(updatedmovies);
      }
      else {
        const updatedmovies = movies.map(movies =>
          movies.id === movieId ? { ...movies, color: NewColor } : movies
        );
        setMovies(updatedmovies);
        const { data } = await api.create(moviesEndpoint  +'?id=' + movieId,updatedData);
      }
    } catch (error) {
      setError("Could not update the color!");
    }
  };

  useEffect(() => fetchMovies(current_sura,current_part), []);
  
  return (
    <div class="main-container">
    <div class="top-button-container">
        <button class="finish-button" onClick={() => {current_part = current_part + 1; fetchMovies(current_sura, current_part)}}>Next</button>
        <button class="finish-button" onClick={() => {current_part = current_part - 1; fetchMovies(current_sura, current_part)}}>Previous</button>
    </div>
    <h2 class="top-title">{current_sura}-{current_part}</h2>
    {movies.map(movies => (
      <div class="section-container" key={movies.id}>
      <div class="movie-content">
      {/* <div class="title-box"  style={{ backgroundColor: movies.color === 1 ?  'rgba(231, 111, 81, 0.1)'  : movies.color === 2 ? 'rgba(15, 255, 33, 0.6)'  : 'rgba(0, 179, 83, 0.3)' }}>         */}
      <div class="title-box"  style={{backgroundColor: movies.color === 1 ?  'rgba(231, 111, 81, 0.1)'  : movies.color === 2 ? 'rgba(15, 255, 33, 0.6)'  : 'rgba(0, 179, 83, 0.3)' ,  fontSize: movies.color === 2 ?  '20px'  : '44px' }}>        
        {movies.color != 1 ? movies.title : movies.title.substring(0,20)}
        </div>
        <div class="buttons-container">
          <button class="color-button red-button"  onClick={() => changeColor(movies.id, 1, 2, 1)}>ناموفق</button>
          <button class="color-button green-button" onClick={() => changeColor(movies.id, 1, 2, 2)}>موفق</button>
          <button class="color-button gray-button" onClick={() => changeColor(movies.id, 1, 2, 0)}>دیدن آیه</button>
        </div>
      </div>
    </div>
    ))}
    <div class="top-button-container">
        <button class="finish-button" onClick={() => {current_part = current_part + 1; fetchMovies(current_sura, current_part);window.scrollTo(0, 0)}}>Next</button>
        <button class="finish-button" onClick={() => {current_part = current_part - 1; fetchMovies(current_sura, current_part)}}>Previous</button>
    </div>
  </div>
  );
}

export default App;

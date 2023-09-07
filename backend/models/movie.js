const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title : String,
  // subtitle : String,
  id    : Number,
  sura  : Number,
  part  : Number,
  color : Number,
}));

// const Quran = mongoose.model('Quran', new mongoose.Schema({
  // id: Number, 
  // ar: String, 
  // sura: Number, 
  // part: Number, 
  // color: Number
  
// }));

module.exports = Movie; 
//module.exports = Quran; 
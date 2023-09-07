const express = require("express");
const validateId = require("../middleware/validateId");
const Movie = require("../models/movie");

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find({ sura : req.query.sura, part : req.query.part})
  res.send(movies);

});

router.get("/:id", validateId, async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send();
  res.send(movie);
});


router.put("/", async (req, res) => {
  // const movie = await Movie.findOne({sura : req.query.sura, part : req.query.part, id : req.query.id})
  const movie = await Movie.findOne({id : req.query.id})
  movie.color = req.body.color;
  await movie.save();
  res.status(201).send(movie);
});

// router.post("/", async (req, res) => {
//   if (!req.body.title) return res.status(400).send("Title is required.");

//   //const movie = new Movie({ title: req.body.title , id: 1, sura: 1, part: 1, color: 1});
//   const movie = new Movie({ title: req.body.title , id: req.body.id , sura: req.body.sura, part: req.body.part , color: req.body.color});
//   await movie.save();
//   res.status(201).send(movie);
// });

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.status(204).send();
});

module.exports = router;

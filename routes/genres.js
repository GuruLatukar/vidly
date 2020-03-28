const mongoose = require('mongoose');
const Joi = require("joi");
const express = require("express");
const router = express.Router(); 

// Create Schema And Model
const Genre = mongoose.model('Genre', new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50
   },
}));

router.get("/", async (req, res) => {
   const genres = await Genre.find().sort('name');
   res.send(genres);
});

router.get("/:id", async (req, res) => {
   const genre = await Genre.findById(req.params.id);
   if(!genre) return res.status(404).send("Invalid ID");
   res.send(genre);
});

router.post("/", async (req, res) => {
   const {error} = validateGenre(req.body);
   if(error) return res.status(404).send(error);

   let genre = new Genre({
      name: req.body.name
   });
   genre = await genre.save();
   res.send(genre);
});

router.put("/:id", async (req, res) => {
   const {error} = validateGenre(req.body);
   if(error) return res.status(404).send(error);

   const genre = await Genre.findByIdAndUpdate(req.params.id, {
      $set: {
         name: req.body.name
      }
   }, { new: true, useFindAndModify: false });

   if(!genre) return res.status(404).send("Invalid ID");

   res.send(genre);
});

router.delete("/:id", async (req, res) => {
   const genre = await Genre.findByIdAndRemove(req.params.id, { useFindAndModify: false });

   if(!genre) return res.status(404).send("Invalid ID");
   res.send(genre);
});

const validateGenre = (genre) => {
   const joiSchemaGenre = {
      name: Joi.string().min(5).max(50).required()
   };
   return Joi.validate(genre, joiSchemaGenre);
}

module.exports = router;

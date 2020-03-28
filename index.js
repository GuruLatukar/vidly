const mongoose = require('mongoose');
const express = require("express");
const app = express();

// Mongo DB Connection
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Could not connect to MongoDB..'));

app.use(express.json());

const genres = require("./routes/genres");
app.use("/api/genres", genres);

const port = 4567;
app.listen(port, function(){
   console.log(`Server is up on Port:${port}`);
})

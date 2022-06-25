require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const colorController = require('./controllers/colorController');
const MONGO_URI = process.env.MONGO_URI;
app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("DB connected");
});


app.get('/', (req, res) => {
  res.send('go to /colors for preset array of colors and go to /random for random colors')
});

app.post('/colors', colorController.post, async (req, res) => {
  return res.status(200).json(res.locals.doc);
});

app.get('/colors', colorController.get, (req, res) => {
  return res.status(200).json(res.locals.colorsList);
});

app.get('/random', colorController.getRandom, (req, res) => {
  return res.status(200).json(res.locals.colorsList);
});

// local error handler
app.use((req, res) => {
  res.status(404).send('ERROR 404 - Page not found');
});

// global error handler
app.use((err, req, res, next) => {
  const errHandler = {
    message: 'Error caught in unknown middleware',
    status: 500
  };
  const error = Object.assign({}, errHandler, err);
  res.status(error.status).send(error.message);
});

app.listen(port, () => console.log(`listening on port ${port}`));
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const colorController = require('./controllers/colorController');
const MONGO_URI = "mongodb+srv://calvin:codesmith@cluster0.milss.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("DB connected");
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello')
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
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/colors', (req, res) => {
  const randomNums = new Set();
  const hexFromDecimal = (num) => '#' + num.toString(16).padStart(6, '0');
  const generateRandNum = () => Math.floor(Math.random() * 256 ** 3);
  for (let i = 0; i < 100; i++) {
    let num = generateRandNum();
    while (randomNums.has(num)) num = generateRandNum();
    randomNums.add(num);
  }
  const randomColors = [...randomNums].sort((a, b) => a - b).map((num) => hexFromDecimal(num));
  res.status(200).json(randomColors);
});

app.listen(port, () => console.log(`listening on port ${port}`));
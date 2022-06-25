const Color = require('../colorModel');

const colorController = {};

const randomColors = () => {
  const randomNums = new Set();
  const hexFromDecimal = (num) => '#' + num.toString(16).padStart(6, '0');
  const generateRandNum = () => Math.floor(Math.random() * 256 ** 3);
  for (let i = 0; i < 100; i++) {
    let num = generateRandNum();
    while (randomNums.has(num)) num = generateRandNum();
    randomNums.add(num);
  }
  const randomColors = [...randomNums].sort((a, b) => a - b).map((num) => hexFromDecimal(num));
  return randomColors
};

colorController.post = async (req, res, next) => {
  try {
    const doc = await Color.create({ colorsList: randomColors() })
    res.locals.doc = doc;
    return next();
  } catch (err) {
    console.log(err);
    return next({
      message: 'Error in colorController.post middleware',
      status: 500
    });
  }
};

colorController.get = async (req, res, next) => {
  try {
    const doc = await Color.findOne({});
    res.locals.colorsList = doc.colorsList;
    return next();
  } catch (err) {
    console.log(err);
    return next({
      message: 'Error in colorController.get middleware',
      status: 500
    });
  }
};

colorController.getRandom = (req, res, next) => {
  res.locals.colorsList = randomColors();
  return next();
};

module.exports = colorController;
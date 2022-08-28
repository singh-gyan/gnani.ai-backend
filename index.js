require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');
const model = require('./model');
mongoose
  .connect(process.env.DB_CONNECTION, {
    dbName: 'gnani',
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to database ');
  })
  .catch(err => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.get('/api/', async (req, res) => {
  let data = await model.find({}).sort({ size: -1 }).limit(1);
  console.log(data);
  res.json(data[0]);
});

app.post('/api/', async (req, res) => {
  if (req.body.data && typeof req.body === 'object') {
    console.log(req.body.data.length);
    let counters = req.body.data;
    // counters = counters.map((val, i) => ({ button: i, value: val });
    const data = await model.find({ size: counters.length });
    if (data.length) {
      let a = await model.updateOne(
        { size: counters.length },
        { $set: { buttons: [...counters] } }
      );
      console.log(a);
    } else {
      // const data = new model({ buttons: counters, size: counters.length });
      let data = JSON.parse(JSON.stringify(counters));
      let a = await model.insertMany({
        buttons: counters,
        size: counters.length,
      });
      console.log(a, counters);
      // await model.save(data);
      res.status(200);
    }
  } else {
    res.sendStatus(400).send('Invalid request');
  }
});

app.listen(process.env.PORT || 3000, console.log('Connected'));

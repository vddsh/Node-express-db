const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect.js');
const notFound = require('./controllers/middleware/not-found')
const errorHandler = require('./controllers/middleware/error-handler')
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json());


//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(3000);
  } catch (err ){
    console.log(err)
  }
}

start()

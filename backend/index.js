import express from 'express';
import {mongoURI, PORT} from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
const app = express();
  app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`)});
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
//Allow all origins with default of cors(*)

app.use('/books',booksRoute);

app.use(bodyParser.json());
// ⚠️ safe for development, not production

mongoose.connect(mongoURI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => { 
  console.error('Error connecting to MongoDB:', err);
});




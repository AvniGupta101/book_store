
import express from 'express';
import { Book } from '../models/bookModel.js';
const router =express.Router();
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});
router.post('/', async (req, res) => {
  const books = req.body; // Expecting an array of book objects
  try {
    const newBooks = await Book.insertMany(books);
    res.status(201).json(newBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error adding books', error });
  }
});


router.post('/', async (req, res) => {
  const { title, author, publisherYear, price } = req.body;
  try {
    const newBook = new Book({ title, author, publisherYear, price });
    await newBook.save() ;
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book' });
  }
});
//Route for get one book from database by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {            
      return res.status(404).json({ message: 'Book not found' });
    }   
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book' });
  }
});
//Route to update a boxDecorationBreak: 
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, publisherYear, price } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,   
      { title, author, publisherYear, price },
      { new: true }     
    );
    if (!updatedBook) {     
        return res.status(404).json({ message: 'Book not found' });
        }
    res.json(updatedBook);
  } catch (error) {

    res.status(500).json({ message: 'Error updating book' });
  }     
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {        
      return res.status(404).json({ message: 'Book not found' });
    }                   
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }     
});
export default router;
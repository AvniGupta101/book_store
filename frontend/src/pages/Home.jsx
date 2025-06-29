import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md' 

const Home = () => {
    

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/books')        
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                setLoading(false);
            });
    }, []);
  return (
    <div className='p-4'>
        <div className='flex justify-between item-center'>
            <h1 className='text-2xl font-bold'>Books List</h1>
            <Link to="/books/create" className='flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                <MdOutlineAddBox className='mr-2' />        
                Add Book
            </Link>
        </div>
        {loading ? (
            <Spinner />
        ) : (
            
            <table className='min-w-full mt-4'>
                <thead> 
                    <tr className='bg-gray-200'>
                        <th className='px-4 py-2 text-left'>Title</th>
                        <th className='px-4 py-2 text-left'>Author</th>
                        <th className='px-4 py-2 text-left'>Year</th>
                        <th className='px-4 py-2 text-left'>Price</th>
                        <th className='px-4 py-2 text-left'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id} className='border-b hover:bg-gray-100'>
                            <td className='px-4 py-2'>{book.title}</td>
                            <td className='px-4 py-2'>{book.author}</td>
                            <td className='px-4 py-2'>{book.publisherYear}</td>
                            <td className='px-4 py-2'>${book.price}</td>
                            <td className='px-4 py-2 flex space-x-2'>
                                <Link to={`/books/details/${book._id}`} className='text-blue-500 hover:underline flex items-center'>
                                    <BsInfoCircle className='mr-1' /> Details
                                </Link>
                                <Link to={`/books/edit/${book._id}`} className='text-green-500 hover:underline flex items-center'>
                                    <AiOutlineEdit className='mr-1' /> Edit
                                </Link>
                                <Link to={`/books/delete/${book._id}`} className='text-red-500 hover:underline flex items-center'>
                                    <MdOutlineDelete className='mr-1' /> Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>     
        )}


    </div>
  )
}

export default Home



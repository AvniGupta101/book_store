import React from 'react'
import './App.css'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'  // Assuming Home is a component in your project
import CreateBook from './pages/CreateBook'  // Assuming CreateBook is a component in your project
import ShowBook from './pages/ShowBook'  // Assuming ShowBook is a component in your project
import EditBook from './pages/EditBook'  // Assuming EditBook is a component in your project
import DeleteBook from './pages/DeleteBook'  // Assuming DeleteBook is a
const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/books/create" element={<CreateBook/>} />
        <Route path="/books/details/:id" element={<ShowBook/>} />
        <Route path="/books/edit/:id" element={<EditBook/>} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
    
    
  )
}

export default App
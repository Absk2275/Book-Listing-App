import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [formData, setFormData] = useState({
    CategoryName: 'Select',
    name: '',
    img: '',
    options: [],
    description: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'options') {
      const optionsArray = value.split(',').map((option) => {
        const [ebook, book] = option.split(';');
        return { ebook, book };
      });

      setFormData({
        ...formData,
        options: optionsArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/addbooks', formData);
      setMessage(response.data.message);

      if (response.data.message === 'Book added successfully') {
        // Clear input fields
        setFormData({
          CategoryName: 'Select',
          name: '',
          img: '',
          options: [],
          description: '',
        });
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add a Book</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Category Name</label>
          <select
            className="form-control"
            name="CategoryName"
            value={formData.CategoryName}
            onChange={handleChange}
          >
            <option value="Select">Select</option>
            <option value="Fiction">Fiction</option>
            <option value="History">History</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Biography">Biography</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Book Details</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Cover Page</label>
          <input
            type="text"
            className="form-control"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Options</label>
          <input
            type="text"
            className="form-control"
            name="options"
            value={formData.options.map(option => `${option.ebook};${option.book}`).join(',')}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;

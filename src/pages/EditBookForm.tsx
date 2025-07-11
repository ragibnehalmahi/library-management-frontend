// src/pages/EditBookForm.tsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from '../redux/bookApi';
import toast from 'react-hot-toast';

const EditBookForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetBookByIdQuery(id || '');
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const book = data?.data;  

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    description: '',
    copies: 1,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        genre: book.genre || '',
        description: book.description || '',
        copies: book.copies || 1,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'copies' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateBook({
        id: id!,
        data: {
          ...formData,
          available: formData.copies > 0,
        },
      }).unwrap();
      toast.success('✅ Book updated successfully!');
      navigate('/books');
    } catch (err) {
      console.error('❌ Failed to update book:', err);
      toast.error('❌ Failed to update book!');
    }
  };

  if (isLoading) return <p className="text-center mt-6">Loading book...</p>;
  if (isError || !book) return <p className="text-center mt-6">❌ Book not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">✏️ Edit Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
          placeholder="Title"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
          placeholder="Author"
        />
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
          placeholder="ISBN"
        />
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded bg-white"
        >
          <option value="">Select Genre</option>
          <option value="FICTION">Fiction</option>
          <option value="NON_FICTION">Non-Fiction</option>
          <option value="SCIENCE">Science</option>
          <option value="HISTORY">History</option>
          <option value="BIOGRAPHY">Biography</option>
          <option value="FANTASY">Fantasy</option>
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          name="copies"
          value={formData.copies}
          onChange={handleChange}
          min={0}
          className="w-full border px-3 py-2 rounded"
          placeholder="Copies"
        />

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isUpdating ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;

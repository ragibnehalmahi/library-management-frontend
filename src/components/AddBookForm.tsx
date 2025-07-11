 

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../redux/bookApi";
import toast from "react-hot-toast";

const AddBookForm = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newBook = {
        ...formData,
        available: formData.copies > 0,
      };

      await createBook(newBook).unwrap();
      toast.success("✅ Book added successfully!");
      navigate("/books");
    } catch (error) {
      console.error("❌ Error adding book:", error);
      toast.error("❌ Failed to add book.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 mb-6 p-6 bg-white border rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />

        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded bg-white"
        >
          <option value="">Select Genre</option>
          <option value="FICTION">Fiction</option>
          <option value="NON_FICTION">Non-Fiction</option>
          <option value="SCIENCE">Science</option>
          <option value="HISTORY">History</option>
          <option value="BIOGRAPHY">Biography</option>
          <option value="FANTASY">Fantasy</option>
        </select>

        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border rounded"
        />

        <input
          type="number"
          name="copies"
          min={0}
          value={formData.copies}
          onChange={handleChange}
          placeholder="Copies"
          className="w-full px-3 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;

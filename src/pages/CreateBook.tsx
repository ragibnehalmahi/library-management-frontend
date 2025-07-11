import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../redux/bookApi";
import { toast } from "react-hot-toast";

interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  description: string;
  genre: string;
  copies: number;
}

const CreateBook = () => {
  const [addBook] = useCreateBookMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    isbn: "",
    description: "",
    genre: "",
    copies: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Math.max(0, parseInt(value) || 0) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(formData).unwrap();
      toast.success("Book added successfully!");
      navigate("/books");
    } catch (error) {
      toast.error("Failed to add book.");
      console.error("Add book error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          rows={4}
          required
        />
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        >
          <option value="">Select Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Science">Science</option>
          <option value="Biography">Biography</option>
        </select>
        <input
          type="number"
          name="copies"
          min={0}
          placeholder="Number of copies"
          value={formData.copies}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;

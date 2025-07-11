// src/pages/AllBooks.tsx
import { useGetAllBooksQuery, useDeleteBookMutation } from '../redux/bookApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// ✅ Book টাইপ ডিফাইন (যদি বাইরে থেকে import না করেন)
interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export default function AllBooks() {
  // ✅ RTK Query hook
  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetAllBooksQuery();

  const [deleteBook] = useDeleteBookMutation();

  // ✅ fallback and compatibility
  const books: Book[] = Array.isArray(data)
    ? data
    : (data as any)?.data ?? [];

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await deleteBook(id).unwrap();
      toast.success('✅ Book deleted successfully!');
    } catch (err) {
      toast.error('❌ Failed to delete book.');
      console.error('Delete Error:', err);
    }
  };

  // ✅ লোডিং স্টেট
  if (isLoading) {
    return <p className="text-center text-lg">📦 Loading books...</p>;
  }

  // ✅ এরর হ্যান্ডলিং
  if (isError) {
    return (
      <p className="text-center text-red-500 text-lg">
        ❌ Failed to load books: {(error as any)?.message || 'Unknown error'}
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📚 All Books</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-600">No books found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-collapse border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Author</th>
                <th className="border p-2">Genre</th>
                <th className="border p-2">ISBN</th>
                <th className="border p-2">Copies</th>
                <th className="border p-2">Available</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="border p-2">{book.title}</td>
                  <td className="border p-2">{book.author}</td>
                  <td className="border p-2">{book.genre}</td>
                  <td className="border p-2">{book.isbn}</td>
                  <td className="border p-2">{book.copies}</td>
                  <td className="border p-2">
                    {book.copies > 0 ? '✅ Yes' : '❌ No'}
                  </td>
                  <td className="border p-2 space-x-2">
                    <Link
                      to={`/edit-book/${book._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/borrow/${book._id}`}
                      className="text-green-600 hover:underline"
                    >
                      Borrow
                    </Link>
                    <Link
  to={`/books/${book._id}`}
  className="text-purple-600 hover:underline"
>
  Details
</Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


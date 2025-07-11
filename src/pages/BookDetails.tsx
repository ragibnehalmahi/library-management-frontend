import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '../redux/bookApi';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetBookByIdQuery(id!);
  const book = data?.data;

  if (isLoading) return <p className="text-center mt-6">Loading book details...</p>;
  if (isError || !book) return <p className="text-center mt-6 text-red-600">❌ Book not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">{book.title}</h2>
      <div className="space-y-2">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Copies:</strong> {book.copies}</p>
        <p><strong>Available:</strong> {book.available ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Description:</strong> {book.description || 'No description available'}</p>
      </div>
    </div>
  );
};

export default BookDetails;

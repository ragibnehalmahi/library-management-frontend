import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBorrowBookMutation, useGetBookByIdQuery } from '../redux/bookApi';
import toast from 'react-hot-toast';

interface FormErrors {
  quantity?: string;
  dueDate?: string;
}

const BorrowForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const { data: bookData } = useGetBookByIdQuery(id || '');
  const book = bookData?.data;

  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (book && formData.quantity > book.copies) {
      setFormData(prev => ({ ...prev, quantity: book.copies }));
    }
  }, [book]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.quantity || formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
      isValid = false;
    } else if (book && formData.quantity > book.copies) {
      newErrors.quantity = `Only ${book.copies} copies available`;
      isValid = false;
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
      isValid = false;
    } else if (new Date(formData.dueDate) <= new Date()) {
      newErrors.dueDate = 'Due date must be in the future';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!id || !book) {
      toast.error('Book information missing');
      return;
    }

    try {
      await borrowBook({
        book: id,
        quantity: formData.quantity,
        dueDate: new Date(formData.dueDate).toISOString(),
      }).unwrap();

      toast.success(`Successfully borrowed ${formData.quantity} copy(ies) of "${book.title}"`);
      navigate('/borrow-summary');
    } catch (err) {
      toast.error('Failed to borrow book. Please try again.');
      console.error('Borrow error:', err);
    }
  };

  if (!book) {
    return <div className="text-center py-10">Loading book information...</div>;
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Borrow: {book.title}</h2>
      <p className={`mb-4 ${book.copies === 0 ? 'text-red-500' : ''}`}>
        Available copies: {book.copies}
        {book.copies === 0 && ' (Not available)'}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            min="1"
            max={book.copies}
            value={formData.quantity}
            onChange={handleChange}
            disabled={book.copies === 0}
            className={`w-full px-3 py-2 border rounded ${
              errors.quantity ? 'border-red-500' : 'border-gray-300'
            } ${book.copies === 0 ? 'bg-gray-100' : ''}`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            disabled={book.copies === 0}
            className={`w-full px-3 py-2 border rounded ${
              errors.dueDate ? 'border-red-500' : 'border-gray-300'
            } ${book.copies === 0 ? 'bg-gray-100' : ''}`}
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || book.copies === 0}
          className={`w-full py-2 px-4 rounded text-white ${
            isLoading || book.copies === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Processing...' : 
           book.copies === 0 ? 'No Copies Available' : 'Confirm Borrow'}
        </button>
      </form>
    </div>
  );
};

export default BorrowForm;
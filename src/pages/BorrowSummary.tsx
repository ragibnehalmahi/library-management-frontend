import { useEffect } from 'react';
import { useGetBorrowSummaryQuery } from '../redux/borrowApi';

const BorrowSummary = () => {
  const {
    data: borrows = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetBorrowSummaryQuery();

   
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 border rounded-lg shadow bg-white dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 Borrow Summary</h2>

      {isLoading && <p className="text-center">Loading summary...</p>}

      {isError && (
        <p className="text-red-500 text-center">
          Error: {(error as any)?.data?.message || 'Failed to load data'}
        </p>
      )}

      {!isLoading && borrows.length === 0 && (
        <p className="text-center text-gray-500">📭 No borrow records found.</p>
      )}

      {borrows.length > 0 && (
        <table className="w-full border-collapse border">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">ISBN</th>
              <th className="border p-2">Borrowed Qty</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((record, idx) => (
              <tr key={record._id}>
                <td className="border p-2 text-center">{idx + 1}</td>
                <td className="border p-2">{record.book.title}</td>
                <td className="border p-2">{record.book.isbn}</td>
                <td className="border p-2 text-center">{record.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowSummary;

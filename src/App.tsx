// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import AddBookForm from './components/AddBookForm';
import EditBookForm from './pages/EditBookForm';
import BorrowForm from './pages/BorrowForm';
import BorrowSummary from './pages/BorrowSummary';
import BookDetails from './pages/BookDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/create-book" element={<AddBookForm />} />
          <Route path="/edit-book/:id" element={<EditBookForm />} />
          <Route path="/books/:id" element={<BookDetails />} />
<Route path="/borrow/:id" element={<BorrowForm />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

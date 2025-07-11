export default interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface BorrowSummaryData {
  _id: string;
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  }
}

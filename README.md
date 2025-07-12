# Library Management System 📚
A minimal library management system built with React, TypeScript, and Redux Toolkit Query (RTK Query) that allows users to manage books and track borrowings.
## Live 
https://library-management-frontend-8ont.vercel.app/books
## Features ✨

### Book Management
- 📖 View all books in a responsive table
- ➕ Add new books with validation
- ✏️ Edit existing book details
- 🗑️ Delete books with confirmation
- 🔍 View detailed book information

### Borrowing System
- 📅 Borrow books with due date selection
- 🔢 Quantity validation (can't exceed available copies)
- 📊 View borrow summary statistics
- ⚠️ Automatic availability updates when copies reach 0
### Technical Highlights
- 🚀 Optimistic UI updates for smooth user experience
- 💅 Responsive design with Tailwind CSS
- 🛡️ Type-safe forms and API interactions
- 🔄 Real-time data synchronization
- 📱 Mobile-friendly interface
 Layer	|Technology
Frontend |	React + TypeScript
State Management |	Redux Toolkit + RTK Query
Backend	| Node.js + Express.js
Database |	MongoDB + Mongoose
Styling |	Tailwind CSS or any basic CSS framework

## Installation ⚙️

1. Clone the repository
2. Install dependencies:npm install
3. Start the development server:npm run dev
4. Build for production:npm run build


API Endpoints 🌐
The application consumes these RESTful endpoints:

GET /api/books - Get all books

POST /api/books - Add new book

PUT /api/books/:id - Update book

DELETE /api/books/:id - Delete book

POST /api/borrow - Create borrow record

GET /api/borrow - Get borrow summary
File and folder structure:
 src/->components/-> Reusable components
 pages/ ->Application pages
 pages/ -> Application pages
  redux/ ->RTK Query API slices
types/ ->TypeScript interfaces
 App.tsx  ->Main application component
 main.tsx  ->Application entry point
 
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

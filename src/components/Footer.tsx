 

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-center py-4 mt-10 border-t dark:border-gray-700">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} MyLibrary. All rights reserved.
      </p>
      <p className="text-xs mt-1">
        Made with ❤️ by Book Lovers 📚
      </p>
    </footer>
  );
};

export default Footer;

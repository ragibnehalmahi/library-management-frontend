 import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "All Books", path: "/books" },
    { name: "Add Book", path: "/create-book" },
    { name: "Borrow Summary", path: "/borrow-summary" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky top-0 z-40 border-b dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink
          to="/books"
          className="text-xl font-bold tracking-wide hover:opacity-80"
        >
          📖 MyLibrary
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
              }
            >
              {link.name.toUpperCase()}
            </NavLink>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-3 px-3 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl focus:outline-none"
          >
            {menuOpen ? "✖️" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white dark:bg-gray-900 py-4 gap-4 border-t dark:border-gray-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
              }
            >
              {link.name.toUpperCase()}
            </NavLink>
          ))}

          <button
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

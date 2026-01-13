import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserAvatar from "./UserAvatar";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Browse Gigs", path: "/browse-gigs" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, openAuthModal, setAuthMode } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    setAuthMode('login');
    openAuthModal();
  };

  const handleRegisterClick = () => {
    setAuthMode('register');
    openAuthModal();
  };

  return (
    <header className={`w-full bg-white border-b border-gray-200 relative z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-md sticky top-0' : ''
    }`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

            <Link to="/" className="flex-shrink-0">
              <img
                src="/logo.png" 
                alt="GigFlow"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 relative group ${
                    isActive
                      ? "text-purple-600 border-b-2 border-purple-600 pb-1"
                      : "text-gray-700 hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 pb-1"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 sm:gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/post-gig"
                  className="hidden sm:flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2.5 sm:px-5 text-sm font-medium text-white hover:bg-orange-600 transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Post a Gig
                </Link>
                <UserAvatar />
              </>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-gray-700">
                  <button onClick={handleRegisterClick} className="hover:text-purple-600 transition">
                    Register
                  </button>
                  <button onClick={handleLoginClick} className="hover:text-purple-600 transition">
                    Login
                  </button>
                </div>
                <button
                  onClick={handleLoginClick}
                  className="rounded-md bg-orange-500 px-4 py-2.5 sm:px-5 text-sm font-medium text-white hover:bg-orange-600 transition-all duration-300 flex-shrink-0 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                >
                  + Post a Gig
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-6 flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => (
             <NavLink
             key={link.name}
             to={link.path}
             onClick={() => setIsMobileMenuOpen(false)}
             className={({ isActive }) =>
               `block py-2 text-base font-medium ${
                 isActive
                   ? "text-purple-600"
                   : "text-gray-700 hover:text-purple-600"
               }`
             }
           >
             {link.name}
           </NavLink>
          ))}
          {!isAuthenticated && (
            <>
              <div className="h-px w-full bg-gray-200 my-2"></div>
              <div className="flex flex-col gap-4 sm:hidden">
                <button
                  onClick={handleRegisterClick}
                  className="text-gray-700 font-medium py-2 hover:text-purple-600 text-left"
                >
                  Register
                </button>
                <button
                  onClick={handleLoginClick}
                  className="text-gray-700 font-medium py-2 hover:text-purple-600 text-left"
                >
                  Login
                </button>
              </div>
            </>
          )}
          {isAuthenticated && (
            <>
              <div className="h-px w-full bg-gray-200 my-2"></div>
              <div className="flex flex-col gap-4 sm:hidden">
                <Link
                  to="/post-gig"
                  className="flex items-center gap-2 text-gray-700 font-medium py-2 hover:text-purple-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Post a Gig
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
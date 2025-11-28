import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { APP_NAME } from '../constants';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { items, toggleCart } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Galeria', path: '/gallery' },
    { name: 'O Legado', path: '/legacy' },
    { name: 'Contato', path: '/contact' },
    { name: 'Fine Art Store', path: '/store', isSpecial: true },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-transparent ${
        scrolled || isOpen ? 'bg-white/95 backdrop-blur-sm py-4 border-gray-100 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className={`text-2xl md:text-3xl font-bold tracking-widest serif-font uppercase ${scrolled || isOpen ? 'text-black' : 'text-black mix-blend-difference'}`}>
          {APP_NAME}
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide uppercase transition-colors duration-200 flex items-center gap-2 ${
                  isActive 
                    ? 'text-black border-b border-black' 
                    : scrolled || location.pathname !== '/' ? 'text-gray-600 hover:text-black' : 'text-black mix-blend-difference hover:opacity-70'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          
          {/* Cart Icon */}
          <button 
            onClick={toggleCart} 
            className={`relative p-2 ${scrolled || location.pathname !== '/' ? 'text-black' : 'text-black mix-blend-difference'}`}
          >
            <ShoppingBag size={20} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Toggle + Cart */}
        <div className="md:hidden flex items-center gap-4 z-50">
           <button 
            onClick={toggleCart} 
            className={`relative p-2 ${scrolled || location.pathname !== '/' || isOpen ? 'text-black' : 'text-black mix-blend-difference'}`}
          >
            <ShoppingBag size={24} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {items.length}
              </span>
            )}
          </button>
          
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <X size={28} className="text-black" /> : <Menu size={28} className={`transition-colors ${scrolled || location.pathname !== '/' ? 'text-black' : 'text-black mix-blend-difference'}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out flex flex-col justify-center items-center ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-8 text-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-2xl serif-font transition-colors ${
                  isActive ? 'text-black font-bold' : 'text-gray-500'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
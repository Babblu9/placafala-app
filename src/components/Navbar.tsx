
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, AlertTriangle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedButton from './ui-components/AnimatedButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/report', label: 'Report', icon: <AlertTriangle size={16} /> },
    { path: '/search', label: 'Search', icon: <Search size={16} /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-placafala-black/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <NavLink 
            to="/" 
            className="flex items-center gap-2 text-2xl font-bold text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-placafala-highlight">Placa</span>
            <span>Fala</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-app hover:text-white flex items-center gap-1",
                  isActive ? "text-white" : "text-placafala-lightgray"
                )}
              >
                {link.icon && link.icon}
                {link.label}
              </NavLink>
            ))}
            <AnimatedButton variant="highlight" size="sm">
              Report Now
            </AnimatedButton>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-placafala-lightgray p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-placafala-black/95 backdrop-blur-md border-t border-white/10 animate-fade-in">
          <div className="container mx-auto py-4 px-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => cn(
                    "py-2 px-4 rounded-md transition-app hover:bg-white/5 flex items-center gap-2",
                    isActive ? "bg-white/10 text-white" : "text-placafala-lightgray"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon && link.icon}
                  {link.label}
                </NavLink>
              ))}
              <AnimatedButton variant="highlight" className="mt-2">
                Report Now
              </AnimatedButton>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

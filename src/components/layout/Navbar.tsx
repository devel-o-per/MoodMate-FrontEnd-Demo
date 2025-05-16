
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center text-white font-bold">M</div>
          <span className="text-xl font-semibold text-mood-neutral-dark">MoodMate</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-mood-neutral hover:text-mood-purple transition-colors">
                Dashboard
              </Link>
              <Link to="/journal" className="text-mood-neutral hover:text-mood-purple transition-colors">
                Journal
              </Link>
              <Link to="/profile" className="text-mood-neutral hover:text-mood-purple transition-colors">
                Profile
              </Link>
              <Link to="/logout">
                <Button variant="outline">Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/features" className="text-mood-neutral hover:text-mood-purple transition-colors">
                Features
              </Link>
              <Link to="/about" className="text-mood-neutral hover:text-mood-purple transition-colors">
                About
              </Link>
              <Link to="/login">
                <Button variant="outline" className="mr-2">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-mood-purple hover:bg-mood-purple-dark text-white">Sign up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-mood-neutral-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-white border-b flex flex-col space-y-4 animate-fade-in">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-mood-neutral-dark py-2 px-4 hover:bg-mood-purple-light rounded-md">
                Dashboard
              </Link>
              <Link to="/journal" className="text-mood-neutral-dark py-2 px-4 hover:bg-mood-purple-light rounded-md">
                Journal
              </Link>
              <Link to="/profile" className="text-mood-neutral-dark py-2 px-4 hover:bg-mood-purple-light rounded-md">
                Profile
              </Link>
              <Link to="/logout" className="py-2 px-4">
                <Button variant="outline" className="w-full">Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/features" className="text-mood-neutral-dark py-2 px-4 hover:bg-mood-purple-light rounded-md">
                Features
              </Link>
              <Link to="/about" className="text-mood-neutral-dark py-2 px-4 hover:bg-mood-purple-light rounded-md">
                About
              </Link>
              <Link to="/login" className="py-2 px-4">
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link to="/signup" className="py-2 px-4">
                <Button className="w-full bg-mood-purple hover:bg-mood-purple-dark text-white">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

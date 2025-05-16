
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center text-white font-bold">M</div>
              <span className="text-xl font-semibold text-mood-neutral-dark">MoodMate</span>
            </Link>
            <p className="mt-4 text-mood-neutral text-sm">Your daily AI companion for mood tracking and emotional well-being.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-mood-neutral-dark mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="text-mood-neutral hover:text-mood-purple">Features</Link></li>
              <li><Link to="/pricing" className="text-mood-neutral hover:text-mood-purple">Pricing</Link></li>
              <li><Link to="/faq" className="text-mood-neutral hover:text-mood-purple">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-mood-neutral-dark mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-mood-neutral hover:text-mood-purple">About Us</Link></li>
              <li><Link to="/privacy" className="text-mood-neutral hover:text-mood-purple">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-mood-neutral hover:text-mood-purple">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-mood-neutral-dark mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-mood-neutral hover:text-mood-purple">Contact</a></li>
              <li><a href="#" className="text-mood-neutral hover:text-mood-purple">Twitter</a></li>
              <li><a href="#" className="text-mood-neutral hover:text-mood-purple">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-mood-neutral text-sm">© {new Date().getFullYear()} MoodMate. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-mood-neutral text-sm hover:text-mood-purple">Privacy</Link>
            <Link to="/terms" className="text-mood-neutral text-sm hover:text-mood-purple">Terms</Link>
            <Link to="/cookies" className="text-mood-neutral text-sm hover:text-mood-purple">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

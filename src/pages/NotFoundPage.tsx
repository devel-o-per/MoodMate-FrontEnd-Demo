
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="text-center max-w-md px-4">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full gradient-purple flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold">
              404
            </div>
            <h1 className="text-3xl font-bold text-mood-neutral-dark mb-3">Page Not Found</h1>
            <p className="text-mood-neutral">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="outline">Go to Home</Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-mood-purple hover:bg-mood-purple-dark">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;

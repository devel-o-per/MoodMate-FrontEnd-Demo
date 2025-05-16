
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Heart, MessageSquare } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mood-neutral-dark mb-6 leading-tight tracking-tight text-balance">
                  Your Daily <span className="text-mood-purple">AI Companion</span> for Emotional Well-being
                </h1>
                <p className="text-lg md:text-xl text-mood-neutral mb-8 leading-relaxed">
                  Track your mood, journal your thoughts, and receive personalized insights to improve your mental health—all in one private, accessible space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/signup">
                    <Button className="h-12 px-8 text-base bg-mood-purple hover:bg-mood-purple-dark text-white">
                      Get Started Free
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/features">
                    <Button variant="outline" className="h-12 px-8 text-base">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full max-w-md">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl bg-mood-purple/20 z-0"></div>
                  <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden p-4 border">
                    <img 
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                      alt="MoodMate Dashboard Preview" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-mood-purple-light">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-mood-neutral-dark mb-4">How MoodMate Helps</h2>
              <p className="text-mood-neutral text-lg">Our AI-powered tools give you personalized insights about your emotional well-being.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-mood-purple-light flex items-center justify-center mb-6">
                  <MessageSquare size={28} className="text-mood-purple" />
                </div>
                <h3 className="text-xl font-semibold text-mood-neutral-dark mb-3">AI-Powered Journaling</h3>
                <p className="text-mood-neutral">Express yourself through voice or text and let our AI help understand your emotions.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-mood-purple-light flex items-center justify-center mb-6">
                  <BarChart size={28} className="text-mood-purple" />
                </div>
                <h3 className="text-xl font-semibold text-mood-neutral-dark mb-3">Visual Mood Tracking</h3>
                <p className="text-mood-neutral">See patterns in your emotional state with intuitive charts and visualizations.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-mood-purple-light flex items-center justify-center mb-6">
                  <Heart size={28} className="text-mood-purple" />
                </div>
                <h3 className="text-xl font-semibold text-mood-neutral-dark mb-3">Personalized Insights</h3>
                <p className="text-mood-neutral">Get actionable suggestions to improve your mood based on your unique patterns.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-mood-neutral-dark mb-4">How It Works</h2>
              <p className="text-mood-neutral text-lg">Simple steps to better understand and improve your emotional well-being.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/3 left-1/3 right-1/3 h-0.5 bg-mood-purple-light z-0"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-mood-purple text-white flex items-center justify-center mb-6 shadow-md">1</div>
                <h3 className="text-xl font-semibold text-mood-neutral-dark mb-3">Record Your Feelings</h3>
                <p className="text-mood-neutral">Use voice or text to express how you're feeling and what's on your mind.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-mood-purple text-white flex items-center justify-center mb-6 shadow-md">2</div>
                <h3 className="text-xl font-semibold text-mood-neutral-dark mb-3">AI Analysis</h3>
                <p className="text-mood-neutral">Our AI accurately detects emotions and analyzes patterns in your mood over time.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-mood-purple text-white flex items-center justify-center mb-6 shadow-md">3</div>
                <h3 className="text-xl font-semibold text-mood-neutral-dark mb-3">Get Insights</h3>
                <p className="text-mood-neutral">Receive personalized suggestions to improve your mental well-being.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-mood-neutral-dark text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Wellness Journey Today</h2>
              <p className="text-lg md:text-xl mb-8 text-mood-neutral-light">Join thousands who are already improving their emotional well-being with MoodMate.</p>
              <Link to="/signup">
                <Button className="h-12 px-8 text-base bg-mood-purple hover:bg-mood-purple-dark">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;

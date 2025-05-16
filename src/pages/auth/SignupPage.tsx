
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // This would connect to your backend API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Successful signup
      toast({
        title: "Account created!",
        description: "Welcome to MoodMate. Your journey to better emotional well-being starts now.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call for Google auth
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Google account connected!",
        description: "Welcome to MoodMate.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Google sign up failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-mood-neutral-dark">Create your account</h1>
            <p className="text-mood-neutral mt-2">Start tracking your emotional well-being today</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-md border">
            <Button 
              variant="outline" 
              className="w-full mb-6 h-12"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google" 
                className="w-5 h-5 mr-2"
              />
              <span>Sign up with Google</span>
            </Button>
            
            <div className="flex items-center my-6">
              <Separator className="flex-grow" />
              <span className="px-4 text-xs text-mood-neutral uppercase">or</span>
              <Separator className="flex-grow" />
            </div>
            
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-mood-purple hover:bg-mood-purple-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : (
                    <>
                      Create Account
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-mood-neutral">
              Already have an account?{" "}
              <Link to="/login" className="text-mood-purple font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupPage;

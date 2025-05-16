
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // This would connect to your backend API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Successful login
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in to MoodMate.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call for Google auth
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Google login successful!",
        description: "Welcome back to MoodMate.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Google login failed",
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
            <h1 className="text-3xl font-bold text-mood-neutral-dark">Welcome back</h1>
            <p className="text-mood-neutral mt-2">Log in to continue your emotional well-being journey</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-md border">
            <Button 
              variant="outline" 
              className="w-full mb-6 h-12"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google" 
                className="w-5 h-5 mr-2"
              />
              <span>Log in with Google</span>
            </Button>
            
            <div className="flex items-center my-6">
              <Separator className="flex-grow" />
              <span className="px-4 text-xs text-mood-neutral uppercase">or</span>
              <Separator className="flex-grow" />
            </div>
            
            <form onSubmit={handleLogin}>
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
                
                <div className="flex justify-end">
                  <Link to="/forgot-password" className="text-sm text-mood-purple hover:underline">
                    Forgot password?
                  </Link>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-mood-purple hover:bg-mood-purple-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-mood-neutral">
              Don't have an account?{" "}
              <Link to="/signup" className="text-mood-purple font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;

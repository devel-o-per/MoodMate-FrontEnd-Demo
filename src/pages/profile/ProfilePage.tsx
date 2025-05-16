
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Settings } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [name, setName] = useState('Sam Johnson');
  const [email, setEmail] = useState('sam@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [journalReminders, setJournalReminders] = useState(true);
  const [moodReminders, setMoodReminders] = useState(false);
  
  // Privacy preferences
  const [anonymizedData, setAnonymizedData] = useState(true);
  const [activityHistory, setActivityHistory] = useState(true);
  
  const { toast } = useToast();

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new password and confirmation match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      setIsLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handlePrivacyUpdate = () => {
    toast({
      title: "Privacy settings saved",
      description: "Your privacy preferences have been updated.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully.",
    });
    
    // Simulate logout and redirect
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-mood-purple-light/30">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-mood-neutral-dark mb-2">Account Settings</h1>
          <p className="text-mood-neutral mb-8">Manage your profile and preferences</p>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/3">
              <Card>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://images.unsplash.com/photo-1579017331263-ef82f0bbc748" />
                      <AvatarFallback className="bg-mood-purple text-white text-xl">SJ</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 text-center">
                      <h2 className="text-xl font-semibold">{name}</h2>
                      <p className="text-sm text-mood-neutral">{email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Member since</span>
                      <span className="font-medium">May 10, 2025</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Journal entries</span>
                      <span className="font-medium">28</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Average mood</span>
                      <span className="font-medium">6.8/10</span>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-rose-500 hover:text-rose-600 hover:bg-rose-50 border-rose-200"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your basic profile information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileUpdate}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                              id="name" 
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-6">
                          <Button 
                            type="submit"
                            className="bg-mood-purple hover:bg-mood-purple-dark"
                            disabled={isLoading}
                          >
                            {isLoading ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Change your password</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordUpdate}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input 
                              id="currentPassword" 
                              type="password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input 
                              id="newPassword" 
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input 
                              id="confirmPassword" 
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-6">
                          <Button 
                            type="submit"
                            className="bg-mood-purple hover:bg-mood-purple-dark"
                            disabled={isLoading}
                          >
                            {isLoading ? "Updating..." : "Update Password"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Notifications Tab */}
                <TabsContent value="notifications" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Control how and when we contact you</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Email Notifications</h3>
                          <p className="text-sm text-mood-neutral">Receive email updates about your account</p>
                        </div>
                        <Switch 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Weekly Report</h3>
                          <p className="text-sm text-mood-neutral">Get a summary of your emotional well-being each week</p>
                        </div>
                        <Switch 
                          checked={weeklyReport} 
                          onCheckedChange={setWeeklyReport}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Journal Reminders</h3>
                          <p className="text-sm text-mood-neutral">Receive reminders to write in your journal</p>
                        </div>
                        <Switch 
                          checked={journalReminders} 
                          onCheckedChange={setJournalReminders}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Mood Check-ins</h3>
                          <p className="text-sm text-mood-neutral">Get reminders to track your mood throughout the day</p>
                        </div>
                        <Switch 
                          checked={moodReminders} 
                          onCheckedChange={setMoodReminders}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="bg-mood-purple hover:bg-mood-purple-dark ml-auto"
                        onClick={handleNotificationUpdate}
                      >
                        <Settings size={16} className="mr-2" />
                        Save Notification Settings
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Privacy Tab */}
                <TabsContent value="privacy" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Manage your data and privacy preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Share Anonymized Data</h3>
                          <p className="text-sm text-mood-neutral">Allow us to use anonymized data to improve our AI model</p>
                        </div>
                        <Switch 
                          checked={anonymizedData} 
                          onCheckedChange={setAnonymizedData}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Activity History</h3>
                          <p className="text-sm text-mood-neutral">Store your activity history for personalized insights</p>
                        </div>
                        <Switch 
                          checked={activityHistory} 
                          onCheckedChange={setActivityHistory}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Data Control</h3>
                        <div className="flex gap-4">
                          <Button variant="outline" size="sm">
                            Export My Data
                          </Button>
                          <Button variant="outline" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 border-rose-200">
                            Delete My Account
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="bg-mood-purple hover:bg-mood-purple-dark ml-auto"
                        onClick={handlePrivacyUpdate}
                      >
                        <Settings size={16} className="mr-2" />
                        Save Privacy Settings
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;

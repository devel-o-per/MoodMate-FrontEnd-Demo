
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ArrowRight, Heart, MessageSquare, Plus, Settings } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data
const moodHistory = [
  { date: 'Mon', mood: 7, description: 'Happy' },
  { date: 'Tue', mood: 5, description: 'Neutral' },
  { date: 'Wed', mood: 3, description: 'Sad' },
  { date: 'Thu', mood: 4, description: 'Neutral' },
  { date: 'Fri', mood: 8, description: 'Very Happy' },
  { date: 'Sat', mood: 6, description: 'Content' },
  { date: 'Sun', mood: 7, description: 'Happy' },
];

const emotions = [
  { name: 'Joy', value: 35 },
  { name: 'Contentment', value: 25 },
  { name: 'Anxiety', value: 20 },
  { name: 'Sadness', value: 10 },
  { name: 'Anger', value: 5 },
  { name: 'Surprise', value: 5 },
];

const recentEntries = [
  {
    id: 1,
    date: '2025-05-15',
    preview: 'Had a productive day at work. Felt accomplished after completing the project ahead of schedule.',
    mood: 8,
    moodDescription: 'Happy'
  },
  {
    id: 2,
    date: '2025-05-14',
    preview: 'Feeling a bit stressed about the upcoming presentation. Need to prepare better.',
    mood: 4,
    moodDescription: 'Anxious'
  },
  {
    id: 3,
    date: '2025-05-13',
    preview: 'Spent time with friends today. It was really refreshing to catch up after so long.',
    mood: 9,
    moodDescription: 'Very Happy'
  },
];

const getEmotionColor = (emotion: string) => {
  const colors: Record<string, string> = {
    'Joy': '#9b87f5',
    'Contentment': '#33C3F0',
    'Anxiety': '#FFB84D',
    'Sadness': '#6C757D',
    'Anger': '#FF6B6B',
    'Surprise': '#6BCB77'
  };
  
  return colors[emotion] || '#9b87f5';
};

const getMoodColor = (mood: number) => {
  if (mood >= 8) return '#9b87f5'; // Happy
  if (mood >= 6) return '#33C3F0'; // Content
  if (mood >= 4) return '#FFB84D'; // Neutral
  if (mood >= 2) return '#6C757D'; // Sad
  return '#FF6B6B'; // Very Sad
};

const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  return (
    <div className="flex flex-col min-h-screen bg-mood-purple-light/30">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-grow container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-mood-neutral-dark">Welcome back, Sam</h1>
            <p className="text-mood-neutral">Here's an overview of your emotional well-being</p>
          </div>
          
          <div className="flex gap-3">
            <Link to="/journal/new">
              <Button className="bg-mood-purple hover:bg-mood-purple-dark">
                <Plus size={18} className="mr-1" />
                New Journal Entry
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood trend chart */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mood Trends</CardTitle>
                    <CardDescription>How your mood has changed over time</CardDescription>
                  </div>
                  
                  <div className="flex bg-secondary rounded-lg overflow-hidden">
                    <button 
                      className={`px-3 py-1 text-sm ${timeRange === 'week' ? 'bg-mood-purple text-white' : ''}`}
                      onClick={() => setTimeRange('week')}
                    >
                      Week
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${timeRange === 'month' ? 'bg-mood-purple text-white' : ''}`}
                      onClick={() => setTimeRange('month')}
                    >
                      Month
                    </button>
                    <button 
                      className={`px-3 py-1 text-sm ${timeRange === 'year' ? 'bg-mood-purple text-white' : ''}`}
                      onClick={() => setTimeRange('year')}
                    >
                      Year
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moodHistory}>
                      <defs>
                        <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <Tooltip 
                        formatter={(value, name) => [`Mood: ${value}/10 (${moodHistory.find(m => m.mood === value)?.description})`, '']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#9b87f5" 
                        strokeWidth={2}
                        fill="url(#moodGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent journal entries */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Journal Entries</CardTitle>
                <CardDescription>Your latest thoughts and reflections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEntries.map(entry => (
                    <div key={entry.id} className="p-4 border rounded-lg hover:bg-secondary/30 transition-colors">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-mood-neutral">{entry.date}</span>
                        <div className="flex items-center">
                          <span className="text-sm mr-1">{entry.moodDescription}</span>
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: getMoodColor(entry.mood) }}
                          ></div>
                        </div>
                      </div>
                      <p className="text-sm line-clamp-2">{entry.preview}</p>
                      <Link to={`/journal/${entry.id}`} className="text-mood-purple text-sm mt-2 inline-block hover:underline">
                        Read more
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/journal">
                  <Button variant="outline" size="sm">
                    View All Entries
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Today's mood */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Today's Mood</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-mood-purple-light flex items-center justify-center mb-2">
                    <Heart size={32} className="text-mood-purple" />
                  </div>
                  <span className="text-2xl font-bold">8/10</span>
                  <span className="text-mood-neutral">Happy</span>
                </div>
                
                <div className="mt-4">
                  <Link to="/journal/new">
                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare size={16} className="mr-1" />
                      Update Today's Entry
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            {/* Emotional breakdown */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Emotional Analysis</CardTitle>
                <CardDescription>Your emotions this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emotions.map(emotion => (
                    <div key={emotion.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{emotion.name}</span>
                        <span className="text-sm font-medium">{emotion.value}%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${emotion.value}%`, 
                            backgroundColor: getEmotionColor(emotion.name)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Suggestions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Suggestions For You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-mood-purple-light/50 rounded-lg">
                    <p className="text-sm">Try a 5-minute mindfulness exercise to reduce stress levels.</p>
                  </div>
                  <div className="p-3 bg-mood-purple-light/50 rounded-lg">
                    <p className="text-sm">Your mood improves after physical activity. Consider a short walk today.</p>
                  </div>
                  <div className="p-3 bg-mood-purple-light/50 rounded-lg">
                    <p className="text-sm">Journaling before bed has been helping your sleep quality.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  <Settings size={16} className="mr-1" />
                  Customize Suggestions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock data
const journalEntries = [
  {
    id: 1,
    date: '2025-05-15',
    title: 'Daily Reflection',
    content: 'Had a productive day at work. Felt accomplished after completing the project ahead of schedule. Met with friends for dinner and enjoyed catching up.',
    mood: 8,
    moodLabel: 'Happy',
    emotions: ['Productive', 'Social', 'Relaxed']
  },
  {
    id: 2,
    date: '2025-05-14',
    title: 'Mixed Feelings',
    content: 'Feeling a bit stressed about the upcoming presentation. Need to prepare better. However, the morning meditation session helped calm my nerves somewhat.',
    mood: 4,
    moodLabel: 'Anxious',
    emotions: ['Stressed', 'Worried', 'Focused']
  },
  {
    id: 3,
    date: '2025-05-13',
    title: 'Great Day',
    content: 'Spent time with friends today. It was really refreshing to catch up after so long. We went hiking and the weather was perfect.',
    mood: 9,
    moodLabel: 'Very Happy',
    emotions: ['Joyful', 'Energetic', 'Connected']
  },
  {
    id: 4,
    date: '2025-05-12',
    title: 'Monday Blues',
    content: 'Started the week feeling a bit down. Work was overwhelming and I didn\'t sleep well last night. Need to focus on better sleep habits.',
    mood: 3,
    moodLabel: 'Sad',
    emotions: ['Tired', 'Overwhelmed', 'Unmotivated']
  },
  {
    id: 5,
    date: '2025-05-11',
    title: 'Weekend Reflection',
    content: 'Had a relaxing weekend at home. Caught up on reading and did some light cleaning. Feeling ready for the week ahead despite some lingering worries.',
    mood: 6,
    moodLabel: 'Content',
    emotions: ['Calm', 'Rested', 'Thoughtful']
  },
];

const getMoodColor = (mood: number) => {
  if (mood >= 8) return 'bg-mood-purple'; // Happy
  if (mood >= 6) return 'bg-mood-blue'; // Content
  if (mood >= 4) return 'bg-amber-400'; // Neutral
  if (mood >= 2) return 'bg-gray-400'; // Sad
  return 'bg-red-400'; // Very Sad
};

const getMoodTextColor = (mood: number) => {
  if (mood >= 8) return 'text-mood-purple'; // Happy
  if (mood >= 6) return 'text-mood-blue'; // Content
  if (mood >= 4) return 'text-amber-500'; // Neutral
  if (mood >= 2) return 'text-gray-500'; // Sad
  return 'text-red-500'; // Very Sad
};

const JournalListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterMood, setFilterMood] = useState('all');
  
  const filteredEntries = journalEntries.filter(entry => {
    // Apply mood filter
    if (filterMood !== 'all') {
      const moodValue = parseInt(filterMood);
      if (entry.mood < moodValue || entry.mood >= moodValue + 2) {
        return false;
      }
    }
    
    // Apply search filter
    if (searchTerm) {
      return entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'highest-mood') {
      return b.mood - a.mood;
    } else { // lowest-mood
      return a.mood - b.mood;
    }
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-mood-purple-light/30">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-grow container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-mood-neutral-dark">Your Journal</h1>
            <p className="text-mood-neutral">Review and reflect on your emotional journey</p>
          </div>
          
          <Link to="/journal/new">
            <Button className="bg-mood-purple hover:bg-mood-purple-dark">
              <Plus size={18} className="mr-1" />
              New Entry
            </Button>
          </Link>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Filter & Search</CardTitle>
            <CardDescription>Find specific journal entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mood-neutral" size={18} />
                <Input
                  placeholder="Search your journal entries..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:w-2/5">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="highest-mood">Highest mood</SelectItem>
                    <SelectItem value="lowest-mood">Lowest mood</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterMood} onValueChange={setFilterMood}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by mood" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All moods</SelectItem>
                    <SelectItem value="8">Very happy</SelectItem>
                    <SelectItem value="6">Happy</SelectItem>
                    <SelectItem value="4">Neutral</SelectItem>
                    <SelectItem value="2">Sad</SelectItem>
                    <SelectItem value="0">Very sad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          {sortedEntries.length > 0 ? (
            sortedEntries.map(entry => (
              <Link to={`/journal/${entry.id}`} key={entry.id}>
                <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{entry.title}</h3>
                      <p className="text-sm text-mood-neutral">{entry.date}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`${getMoodTextColor(entry.mood)} text-sm font-medium mr-2`}>{entry.moodLabel}</span>
                      <div className={`${getMoodColor(entry.mood)} w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                        {entry.mood}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-mood-neutral-dark line-clamp-2 mb-4">
                    {entry.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {entry.emotions.map(emotion => (
                      <span 
                        key={emotion}
                        className="text-xs bg-mood-purple-light text-mood-purple-dark px-2 py-1 rounded-full"
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-mood-neutral text-lg mb-4">No journal entries match your search</p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setFilterMood('all');
              }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JournalListPage;

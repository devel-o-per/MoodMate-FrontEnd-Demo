
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MessageSquare, Smile, Frown, ArrowRight } from 'lucide-react';

const JournalEntryPage: React.FC = () => {
  const [journalText, setJournalText] = useState('');
  const [moodScore, setMoodScore] = useState([5]);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sentimentResult, setSentimentResult] = useState<null | {
    mood: number;
    emotions: { name: string; score: number }[];
    summary: string;
  }>(null);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const getMoodLabel = (score: number) => {
    if (score >= 8) return 'Very Happy';
    if (score >= 6) return 'Happy';
    if (score >= 4) return 'Neutral';
    if (score >= 2) return 'Sad';
    return 'Very Sad';
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Voice recording started",
        description: "Start speaking about how you feel today...",
      });
      
      // Simulating recording and transcription
      setTimeout(() => {
        setIsRecording(false);
        setJournalText(
          "Today was overall pretty good. I had a productive morning and got a lot done at work. " +
          "I felt a bit stressed during the team meeting, but it went better than expected. " +
          "I'm looking forward to the weekend, but feel a bit anxious about the upcoming project deadline."
        );
        
        toast({
          title: "Recording complete",
          description: "Your voice entry has been transcribed.",
        });
      }, 3000);
    }
  };

  const analyzeSentiment = () => {
    if (!journalText.trim()) {
      toast({
        title: "Empty entry",
        description: "Please write or record something before analyzing.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call to backend for sentiment analysis
    setTimeout(() => {
      // Mock response
      setSentimentResult({
        mood: 7,
        emotions: [
          { name: 'Productive', score: 35 },
          { name: 'Anxious', score: 25 },
          { name: 'Optimistic', score: 20 },
          { name: 'Stressed', score: 15 },
          { name: 'Content', score: 5 },
        ],
        summary: "Your entry shows a mix of positive productivity and mild anxiety. You seem optimistic overall while managing some stress about deadlines."
      });
      
      setMoodScore([7]);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "Your mood and emotions have been analyzed.",
      });
    }, 2000);
  };

  const saveJournalEntry = () => {
    if (!journalText.trim()) {
      toast({
        title: "Empty entry",
        description: "Please write or record something before saving.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call to save entry
    toast({
      title: "Journal entry saved",
      description: "Your mood and thoughts have been recorded successfully.",
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-mood-purple-light/30">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-grow container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-mood-neutral-dark mb-2">New Journal Entry</h1>
          <p className="text-mood-neutral mb-8">Express how you're feeling today</p>
          
          <div className="bg-white rounded-2xl shadow-md border p-6 mb-8">
            <Tabs defaultValue="write" className="mb-6">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="write">
                  <MessageSquare size={18} className="mr-2" />
                  Write
                </TabsTrigger>
                <TabsTrigger value="speak">
                  <MessageSquare size={18} className="mr-2" />
                  Speak
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="space-y-4">
                <Textarea 
                  placeholder="How are you feeling today? Write about your thoughts, feelings, and experiences..."
                  className="min-h-[200px] resize-none"
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                />
              </TabsContent>
              
              <TabsContent value="speak" className="space-y-4">
                <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed rounded-lg bg-secondary/50">
                  <Button
                    variant={isRecording ? "destructive" : "outline"}
                    size="lg"
                    className={`mb-4 ${isRecording ? 'animate-pulse' : ''}`}
                    onClick={handleVoiceRecord}
                  >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </Button>
                  <p className="text-sm text-mood-neutral">
                    {isRecording 
                      ? "Recording... Speak clearly about how you're feeling today" 
                      : "Click to start recording your voice entry"}
                  </p>
                </div>
                
                {journalText && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Transcription:</h3>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p>{journalText}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <div className="border-t pt-6 mt-6">
              <h3 className="font-medium mb-4">How would you rate your mood today?</h3>
              
              <div className="flex items-center mb-6">
                <Frown size={24} className="text-mood-neutral mr-4" />
                <div className="flex-grow">
                  <Slider
                    value={moodScore}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={setMoodScore}
                  />
                </div>
                <Smile size={24} className="text-mood-neutral ml-4" />
              </div>
              
              <div className="text-center mb-8">
                <span className="text-2xl font-medium">{moodScore[0]}/10</span>
                <p className="text-mood-neutral">{getMoodLabel(moodScore[0])}</p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  onClick={analyzeSentiment}
                  disabled={!journalText.trim() || isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze My Mood"}
                </Button>
                <Button 
                  className="bg-mood-purple hover:bg-mood-purple-dark"
                  onClick={saveJournalEntry}
                >
                  Save Entry
                </Button>
              </div>
            </div>
          </div>
          
          {sentimentResult && (
            <div className="bg-white rounded-2xl shadow-md border p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">Your Mood Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-3">AI-detected mood</h3>
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-mood-purple-light flex items-center justify-center">
                      <span className="text-xl font-bold">{sentimentResult.mood}/10</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{getMoodLabel(sentimentResult.mood)}</p>
                      <p className="text-sm text-mood-neutral">Based on your entry</p>
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-3">Emotions detected</h3>
                  <div className="space-y-2">
                    {sentimentResult.emotions.map(emotion => (
                      <div key={emotion.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{emotion.name}</span>
                          <span>{emotion.score}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-mood-purple rounded-full"
                            style={{ width: `${emotion.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Summary</h3>
                  <p className="bg-mood-purple-light/50 p-4 rounded-lg">
                    {sentimentResult.summary}
                  </p>
                  
                  <div className="mt-8">
                    <h3 className="font-medium mb-3">Suggestions</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <ArrowRight size={16} className="text-mood-purple mt-1 mr-2 flex-shrink-0" />
                        <span>Try breaking down your project into smaller tasks to reduce deadline anxiety.</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight size={16} className="text-mood-purple mt-1 mr-2 flex-shrink-0" />
                        <span>Your productivity is high - maintain your morning routine as it seems effective.</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight size={16} className="text-mood-purple mt-1 mr-2 flex-shrink-0" />
                        <span>Consider a brief relaxation exercise before team meetings to reduce stress.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JournalEntryPage;

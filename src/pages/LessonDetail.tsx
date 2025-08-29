
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Volume2, Play, Pause, CheckCircle, Star } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AudioService } from '@/services/audioService';

const LessonDetail = () => {
  const { subject, id } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const audioService = AudioService.getInstance();

  // Sample lesson content - in a real app, this would come from an API
  const lessonContent = {
    title: "Counting Numbers 1-20",
    slides: [
      {
        title: "Welcome to Counting!",
        content: "Today we're going to learn how to count from 1 to 20. Are you ready for this fun adventure?",
        image: "🎉",
        audio: "Welcome to counting! Today we're going to learn how to count from 1 to 20. Are you ready for this fun adventure?"
      },
      {
        title: "Numbers 1-5",
        content: "Let's start with the first five numbers: 1, 2, 3, 4, 5",
        image: "🔢",
        audio: "Let's start with the first five numbers: One, two, three, four, five!"
      },
      {
        title: "Practice Time!",
        content: "Now let's practice! Can you count these apples?",
        image: "🍎🍎🍎",
        audio: "Now let's practice! Can you count these apples? Count with me: one, two, three apples!"
      },
      {
        title: "Numbers 6-10",
        content: "Great job! Now let's learn 6, 7, 8, 9, 10",
        image: "✋",
        audio: "Great job! Now let's learn six, seven, eight, nine, ten!"
      },
      {
        title: "Excellent Work!",
        content: "You've completed the lesson! You can now count from 1 to 10!",
        image: "🏆",
        audio: "Excellent work! You've completed the lesson! You can now count from 1 to 10! Congratulations!"
      }
    ]
  };

  const handlePlayAudio = async () => {
    const currentAudio = lessonContent.slides[currentSlide].audio;
    if (isPlaying) {
      audioService.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      try {
        await audioService.playText(currentAudio);
        setIsPlaying(false);
      } catch (error) {
        console.error('Audio playback failed:', error);
        setIsPlaying(false);
      }
    }
  };

  const handleNext = () => {
    audioService.stop();
    setIsPlaying(false);
    
    if (currentSlide < lessonContent.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    audioService.stop();
    setIsPlaying(false);
    
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = () => {
    navigate(`/quiz/${subject}/${id}`);
  };

  useEffect(() => {
    return () => {
      audioService.stop();
    };
  }, []);

  const progress = ((currentSlide + 1) / lessonContent.slides.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-eduplay-blue to-eduplay-purple text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to={`/lessons/${subject}`}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lessons
              </Button>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                Slide {currentSlide + 1} of {lessonContent.slides.length}
              </div>
              <div className="w-32">
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="container mx-auto px-4 py-8">
        {!completed ? (
          <Card className="max-w-4xl mx-auto border-0 playful-shadow">
            <CardContent className="p-8">
              <div className="text-center space-y-8">
                <div className="text-8xl mb-6">
                  {lessonContent.slides[currentSlide].image}
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800">
                  {lessonContent.slides[currentSlide].title}
                </h2>
                
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  {lessonContent.slides[currentSlide].content}
                </p>

                {/* Audio Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    onClick={handlePlayAudio}
                    className="bg-gradient-to-r from-eduplay-orange to-eduplay-pink text-lg px-6 py-3"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'} Audio
                  </Button>
                  <Button variant="outline" onClick={handlePlayAudio} className="text-lg px-6 py-3">
                    <Volume2 className="w-5 h-5 mr-2" />
                    Listen Again
                  </Button>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between pt-8">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentSlide === 0}
                    variant="outline"
                    size="lg"
                    className="text-lg px-6 py-3"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="bg-gradient-to-r from-eduplay-blue to-eduplay-purple text-lg px-6 py-3"
                  >
                    {currentSlide === lessonContent.slides.length - 1 ? 'Finish Lesson' : 'Next'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Completion Screen
          <Card className="max-w-2xl mx-auto border-0 playful-shadow">
            <CardContent className="p-8 text-center space-y-6">
              <div className="text-8xl">🎉</div>
              <h2 className="text-3xl font-bold text-gray-800">Lesson Complete!</h2>
              <p className="text-xl text-gray-600">
                Amazing work! You've successfully completed this lesson.
              </p>
              
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <span className="text-lg font-semibold text-green-600">+3 Stars Earned!</span>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleComplete}
                  size="lg"
                  className="bg-gradient-to-r from-eduplay-green to-eduplay-blue text-lg px-8 py-3"
                >
                  Take Quiz Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <div>
                  <Link to={`/lessons/${subject}`}>
                    <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                      Back to Lessons
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;

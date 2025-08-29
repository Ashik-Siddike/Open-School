import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Star, Trophy, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NurseryMath = () => {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const lessons = [
    {
      id: 1,
      title: "Count the Footballs! 🏈",
      question: "How many footballs do you see?",
      footballCount: 3,
      options: [1, 2, 3, 4],
      correctAnswer: 3,
      explanation: "Great job! There are 3 footballs!"
    },
    {
      id: 2,
      title: "More Footballs! ⚽",
      question: "Count all the footballs:",
      footballCount: 5,
      options: [4, 5, 6, 7],
      correctAnswer: 5,
      explanation: "Excellent! You counted 5 footballs correctly!"
    },
    {
      id: 3,
      title: "Big Football Collection! 🏆",
      question: "How many footballs are there?",
      footballCount: 7,
      options: [6, 7, 8, 9],
      correctAnswer: 7,
      explanation: "Amazing! You found all 7 footballs!"
    },
    {
      id: 4,
      title: "Football Addition! ➕",
      question: "If we have 2 footballs and add 3 more, how many do we have?",
      footballCount: 5,
      showAddition: true,
      firstGroup: 2,
      secondGroup: 3,
      options: [4, 5, 6, 7],
      correctAnswer: 5,
      explanation: "Perfect! 2 + 3 = 5 footballs!"
    }
  ];

  const currentLessonData = lessons[currentLesson];

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === currentLessonData.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const renderFootballs = (count: number, className = "") => {
    return Array.from({ length: count }).map((_, index) => (
      <div 
        key={index} 
        className={`w-16 h-16 lg:w-20 lg:h-20 animate-bounce-gentle ${className}`}
        style={{ animationDelay: `${index * 200}ms` }}
      >
        <img 
          src="/assets/football.png" 
          alt="Football" 
          className="w-full h-full object-contain drop-shadow-lg hover:scale-110 transition-transform duration-300" 
        />
      </div>
    ));
  };

  const renderAdditionProblem = () => {
    if (!currentLessonData.showAddition) return null;
    
    return (
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* First Group */}
        <div className="flex gap-2 p-4 bg-blue-100 rounded-2xl">
          {renderFootballs(currentLessonData.firstGroup)}
        </div>
        
        {/* Plus Sign */}
        <div className="text-6xl font-bold text-eduplay-purple animate-pulse">+</div>
        
        {/* Second Group */}
        <div className="flex gap-2 p-4 bg-green-100 rounded-2xl">
          {renderFootballs(currentLessonData.secondGroup)}
        </div>
        
        {/* Equals Sign */}
        <div className="text-6xl font-bold text-eduplay-orange animate-pulse">=</div>
        
        {/* Question Mark */}
        <div className="text-8xl font-bold text-eduplay-pink animate-wiggle">?</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => navigate('/')} 
            variant="outline"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">Score: {score}/{lessons.length}</span>
            </div>
            <div className="text-sm text-gray-600">
              Lesson {currentLesson + 1} of {lessons.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div 
            className="bg-gradient-to-r from-eduplay-green to-eduplay-blue h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentLesson + 1) / lessons.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              {currentLessonData.title}
            </CardTitle>
            <p className="text-xl lg:text-2xl text-gray-600 font-semibold">
              {currentLessonData.question}
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Football Display Area */}
            <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-8 min-h-[300px] flex items-center justify-center">
              {currentLessonData.showAddition ? (
                renderAdditionProblem()
              ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                  {renderFootballs(currentLessonData.footballCount)}
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {currentLessonData.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                  className={`h-20 text-2xl font-bold rounded-2xl transition-all duration-300 ${
                    selectedAnswer === option
                      ? option === currentLessonData.correctAnswer
                        ? 'bg-green-500 hover:bg-green-600 text-white animate-bounce'
                        : 'bg-red-500 hover:bg-red-600 text-white animate-wiggle'
                      : 'bg-gradient-to-r from-eduplay-purple to-eduplay-blue hover:scale-105'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Result Display */}
            {showResult && (
              <div className={`text-center p-6 rounded-2xl ${
                selectedAnswer === currentLessonData.correctAnswer
                  ? 'bg-green-100 border-2 border-green-300'
                  : 'bg-red-100 border-2 border-red-300'
              }`}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {selectedAnswer === currentLessonData.correctAnswer ? (
                    <>
                      <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
                      <span className="text-2xl font-bold text-green-600">Correct!</span>
                      <Trophy className="w-8 h-8 text-yellow-500 animate-bounce" />
                    </>
                  ) : (
                    <>
                      <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                      <span className="text-2xl font-bold text-red-600">Try Again!</span>
                      <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                    </>
                  )}
                </div>
                <p className="text-lg text-gray-700 font-semibold">
                  {currentLessonData.explanation}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6">
              <Button
                onClick={prevLesson}
                disabled={currentLesson === 0}
                variant="outline"
                className="flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentLesson === lessons.length - 1 ? (
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-eduplay-green to-eduplay-blue hover:scale-105 transition-transform px-8"
                >
                  Finish & Go Home
                  <Trophy className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={nextLesson}
                  disabled={!showResult}
                  className="flex items-center gap-2 bg-gradient-to-r from-eduplay-purple to-eduplay-pink hover:scale-105 transition-transform"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-12 h-12 opacity-20 animate-float">
          <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-40 right-20 w-8 h-8 opacity-15 animate-bounce-gentle">
          <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-32 left-1/4 w-10 h-10 opacity-10 animate-wiggle">
          <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-6 h-6 opacity-20 animate-scale-bounce">
          <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Celebration Animation */}
      {showResult && selectedAnswer === currentLessonData.correctAnswer && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce">🎉</div>
          <div className="absolute top-1/3 right-1/4 text-6xl animate-wiggle">⭐</div>
          <div className="absolute bottom-1/3 left-1/3 text-6xl animate-float">🏆</div>
          <div className="absolute bottom-1/4 right-1/3 text-6xl animate-pulse">🎊</div>
        </div>
      )}
    </div>
  );
};

export default NurseryMath;
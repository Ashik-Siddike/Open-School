
import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Star, Trophy } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const QuizPage = () => {
  const { subject, id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Sample quiz questions - in a real app, this would come from an API
  const quizData = {
    title: "Counting Numbers Quiz",
    questions: [
      {
        id: 1,
        type: "multiple-choice",
        question: "How many apples are there?",
        image: "🍎🍎🍎",
        options: ["2", "3", "4", "5"],
        correct: "3"
      },
      {
        id: 2,
        type: "multiple-choice", 
        question: "What comes after 7?",
        image: "7️⃣",
        options: ["6", "8", "9", "10"],
        correct: "8"
      },
      {
        id: 3,
        type: "multiple-choice",
        question: "Count the stars!",
        image: "⭐⭐⭐⭐⭐",
        options: ["4", "5", "6", "7"],
        correct: "5"
      }
    ]
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setShowResult(true);
      
      setTimeout(() => {
        if (currentQuestion < quizData.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer('');
          setShowResult(false);
        } else {
          setQuizCompleted(true);
        }
      }, 2000);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData.questions[index].correct) {
        correct++;
      }
    });
    return correct;
  };

  const getStarsEarned = () => {
    const score = calculateScore();
    const percentage = (score / quizData.questions.length) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 50) return 1;
    return 0;
  };

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
  const currentQ = quizData.questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  if (quizCompleted) {
    const score = calculateScore();
    const starsEarned = getStarsEarned();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto border-0 playful-shadow">
            <CardContent className="p-8 text-center space-y-6">
              <div className="text-8xl">
                {starsEarned >= 2 ? '🎉' : starsEarned === 1 ? '👍' : '🤔'}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800">
                {starsEarned >= 2 ? 'Excellent Work!' : starsEarned === 1 ? 'Good Job!' : 'Keep Trying!'}
              </h2>
              
              <div className="space-y-4">
                <div className="text-xl text-gray-600">
                  You got <span className="font-bold text-eduplay-blue">{score}</span> out of{' '}
                  <span className="font-bold">{quizData.questions.length}</span> questions correct!
                </div>
                
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <span className="text-lg font-semibold">+{starsEarned} Stars Earned!</span>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < starsEarned ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link to={`/lessons/${subject}`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-eduplay-green to-eduplay-blue"
                  >
                    Back to Lessons
                  </Button>
                </Link>
                
                <div>
                  <Link to="/dashboard">
                    <Button variant="outline" size="lg">
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-eduplay-purple to-eduplay-pink text-white py-4">
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
                Question {currentQuestion + 1} of {quizData.questions.length}
              </div>
              <div className="w-32">
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto border-0 playful-shadow">
          <CardContent className="p-8">
            {!showResult ? (
              <div className="space-y-8">
                <div className="text-center space-y-6">
                  <div className="text-6xl">{currentQ.image}</div>
                  <h2 className="text-2xl font-bold text-gray-800">{currentQ.question}</h2>
                </div>

                <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                  <div className="grid grid-cols-2 gap-4">
                    {currentQ.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label 
                          htmlFor={`option-${index}`}
                          className="flex-1 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-eduplay-blue transition-colors"
                        >
                          <div className="text-center text-xl font-semibold">{option}</div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="text-center">
                  <Button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    size="lg"
                    className="bg-gradient-to-r from-eduplay-blue to-eduplay-purple"
                  >
                    {currentQuestion === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              // Result for current question
              <div className="text-center space-y-6">
                <div className="text-8xl">
                  {isCorrect ? <CheckCircle className="w-20 h-20 text-green-500 mx-auto" /> : <XCircle className="w-20 h-20 text-red-500 mx-auto" />}
                </div>
                
                <h2 className="text-3xl font-bold">
                  {isCorrect ? 'Correct! 🎉' : 'Not quite right 🤔'}
                </h2>
                
                <p className="text-xl text-gray-600">
                  {isCorrect 
                    ? 'Great job! You got it right!' 
                    : `The correct answer is ${currentQ.correct}`
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;

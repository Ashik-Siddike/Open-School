import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Star } from 'lucide-react';

interface CountingRow {
  id: number;
  footballs: number;
  userAnswer: string;
  isCorrect: boolean | null;
}

const CountingGame: React.FC = () => {
  const [rows, setRows] = useState<CountingRow[]>([
    { id: 1, footballs: 3, userAnswer: '', isCorrect: null },
    { id: 2, footballs: 6, userAnswer: '', isCorrect: null },
    { id: 3, footballs: 8, userAnswer: '', isCorrect: null },
    { id: 4, footballs: 2, userAnswer: '', isCorrect: null },
  ]);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const handleAnswerChange = (id: number, value: string) => {
    setRows(prev => prev.map(row => 
      row.id === id ? { ...row, userAnswer: value, isCorrect: null } : row
    ));
  };

  const checkAnswer = (id: number) => {
    const row = rows.find(r => r.id === id);
    if (!row) return;
    
    const isCorrect = parseInt(row.userAnswer) === row.footballs;
    setRows(prev => prev.map(r => 
      r.id === id ? { ...r, isCorrect } : r
    ));
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const checkAllAnswers = () => {
    rows.forEach(row => {
      if (row.userAnswer) {
        checkAnswer(row.id);
      }
    });
    setGameCompleted(true);
  };

  const resetGame = () => {
    setRows(prev => prev.map(row => ({
      ...row,
      userAnswer: '',
      isCorrect: null
    })));
    setScore(0);
    setGameCompleted(false);
  };

  const renderFootball = (key: string) => (
    <div key={key} className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-2 border-white shadow-md animate-bounce-gentle"></div>
  );

  const renderFootballRow = (row: CountingRow) => (
    <div key={row.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 shadow-lg">
      {/* Football Box */}
      <div className="flex items-center justify-center w-32 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300 p-2">
        <div className="flex flex-wrap gap-1 justify-center items-center">
          {Array.from({ length: row.footballs }, (_, i) => renderFootball(`football-${row.id}-${i}`))}
        </div>
      </div>
      
      {/* Arrow */}
      <div className="text-2xl text-blue-500 animate-pulse">→</div>
      
      {/* Answer Input */}
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="0"
          max="20"
          value={row.userAnswer}
          onChange={(e) => handleAnswerChange(row.id, e.target.value)}
          className="w-16 h-12 text-center text-2xl font-bold border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="?"
          disabled={gameCompleted}
        />
        
        {/* Check Button */}
        {!gameCompleted && (
          <Button
            onClick={() => checkAnswer(row.id)}
            disabled={!row.userAnswer}
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            ✓
          </Button>
        )}
        
        {/* Result Icon */}
        {row.isCorrect !== null && (
          <div className="text-2xl">
            {row.isCorrect ? (
              <CheckCircle className="text-green-500 animate-bounce" />
            ) : (
              <XCircle className="text-red-500 animate-bounce" />
            )}
          </div>
        )}
      </div>
      
      {/* Correct Answer (shown after game completion) */}
      {gameCompleted && (
        <div className="text-lg font-semibold text-gray-600">
          সঠিক উত্তর: <span className="text-blue-600 font-bold">{row.footballs}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border-4 border-eduplay-purple/20">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-eduplay-purple mb-4 flex items-center justify-center gap-3">
          <span>⚽ ফুটবল গণনা খেলা</span>
          <Star className="text-yellow-500 animate-spin" />
        </h2>
        <p className="text-lg text-gray-600">
          প্রতিটি বক্সে থাকা ফুটবলগুলো গণনা করে সঠিক সংখ্যা লিখুন!
        </p>
      </div>

      {/* Game Instructions */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-200 mb-6">
        <h3 className="font-bold text-lg text-yellow-800 mb-2">📋 খেলার নিয়ম:</h3>
        <ul className="text-yellow-700 space-y-1">
          <li>• প্রতিটি নীল বক্সে কয়টি ফুটবল আছে তা গণনা করুন</li>
          <li>• ডান দিকে ফাঁকা জায়গায় সংখ্যা লিখুন</li>
          <li>• ✓ বাটনে ক্লিক করে উত্তর চেক করুন</li>
          <li>• সব উত্তর দিয়ে "সব উত্তর চেক করুন" বাটনে ক্লিক করুন</li>
        </ul>
      </div>

      {/* Game Rows */}
      <div className="space-y-4 mb-8">
        {rows.map(renderFootballRow)}
      </div>

      {/* Game Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        {!gameCompleted ? (
          <Button
            onClick={checkAllAnswers}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white text-lg px-8 py-3 hover:scale-105 transition-transform"
          >
            🎯 সব উত্তর চেক করুন
          </Button>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-bold text-eduplay-purple mb-2">
              🎉 খেলা শেষ! আপনার স্কোর: {score}/{rows.length}
            </div>
            <div className="text-lg text-gray-600">
              {score === rows.length ? 'অসাধারণ! সব উত্তর সঠিক!' : 'আরও চেষ্টা করুন!'}
            </div>
          </div>
        )}
        
        <Button
          onClick={resetGame}
          variant="outline"
          size="lg"
          className="border-2 border-eduplay-purple text-eduplay-purple hover:bg-eduplay-purple hover:text-white text-lg px-6 py-3"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          নতুন করে খেলুন
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${(score / rows.length) * 100}%` }}
        ></div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        অগ্রগতি: {score} / {rows.length}
      </div>
    </div>
  );
};

export default CountingGame;









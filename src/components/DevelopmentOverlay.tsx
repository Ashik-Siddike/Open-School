import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Construction, Sparkles } from 'lucide-react';

const DevelopmentOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 z-50 flex items-center justify-center">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-60 animate-bounce-gentle"></div>
        <div className="absolute top-32 right-20 w-12 h-12 bg-green-300 rounded-full opacity-70 animate-float delay-300"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-pink-300 rounded-full opacity-50 animate-wiggle delay-500"></div>
        <div className="absolute bottom-32 right-10 w-14 h-14 bg-blue-300 rounded-full opacity-60 animate-scale-bounce delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-10 h-10 bg-orange-300 rounded-full opacity-40 animate-float delay-1000"></div>
        <div className="absolute top-20 right-1/4 w-8 h-8 bg-red-300 rounded-full opacity-50 animate-bounce-gentle delay-1200"></div>
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto px-6">
        {/* Construction Icon */}
        <div className="mb-6 animate-wiggle">
          <Construction className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <div className="text-4xl">🚧</div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 animate-fade-in">
            🚧 Site is Under Development
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-2 animate-fade-in delay-300">
            We're building something amazing for young learners! 🎓
          </p>
          <p className="text-base sm:text-lg text-white/80 animate-fade-in delay-500">
            Our learning playground is getting ready for your adventure!
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mb-8 animate-fade-in delay-700">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" />
            <span className="text-white/80 text-lg">Building magic...</span>
            <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" />
          </div>
          
          {/* Loading dots */}
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-green-300 rounded-full animate-bounce delay-150"></div>
            <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce delay-300"></div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="animate-fade-in delay-1000">
          <Button 
            onClick={handleClose}
            size="lg"
            className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            Continue Learning! 🚀
          </Button>
        </div>

        {/* Fun emoji row */}
        <div className="mt-8 flex justify-center gap-4 text-3xl animate-fade-in delay-1200">
          <span className="animate-bounce-gentle">🎨</span>
          <span className="animate-float delay-200">📚</span>
          <span className="animate-wiggle delay-400">⭐</span>
          <span className="animate-scale-bounce delay-600">🎉</span>
          <span className="animate-bounce-gentle delay-800">🌈</span>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentOverlay;

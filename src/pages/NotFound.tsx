
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, BookOpen, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-60 animate-bounce-gentle"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-300 rounded-full opacity-70 animate-float delay-300"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-300 rounded-full opacity-50 animate-wiggle delay-500"></div>
        <div className="absolute bottom-32 right-10 w-18 h-18 bg-blue-300 rounded-full opacity-60 animate-scale-bounce delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-orange-300 rounded-full opacity-40 animate-float delay-1000"></div>
      </div>

      <div className="text-center relative z-10 max-w-2xl mx-auto px-6">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent animate-scale-bounce">
            404
          </h1>
        </div>

        {/* Sad Face Icon */}
        <div className="mb-6 animate-wiggle">
          <div className="text-6xl">😕</div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-fade-in">
            Oops! Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-2 animate-fade-in delay-300">
            It looks like this page went on an adventure without us! 🚀
          </p>
          <p className="text-base sm:text-lg text-white/80 animate-fade-in delay-500">
            Let's get you back to the learning playground where all the fun happens!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-700">
          <Button 
            asChild
            size="lg"
            className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            <a href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Learning Fun
            </a>
          </Button>

          <Button 
            asChild
            size="lg" 
            variant="outline"
            className="bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300 min-w-[200px] border-2"
          >
            <a href="/teams" className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Explore Subjects
            </a>
          </Button>
        </div>

        {/* Fun Learning Icons */}
        <div className="mt-12 flex justify-center gap-8 animate-fade-in delay-1000">
          <div className="text-4xl animate-bounce-gentle">
            <BookOpen className="w-8 h-8 text-white/70" />
          </div>
          <div className="text-4xl animate-float delay-300">
            <Gamepad2 className="w-8 h-8 text-white/70" />
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-8 animate-fade-in delay-1000">
          <p className="text-sm text-white/70 italic">
            "Every great learner gets lost sometimes, but they always find their way back to knowledge! 🌟"
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import ClassSelector from '@/components/ClassSelector';
import SubjectsSection from '@/components/SubjectsSection';
import FeaturesSection from '@/components/FeaturesSection';
import DashboardPreview from '@/components/DashboardPreview';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToSubjects) {
      const subjectsSection = document.getElementById('subjects');
      if (subjectsSection) {
        subjectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ClassSelector />
      <SubjectsSection />
      <FeaturesSection />
      <DashboardPreview />
      
      {/* Enhanced Footer with Football Theme */}
      <footer className="bg-gradient-to-r from-eduplay-purple via-eduplay-blue to-eduplay-green py-16 animate-fade-in relative overflow-hidden">
        {/* Background Football Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-4 left-10 w-12 h-12 animate-float">
            <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div className="absolute top-8 right-20 w-8 h-8 animate-bounce-gentle">
            <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-6 left-1/4 w-10 h-10 animate-wiggle">
            <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
          </div>
          <div className="absolute bottom-4 right-1/3 w-6 h-6 animate-scale-bounce">
            <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-white space-y-6">
            {/* Enhanced Logo Section */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 animate-bounce-gentle">
                <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain drop-shadow-lg" />
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold animate-bounce-gentle bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                247School
              </h3>
              <div className="w-16 h-16 animate-wiggle">
                <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain drop-shadow-lg" />
              </div>
            </div>
            
            <p className="text-xl lg:text-2xl opacity-90 animate-slide-in-right font-semibold">
              Learning 24/7, One Lesson at a Time! 🌟
            </p>
            
            {/* Fun Tagline */}
            <div className="inline-flex items-center bg-white/20 px-6 py-3 rounded-full border-2 border-white/30 animate-scale-in delay-300">
              <div className="w-8 h-8 mr-2 animate-bounce-gentle">
                <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-white">Where Learning Meets Fun!</span>
              <div className="w-8 h-8 ml-2 animate-wiggle">
                <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
              </div>
            </div>
            
            <div className="flex justify-center space-x-6 text-5xl lg:text-6xl py-4">
              <span className="animate-bounce-gentle hover:animate-rainbow cursor-pointer">🎓</span>
              <span className="animate-wiggle hover:animate-glow cursor-pointer">📚</span>
              <span className="animate-float hover:animate-rainbow cursor-pointer">⭐</span>
              <span className="animate-scale-bounce hover:animate-glow cursor-pointer">🏆</span>
              <span className="animate-pulse hover:animate-rainbow cursor-pointer">🚀</span>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto my-8">
              <div className="bg-white/20 rounded-2xl p-4 animate-fade-in delay-500">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm opacity-80">Happy Students</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 animate-fade-in delay-700">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-80">Fun Lessons</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 animate-fade-in delay-1000">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm opacity-80">Subjects</div>
              </div>
            </div>
            
            <p className="text-sm opacity-75 mt-8 animate-fade-in delay-500">
              © 2024 247School. Designed with ❤️ for young learners everywhere.
            </p>
            
            {/* Fun Footer Message */}
            <div className="text-lg font-semibold animate-pulse">
              🌟 Keep Learning, Keep Growing! 🌟
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

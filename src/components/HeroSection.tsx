import { Play, Sparkles, BookOpen, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const HeroSection = () => {
  const navigate = useNavigate();

  // ডাইনামিক স্ট্যাটস
  const [stats, setStats] = useState({
    students: 0,
    lessons: 0,
    subjects: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      // তিনটা আলাদা কুয়েরি
      const { data: studentsData } = await supabase.rpc('count_profiles');
      const { data: lessonsData } = await supabase.rpc('count_contents');
      const { data: subjectsData } = await supabase.rpc('count_subjects');
      setStats({
        students: studentsData || 0,
        lessons: lessonsData || 0,
        subjects: subjectsData || 0,
      });
    };
    fetchStats();
  }, []);

  const handleStartLearning = () => {
    const subjectsSection = document.getElementById('subjects');
    if (subjectsSection) {
      subjectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreSubjects = () => {
    const subjectsSection = document.getElementById('subjects');
    if (subjectsSection) {
      subjectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-12 lg:py-24 overflow-hidden">
      {/* Background Elements - Adjusted for mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-10 lg:top-20 left-5 lg:left-10 w-12 lg:w-20 h-12 lg:h-20 bg-eduplay-yellow/30 rounded-full animate-float"></div>
        <div className="absolute top-20 lg:top-40 right-10 lg:right-20 w-10 lg:w-16 h-10 lg:h-16 bg-eduplay-pink/30 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-8 lg:w-12 h-8 lg:h-12 bg-eduplay-green/30 rounded-full animate-wiggle"></div>
        <div className="absolute top-40 lg:top-60 left-1/2 w-6 lg:w-8 h-6 lg:h-8 bg-eduplay-orange/30 rounded-full animate-float"></div>
        <div className="absolute bottom-32 lg:bottom-40 right-1/3 w-10 lg:w-14 h-10 lg:h-14 bg-eduplay-blue/30 rounded-full animate-scale-bounce"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-gradient-to-r from-eduplay-purple/10 to-eduplay-blue/10 px-3 lg:px-4 py-2 rounded-full border border-eduplay-purple/20 animate-scale-in">
                <Sparkles className="w-4 lg:w-5 h-4 lg:h-5 text-eduplay-purple mr-2 animate-pulse" />
                <span className="text-eduplay-purple font-semibold text-sm lg:text-base">24/7 Learning Made Fun!</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
                <span className="bg-gradient-to-r from-eduplay-purple via-eduplay-blue to-eduplay-green bg-clip-text text-transparent animate-slide-in-right">
                  Welcome to
                </span>
                <br />
                <span className="bg-gradient-to-r from-eduplay-orange via-eduplay-pink to-eduplay-purple bg-clip-text text-transparent animate-bounce-gentle">
                  247School!
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed animate-fade-in delay-300">
                Where learning happens 24/7 with amazing adventures! 🚀
                <br />
                <span className="text-base lg:text-lg">Join thousands of kids having fun while learning Math, English, Bangla & Science!</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start animate-fade-in delay-500">
              <Button 
                size="lg" 
                onClick={handleStartLearning}
                className="bg-gradient-to-r from-eduplay-green to-eduplay-blue hover:shadow-xl transform hover:scale-110 transition-all duration-500 text-lg lg:text-xl py-4 lg:py-6 px-6 lg:px-8 rounded-2xl animate-wiggle hover:animate-scale-bounce w-full sm:w-auto"
              >
                <Play className="w-5 lg:w-6 h-5 lg:h-6 mr-2 lg:mr-3 animate-spin" />
                Start Learning
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleExploreSubjects}
                className="border-2 border-eduplay-purple text-eduplay-purple hover:bg-eduplay-purple hover:text-white text-lg lg:text-xl py-4 lg:py-6 px-6 lg:px-8 rounded-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <BookOpen className="w-5 lg:w-6 h-5 lg:h-6 mr-2 lg:mr-3 animate-wiggle" />
                Explore Subjects
              </Button>
            </div>

            {/* Stats - Mobile Optimized */}
            <div className="grid grid-cols-3 gap-2 lg:gap-4 pt-6 lg:pt-8 animate-fade-in delay-700">
              <div className="text-center p-3 lg:p-4 bg-white/50 rounded-2xl playful-shadow hover:scale-105 transition-all duration-300 animate-float cursor-pointer">
                <div className="text-lg lg:text-2xl font-bold text-eduplay-purple">{stats.students}+</div>
                <div className="text-xs lg:text-sm text-gray-600">Happy Students</div>
              </div>
              <div className="text-center p-3 lg:p-4 bg-white/50 rounded-2xl playful-shadow hover:scale-105 transition-all duration-300 animate-bounce-gentle cursor-pointer">
                <div className="text-lg lg:text-2xl font-bold text-eduplay-green">{stats.lessons}+</div>
                <div className="text-xs lg:text-sm text-gray-600">Fun Lessons</div>
              </div>
              <div className="text-center p-3 lg:p-4 bg-white/50 rounded-2xl playful-shadow hover:scale-105 transition-all duration-300 animate-wiggle cursor-pointer">
                <div className="text-lg lg:text-2xl font-bold text-eduplay-orange">{stats.subjects}</div>
                <div className="text-xs lg:text-sm text-gray-600">Subjects</div>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Illustration with Football */}
          <div className="relative animate-scale-in delay-300 mt-8 lg:mt-0">
            {/* Floating Elements Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-4 right-4 w-16 h-16 bg-eduplay-yellow/30 rounded-full animate-float"></div>
              <div className="absolute bottom-8 left-4 w-12 h-12 bg-eduplay-green/30 rounded-full animate-bounce-gentle"></div>
              <div className="absolute top-1/2 left-0 w-8 h-8 bg-eduplay-pink/30 rounded-full animate-wiggle"></div>
            </div>
            
            <div className="bg-gradient-to-br from-eduplay-blue/20 via-eduplay-purple/20 to-eduplay-pink/20 rounded-3xl p-4 lg:p-8 playful-shadow hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer relative overflow-hidden">
              {/* Sparkle Effects */}
              <div className="absolute top-2 left-2 w-2 h-2 bg-eduplay-yellow rounded-full animate-ping"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-eduplay-pink rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-eduplay-green rounded-full animate-bounce"></div>
              
              <div className="aspect-square bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 lg:p-8 flex items-center justify-center relative">
                <div className="text-center space-y-4 lg:space-y-6 relative z-10">
                  {/* Football Image Integration */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto relative">
                      <img 
                        src="/assets/football.png" 
                        alt="Football" 
                        className="w-full h-full object-contain animate-bounce-gentle drop-shadow-lg"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-eduplay-yellow rounded-full animate-ping"></div>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-eduplay-green rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="text-4xl lg:text-6xl animate-wiggle">🎓</div>
                  <div className="flex justify-center space-x-2 lg:space-x-4">
                    <span className="text-2xl lg:text-4xl animate-float">⭐</span>
                    <div className="w-8 h-8 lg:w-12 lg:h-12 animate-scale-bounce">
                      <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-8 h-8 lg:w-12 lg:h-12 animate-float delay-300">
                      <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  
                  {/* Enhanced Love Badge */}
                  <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-eduplay-yellow/30 to-eduplay-pink/30 px-4 lg:px-6 py-3 rounded-full animate-pulse border-2 border-eduplay-purple/20">
                    <Heart className="w-5 lg:w-6 h-5 lg:h-6 text-eduplay-red animate-wiggle" />
                    <span className="font-bold text-eduplay-purple text-sm lg:text-base">Made with Love</span>
                    <Sparkles className="w-4 lg:w-5 h-4 lg:h-5 text-eduplay-yellow animate-pulse" />
                  </div>
                  
                  {/* Fun Learning Badge */}
                  <div className="bg-gradient-to-r from-eduplay-green to-eduplay-blue text-white px-4 py-2 rounded-full text-sm font-bold animate-scale-bounce">
                    🚀 Fun Learning Adventure!
                  </div>
                  
                  {/* Football Math Interactive Button */}
                  <div 
                    onClick={() => navigate('/nursery-math')}
                    className="bg-gradient-to-r from-eduplay-orange via-eduplay-pink to-eduplay-purple text-white px-6 py-3 rounded-2xl text-sm font-bold animate-glow cursor-pointer hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-6 h-6 animate-bounce-gentle">
                        <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
                      </div>
                      <span>Try Football Math!</span>
                      <div className="w-6 h-6 animate-wiggle">
                        <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    {/* Sparkle effects */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1 right-1 w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="grid grid-cols-6 gap-4 h-full">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className="bg-eduplay-purple rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

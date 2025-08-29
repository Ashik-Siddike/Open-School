import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Sparkles, Star, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ClassSelector = () => {
  const navigate = useNavigate();

  // ডাইনামিক grades
  const [grades, setGrades] = useState<{ id: number; name: string }[]>([]);
  const [loadingGrades, setLoadingGrades] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      setLoadingGrades(true);
      const { data, error } = await supabase
        .from('grades')
        .select('id, name')
        .order('id', { ascending: true });
      if (!error && data) {
        setGrades(data);
      }
      setLoadingGrades(false);
    };
    fetchGrades();
  }, []);

  const handleGradeSelect = (gradeName: string) => {
    navigate(`/class/${gradeName.replace(/ /g, '-').toLowerCase()}`);
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-purple-50/40 to-blue-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-20">✨</div>
        <div className="absolute top-40 right-20 text-5xl animate-bounce-gentle opacity-30">🌟</div>
        <div className="absolute bottom-32 left-20 text-4xl animate-wiggle opacity-25">🎨</div>
        <div className="absolute bottom-20 right-16 text-5xl animate-pulse opacity-20">🚀</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-3 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
            <span className="text-purple-700 font-semibold">Start Your Learning Adventure</span>
            <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 animate-fade-in leading-tight">
            Choose Your 
            <span className="block bg-gradient-to-r from-eduplay-purple via-eduplay-blue to-eduplay-green bg-clip-text text-transparent animate-scale-bounce">
              Learning Level
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto animate-fade-in delay-150 leading-relaxed">
            Select your current grade to access curriculum designed specifically for your level. 
            <span className="block mt-2 text-purple-600 font-medium">Every journey begins with a single step! 🌟</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {loadingGrades ? (
            <div className="col-span-full text-center text-gray-400 text-lg py-8">লোড হচ্ছে...</div>
          ) : grades.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 text-lg py-8">কোনো ক্লাস পাওয়া যায়নি</div>
          ) : (
            grades.map((grade, index) => {
              // সুন্দর গ্রেডিয়েন্ট কালার সেট
              const colorSets = [
                'from-pink-200 via-purple-200 to-blue-200 border-pink-300 hover:from-pink-300 hover:to-blue-300',
                'from-yellow-200 via-green-200 to-teal-200 border-yellow-300 hover:from-yellow-300 hover:to-teal-300',
                'from-blue-200 via-cyan-200 to-indigo-200 border-blue-300 hover:from-blue-300 hover:to-indigo-300',
                'from-rose-200 via-orange-100 to-yellow-100 border-rose-300 hover:from-rose-300 hover:to-yellow-200',
                'from-green-200 via-lime-100 to-emerald-100 border-green-300 hover:from-green-300 hover:to-emerald-200',
                'from-purple-200 via-fuchsia-100 to-pink-100 border-purple-300 hover:from-purple-300 hover:to-pink-200',
              ];
              const color = colorSets[index % colorSets.length];
              return (
                <div key={grade.id} className={`grade-${grade.id}`}>
                  <Card
                    className={`bg-gradient-to-br ${color} border-2 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-200/40 animate-fade-in transform hover:-translate-y-2 group relative overflow-hidden`}
                    style={{ animationDelay: `${index * 120}ms` }}
                    onClick={() => handleGradeSelect(grade.name)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${grade.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleGradeSelect(grade.name);
                      }
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <CardContent className="p-6 text-center relative z-10">
                      <div className="text-4xl mb-3 animate-bounce-gentle group-hover:animate-wiggle">
                        🎓
                      </div>
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <GraduationCap className="w-7 h-7 text-gray-700 group-hover:text-purple-600 transition-colors duration-300" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                        {grade.name}
                      </h3>
                      <div className="flex justify-center items-center space-x-1 mb-3">
                        <Star className="w-3 h-3 text-yellow-500 animate-pulse" />
                        <Star className="w-3 h-3 text-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <Star className="w-3 h-3 text-yellow-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs bg-white/80 px-3 py-1 rounded-full text-purple-700 font-semibold shadow-md">
                          Click to Explore!
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })
          )}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-white via-purple-50/80 to-white rounded-3xl p-10 shadow-2xl max-w-3xl mx-auto border border-purple-100 backdrop-blur-sm relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 text-2xl">📚</div>
              <div className="absolute top-8 right-8 text-2xl">🎓</div>
              <div className="absolute bottom-6 left-8 text-2xl">✨</div>
              <div className="absolute bottom-4 right-6 text-2xl">🌟</div>
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <Trophy className="w-12 h-12 text-yellow-500 animate-bounce-gentle" />
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                Ready to Start Your 
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Learning Journey?</span>
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Choose any grade above to explore subjects and lessons designed just for that level! 
                <span className="block mt-2 font-medium text-purple-600">
                  Each grade is carefully crafted to match your learning needs. 🎯
                </span>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-sm font-semibold text-gray-700">Interactive Lessons</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-sm font-semibold text-gray-700">Fun Activities</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.4s' }}></div>
                  <span className="text-sm font-semibold text-gray-700">Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassSelector;

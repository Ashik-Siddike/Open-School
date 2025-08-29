import { Calculator, BookOpen, Beaker, Globe, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// ডিফল্ট সাবজেক্ট (যদি ইউজার না থাকে)
const defaultSubjects = [
  {
    id: 'math',
    title: 'Mathematics',
    description: 'Numbers, shapes, and problem-solving adventures!',
    icon: Calculator,
    color: 'bg-gradient-to-br from-blue-100 to-purple-100',
    iconColor: 'text-blue-600',
    buttonColor: 'bg-gradient-to-r from-blue-500 to-purple-600',
    route: '/lessons/math',
    emoji: '🔢'
  },
  {
    id: 'english',
    title: 'English',
    description: 'Stories, grammar, and vocabulary building!',
    icon: BookOpen,
    color: 'bg-gradient-to-br from-green-100 to-blue-100',
    iconColor: 'text-green-600',
    buttonColor: 'bg-gradient-to-r from-green-500 to-blue-600',
    route: '/lessons/english',
    emoji: '📚'
  },
  {
    id: 'bangla',
    title: 'বাংলা (Bangla)',
    description: 'আমাদের সুন্দর ভাষা এবং সাহিত্য!',
    icon: Globe,
    color: 'bg-gradient-to-br from-orange-100 to-pink-100',
    iconColor: 'text-orange-600',
    buttonColor: 'bg-gradient-to-r from-orange-500 to-pink-600',
    route: '/lessons/bangla',
    emoji: '🇧🇩'
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Discover the wonders of our amazing world!',
    icon: Beaker,
    color: 'bg-gradient-to-br from-purple-100 to-pink-100',
    iconColor: 'text-purple-600',
    buttonColor: 'bg-gradient-to-r from-purple-500 to-pink-600',
    route: '/lessons/science',
    emoji: '🔬'
  }
];

// Nursery ক্লাসের জন্য বিশেষ সাবজেক্ট
const nurserySubjects = [
  {
    id: 'football-math',
    title: 'Football Math',
    description: 'Learn counting and basic math with footballs!',
    icon: Calculator,
    color: 'bg-gradient-to-br from-orange-100 to-pink-100',
    iconColor: 'text-orange-600',
    buttonColor: 'bg-gradient-to-r from-orange-500 to-pink-600',
    route: '/nursery-math',
    emoji: '⚽',
    isFootballMath: true
  },
  {
    id: 'basic-english',
    title: 'Basic English',
    description: 'Learn letters, words, and simple sentences!',
    icon: BookOpen,
    color: 'bg-gradient-to-br from-green-100 to-blue-100',
    iconColor: 'text-green-600',
    buttonColor: 'bg-gradient-to-r from-green-500 to-blue-600',
    route: '/lessons/english',
    emoji: '🔤'
  },
  {
    id: 'basic-bangla',
    title: 'বেসিক বাংলা',
    description: 'বর্ণ, শব্দ এবং সহজ বাক্য শিখুন!',
    icon: Globe,
    color: 'bg-gradient-to-br from-purple-100 to-pink-100',
    iconColor: 'text-purple-600',
    buttonColor: 'bg-gradient-to-r from-purple-500 to-pink-600',
    route: '/lessons/bangla',
    emoji: '🇧🇩'
  },
  {
    id: 'colors-shapes',
    title: 'Colors & Shapes',
    description: 'Discover colors, shapes, and patterns!',
    icon: Beaker,
    color: 'bg-gradient-to-br from-yellow-100 to-orange-100',
    iconColor: 'text-yellow-600',
    buttonColor: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    route: '/lessons/science',
    emoji: '🌈'
  }
];

const getColorForIndex = (index: number) => {
  const colors = [
    'bg-gradient-to-br from-blue-100 to-purple-100',
    'bg-gradient-to-br from-green-100 to-blue-100',
    'bg-gradient-to-br from-orange-100 to-pink-100',
    'bg-gradient-to-br from-purple-100 to-pink-100',
    'bg-gradient-to-br from-yellow-100 to-orange-100',
    'bg-gradient-to-br from-pink-100 to-red-100',
  ];
  return colors[index % colors.length];
};

const getButtonColorForIndex = (index: number) => {
  const colors = [
    'bg-gradient-to-r from-blue-500 to-purple-600',
    'bg-gradient-to-r from-green-500 to-blue-600',
    'bg-gradient-to-r from-orange-500 to-pink-600',
    'bg-gradient-to-r from-purple-500 to-pink-600',
    'bg-gradient-to-r from-yellow-500 to-orange-600',
    'bg-gradient-to-r from-pink-500 to-red-600',
  ];
  return colors[index % colors.length];
};

const SubjectsSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // ইউজার আছে কিনা দেখুন
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        setUser(userData.user);
        // প্রোফাইল থেকে grade
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userData.user.id)
          .single();
        setProfile(profileData);
        if (profileData && profileData.grade) {
          // grade দিয়ে grade_id বের করুন
          const { data: gradeRow } = await supabase
            .from('grades')
            .select('id')
            .eq('name', profileData.grade)
            .single();
          if (gradeRow && gradeRow.id) {
            // grade_id দিয়ে subjects আনুন
            const { data: subjectsData } = await supabase
              .from('subjects')
              .select('*')
              .eq('grade_id', gradeRow.id);
            setSubjects(subjectsData || []);
          } else {
            setSubjects([]);
          }
        } else {
          setSubjects([]);
        }
      } else {
        setSubjects([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubjectClick = (subjectName: string, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      navigate(`/lessons/${subjectName.toLowerCase()}`);
    }
  };

  return (
    <section id="subjects" className="py-16 lg:py-24 bg-gradient-to-b from-white via-blue-50/20 to-purple-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-eduplay-yellow/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-eduplay-pink/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-eduplay-green/10 rounded-full animate-wiggle"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-eduplay-blue/10 rounded-full animate-scale-bounce"></div>
        
        {/* Floating Football Images */}
        <div className="absolute top-32 right-1/4 w-16 h-16 opacity-20 animate-float">
          <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute bottom-40 left-1/3 w-12 h-12 opacity-15 animate-bounce-gentle">
          <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-60 left-20 w-10 h-10 opacity-10 animate-wiggle">
          <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          {/* Enhanced Header with Football */}
          <div className="flex items-center justify-center mb-6 flex-wrap gap-4">
            <div className="w-16 h-16 animate-bounce-gentle">
              <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 animate-fade-in text-center">
              Choose Your <span className="bg-gradient-to-r from-eduplay-purple via-eduplay-blue to-eduplay-green bg-clip-text text-transparent animate-pulse">Learning Adventure</span>
            </h2>
            <div className="w-16 h-16 animate-wiggle">
              <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain drop-shadow-lg" />
            </div>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-150 mb-4">
            আপনার ক্লাস অনুযায়ী বিষয়গুলো দেখুন এবং শেখা শুরু করুন!
          </p>
          
          {/* Fun Subtitle */}
          <div className="inline-flex items-center bg-gradient-to-r from-eduplay-orange/20 to-eduplay-pink/20 px-6 py-3 rounded-full border-2 border-eduplay-orange/30 animate-scale-in delay-300">
            <div className="w-8 h-8 mr-2 animate-bounce-gentle">
              <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-eduplay-purple">Score Goals in Learning!</span>
            <div className="w-8 h-8 ml-2 animate-wiggle">
              <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-lg">লোড হচ্ছে...</div>
        ) : user && subjects.length === 0 ? (
          <div className="text-center text-lg text-red-500">আপনার ক্লাসের জন্য কোনো বিষয় পাওয়া যায়নি।</div>
        ) : user ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center max-w-4xl mx-auto">
            {/* যদি Nursery class হয় তাহলে nurserySubjects দেখান, নাহলে database থেকে আনা subjects */}
            {(profile?.grade === 'Nursery' ? nurserySubjects : subjects).map((subject, index) => (
              <div key={subject.id} className="relative group">
                {/* Shine effect */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute -left-1/2 top-0 w-full h-full bg-gradient-to-r from-white/30 via-white/60 to-white/10 blur-lg skew-x-12 animate-shine"></div>
                </div>
                <Card
                  className={`relative overflow-hidden ${getColorForIndex(index)} border-2 border-transparent group-hover:border-eduplay-purple/60 shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 cursor-pointer animate-fade-in hover:-rotate-1`}
                  style={{ animationDelay: `${index * 120}ms` }}
                  onClick={() => handleSubjectClick(subject.name, subject.route)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4 relative">
                      <span className="text-7xl lg:text-8xl drop-shadow-lg animate-bounce-gentle">📚</span>
                      {/* Small football decoration */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 opacity-60 animate-wiggle">
                        <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl font-extrabold text-gray-800 mb-1 group-hover:text-eduplay-purple transition-colors duration-300">
                      {subject.name}
                    </CardTitle>
                    {subject.description && <p className="text-gray-600 text-base lg:text-lg font-medium italic mb-2 animate-fade-in delay-200">{subject.description}</p>}
                    <div className="flex justify-center gap-2 mt-2">
                      <span className="bg-gradient-to-r from-eduplay-purple to-eduplay-blue text-white text-xs font-semibold px-3 py-1 rounded-full shadow animate-pulse">{profile?.grade || 'Subject'}</span>
                      <span className="bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow animate-bounce-gentle">Interactive</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      className={`w-full ${getButtonColorForIndex(index)} text-white font-bold text-lg py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-wiggle`}
                      onClick={e => {
                        e.stopPropagation();
                        handleSubjectClick(subject.name, subject.route);
                      }}
                    >
                      Start Learning
                      <ArrowRight className="w-5 h-5 ml-2 animate-pulse" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center max-w-4xl mx-auto">
            {defaultSubjects.map((subject, index) => (
              <div key={subject.id} className="relative group">
                {/* Shine effect */}
                <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute -left-1/2 top-0 w-full h-full bg-gradient-to-r from-white/30 via-white/60 to-white/10 blur-lg skew-x-12 animate-shine"></div>
                </div>
                <Card
                  className={`relative overflow-hidden ${subject.color} border-2 border-transparent group-hover:border-eduplay-purple/60 shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-500 cursor-pointer animate-fade-in hover:-rotate-1`}
                  style={{ animationDelay: `${index * 120}ms` }}
                  onClick={() => handleSubjectClick(subject.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4 relative">
                      <span className="text-7xl lg:text-8xl drop-shadow-lg animate-bounce-gentle">{subject.emoji}</span>
                      {/* Small football decoration */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 opacity-60 animate-wiggle">
                        <img src="/assets/football.png" alt="" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl font-extrabold text-gray-800 mb-1 group-hover:text-eduplay-purple transition-colors duration-300">
                      {subject.title}
                    </CardTitle>
                    <p className="text-gray-600 text-base lg:text-lg font-medium italic mb-2 animate-fade-in delay-200">{subject.description}</p>
                    <div className="flex justify-center gap-2 mt-2">
                      <span className="bg-gradient-to-r from-eduplay-purple to-eduplay-blue text-white text-xs font-semibold px-3 py-1 rounded-full shadow animate-pulse">Subject</span>
                      <span className="bg-gradient-to-r from-green-400 to-blue-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow animate-bounce-gentle">Interactive</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      className={`w-full ${subject.buttonColor} text-white font-bold text-lg py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-wiggle`}
                      onClick={e => {
                        e.stopPropagation();
                        handleSubjectClick(subject.id);
                      }}
                    >
                      Start Learning
                      <ArrowRight className="w-5 h-5 ml-2 animate-pulse" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 lg:mt-16 space-y-4">
          {/* Special Nursery Math Button */}
          <div className="mb-6">
            <Button 
              onClick={() => navigate('/nursery-math')}
              className="bg-gradient-to-r from-eduplay-orange via-eduplay-pink to-eduplay-purple text-white font-bold text-xl px-12 py-6 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 animate-glow relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 animate-bounce-gentle">
                  <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
                </div>
                <span>🎯 Try Nursery Math with Footballs! 🎯</span>
                <div className="w-8 h-8 animate-wiggle">
                  <img src="/assets/football.png" alt="Football" className="w-full h-full object-contain" />
                </div>
              </div>
              {/* Sparkle effect */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => navigate('/dashboard')}
            className="border-2 border-eduplay-purple text-eduplay-purple hover:bg-eduplay-purple hover:text-white text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 animate-fade-in delay-700"
          >
            View Progress Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
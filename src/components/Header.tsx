import { useState, useEffect } from 'react';
import { Menu, X, Star, Trophy, User, Home, BookOpen, BarChart3, Brain, GraduationCap, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/lib/supabaseClient';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ডাইনামিক grades
  const [grades, setGrades] = useState<{ id: number; name: string }[]>([]);
  const [loadingGrades, setLoadingGrades] = useState(true);

  const [user, setUser] = useState(null);

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

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    // Auth state change listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/subjects", label: "Subjects", icon: BookOpen },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ];

  const standards = [
    '1st Standard', '2nd Standard', '3rd Standard', '4th Standard', '5th Standard',
    '6th Standard', '7th Standard', '8th Standard', '9th Standard', '10th Standard'
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.includes(href.replace("#", ""));
  };

  const handleSubjectsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const subjectsSection = document.getElementById('subjects');
      if (subjectsSection) {
        subjectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToSubjects: true } });
    }
  };

  const handleProfileClick = () => {
    navigate('/dashboard');
    setIsMenuOpen(false);
  };

  const handleStandardSelect = (gradeName: string) => {
    // gradeName থেকে id বের করা লাগলে grades state ব্যবহার করা যাবে
    // এখানে ধরে নিচ্ছি name-ই route param
    navigate(`/class/${gradeName.replace(/ /g, '-').toLowerCase()}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b-2 border-eduplay-purple/20 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 animate-scale-in">
            <img 
              src="/assets/logo-2.png" 
              alt="247School Logo"
              className="h-8 lg:h-10 animate-bounce-gentle"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Home */}
            <Link
              to="/"
              className={`text-lg font-semibold transition-all duration-300 hover:scale-105 animate-fade-in flex items-center space-x-1 px-3 py-2 rounded-lg ${
                isActive("/")
                  ? 'text-eduplay-purple bg-eduplay-purple/10'
                  : 'text-gray-700 hover:text-eduplay-purple hover:bg-eduplay-purple/5'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            {/* Classes Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:text-eduplay-purple hover:bg-eduplay-purple/5"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Classes</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 bg-white/95 backdrop-blur-md border border-eduplay-purple/20 shadow-xl rounded-xl p-2 animate-in slide-in-from-top-2"
                sideOffset={8}
              >
                <div className="grid gap-1.5">
                  {loadingGrades ? (
                    <div className="px-3 py-2 text-gray-400">লোড হচ্ছে...</div>
                  ) : grades.length === 0 ? (
                    <div className="px-3 py-2 text-gray-400">কোনো ক্লাস নেই</div>
                  ) : (
                    grades.map((grade, index) => (
                      <DropdownMenuItem
                        key={grade.id}
                        onClick={() => handleStandardSelect(grade.name)}
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
                          hover:bg-gradient-to-r hover:from-eduplay-purple/10 hover:to-eduplay-blue/10
                          hover:text-eduplay-purple hover:scale-[1.02] active:scale-[0.98]
                          data-[highlighted]:bg-eduplay-purple/5"
                      >
                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-eduplay-purple/10 to-eduplay-blue/10">
                          <span className="text-sm font-semibold text-eduplay-purple">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-base font-medium">{grade.name}</span>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Subjects */}
            <Link
              to="/subjects"
              onClick={handleSubjectsClick}
              className={`text-lg font-semibold transition-all duration-300 hover:scale-105 animate-fade-in flex items-center space-x-1 px-3 py-2 rounded-lg ${
                isActive("/subjects")
                  ? 'text-eduplay-purple bg-eduplay-purple/10'
                  : 'text-gray-700 hover:text-eduplay-purple hover:bg-eduplay-purple/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Subjects</span>
            </Link>

            {/* Dashboard */}
            <Link
              to="/dashboard"
              className={`text-lg font-semibold transition-all duration-300 hover:scale-105 animate-fade-in flex items-center space-x-1 px-3 py-2 rounded-lg ${
                isActive("/dashboard")
                  ? 'text-eduplay-purple bg-eduplay-purple/10'
                  : 'text-gray-700 hover:text-eduplay-purple hover:bg-eduplay-purple/5'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {/* Teams Button */}
            <Link
              to="/teams"
              className="text-lg font-semibold transition-all duration-300 hover:scale-105 animate-fade-in flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:text-eduplay-purple hover:bg-eduplay-purple/5"
            >
              <Users className="w-4 h-4" />
              <span>Teams</span>
            </Link>

            {/* Admin Panel Button */}
            <Link
              to="/admin"
              className="text-lg font-semibold transition-all duration-300 hover:scale-105 animate-fade-in flex items-center space-x-1 px-3 py-2 rounded-lg text-red-700 hover:text-white hover:bg-red-500/80 bg-red-100 border border-red-200"
            >
              <Settings className="w-4 h-4" />
              <span>Admin Panel</span>
            </Link>
          </nav>

          {/* User Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-4 animate-fade-in delay-700">
            <div className="flex items-center bg-eduplay-yellow/20 px-3 py-2 rounded-full animate-bounce-gentle cursor-pointer">
              <Trophy className="w-5 h-5 text-eduplay-orange mr-2 animate-pulse" />
              <span className="font-bold text-eduplay-orange">1,250 ⭐</span>
            </div>
            {user ? (
              <>
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-eduplay-green to-eduplay-blue hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white ml-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-eduplay-purple to-eduplay-blue hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-eduplay-purple/10 hover:bg-eduplay-purple/20 transition-all duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-eduplay-purple animate-spin" />
            ) : (
              <Menu className="w-6 h-6 text-eduplay-purple animate-pulse" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-white rounded-2xl playful-shadow animate-scale-in border border-eduplay-purple/10">
            <nav className="flex flex-col space-y-1">
              {/* Home */}
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-300 animate-fade-in ${
                  isActive("/")
                    ? 'text-eduplay-purple bg-eduplay-purple/10'
                    : 'text-gray-700 hover:text-eduplay-purple hover:bg-eduplay-purple/5'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              
              {/* Mobile Classes Section */}
              <div className="pt-2 border-t border-gray-200 mt-2">
                <div className="flex items-center space-x-3 px-4 py-2 text-lg font-semibold text-gray-700">
                  <GraduationCap className="w-5 h-5" />
                  <span>Classes</span>
                </div>
                <div className="pl-8 space-y-1">
                  {loadingGrades ? (
                    <div className="px-4 py-2 text-gray-400">লোড হচ্ছে...</div>
                  ) : grades.length === 0 ? (
                    <div className="px-4 py-2 text-gray-400">কোনো ক্লাস নেই</div>
                  ) : (
                    grades.slice(0, 5).map((grade) => (
                      <button
                        key={grade.id}
                        onClick={() => {
                          handleStandardSelect(grade.name);
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-eduplay-purple hover:bg-eduplay-purple/5 rounded"
                      >
                        {grade.name}
                      </button>
                    ))
                  )}
                  {grades.length > 5 && (
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-500">
                      ... আরও ক্লাস
                    </button>
                  )}
                </div>
              </div>

              {/* Subjects */}
              <Link
                to="/subjects"
                onClick={(e) => {
                  handleSubjectsClick(e);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-300 animate-fade-in ${
                  isActive("/subjects")
                    ? 'text-eduplay-purple bg-eduplay-purple/10'
                    : 'text-gray-700 hover:text-eduplay-purple hover:bg-eduplay-purple/5'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Subjects</span>
              </Link>

              {/* Dashboard */}
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-semibold transition-all duration-300 animate-fade-in ${
                  isActive("/dashboard")
                    ? 'text-eduplay-purple bg-eduplay-purple/10'
                    : 'text-gray-700 hover:text-eduplay-purple hover:bg-eduplay-purple/5'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              {/* Mobile Teams */}
              <Link
                to="/teams"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-semibold text-gray-700 hover:text-eduplay-purple hover:bg-eduplay-purple/5"
              >
                <Users className="w-5 h-5" />
                <span>Teams</span>
              </Link>
              
              {/* Mobile User Actions */}
              <div className="pt-4 mt-4 border-t border-gray-200 animate-fade-in delay-500 space-y-3">
                <div className="flex items-center justify-center bg-eduplay-yellow/20 px-4 py-3 rounded-lg cursor-pointer">
                  <Trophy className="w-5 h-5 text-eduplay-orange mr-2 animate-wiggle" />
                  <span className="font-bold text-eduplay-orange text-lg">1,250 ⭐</span>
                </div>
                {user ? (
                  <>
                    <Button 
                      className="w-full bg-gradient-to-r from-eduplay-green to-eduplay-blue hover:scale-105 transition-all duration-300 py-3"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/profile');
                      }}
                    >
                      <User className="w-5 h-5 mr-2" />
                      Profile
                    </Button>
                    <Button
                      className="w-full bg-red-500 hover:bg-red-600 text-white mt-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-eduplay-purple to-eduplay-blue hover:scale-105 transition-all duration-300 py-3"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    Login
                  </Button>
                )}
              </div>

              {/* Admin Panel Button (Mobile) */}
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-semibold text-red-700 hover:text-white hover:bg-red-500/80 bg-red-100 border border-red-200 mt-2"
              >
                <Settings className="w-5 h-5" />
                <span>Admin Panel</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useState, useEffect } from 'react';
import { ArrowLeft, BarChart, Star, Trophy, Clock, Target, TrendingUp, Calendar, BookOpen, Award, Brain, Zap, Heart, Users, ChevronRight, Play, User, Percent, Rocket, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '../lib/supabaseClient';

const dummyStats = {
  stars: 1250,
  badges: 15,
  hours: 45,
  accuracy: 89,
  streak: 7,
};
const dummySubjects = [
  { name: 'Math', progress: 85, lessons: '17/20', score: 93, time: '12h 30m' },
  { name: 'English', progress: 72, lessons: '13/18', score: 88, time: '9h 45m' },
  { name: 'BD Bangla', progress: 90, lessons: '18/20', score: 92, time: '11h 20m' },
  { name: 'Science', progress: 67, lessons: '10/15', score: 83, time: '8h 15m' },
];
const dummyAchievements = [
  { title: 'Math Master', desc: 'Solved by pro-level', points: 100 },
  { title: 'Bookworm', desc: 'Read 25 stories!', points: 25 },
  { title: 'Star Collector', desc: 'Earned 1000 stars!', points: 150 },
  { title: 'Science Explorer', desc: 'Completed 10 experiments!', points: 40 },
];
const dummyFriends = [
  { name: 'Alex', stars: 1500, online: true },
  { name: 'Maya', stars: 1200, online: false },
  { name: 'Zara', stars: 1100, online: true },
];
const dummyGoals = [
  { title: 'Complete 10 Science Lessons', progress: 6, total: 10 },
  { title: 'Read 15 Stories', progress: 13, total: 15 },
  { title: 'Solve 100 Problems', progress: 78, total: 100 },
];
const dummyWeek = [3, 4, 5, 3, 6, 2, 5];
const dummyWeekTime = ['45m', '30m', '1h', '45m', '75m', '25m', '50m'];

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (!data.user) return;
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      setProfile(profileData);
      setLoading(false);
    };
    fetchUserProfile();
  }, []);

  if (loading) return <div className="text-center py-20 text-2xl">লোড হচ্ছে...</div>;
  if (!user || !profile) return <div className="text-center py-20 text-xl">প্রোফাইল ডেটা পাওয়া যায়নি</div>;

  const studentData = {
    name: profile.name || 'User',
    totalStars: dummyStats.stars,
    badges: dummyStats.badges,
    hoursLearned: dummyStats.hours,
    accuracy: dummyStats.accuracy,
    streak: dummyStats.streak,
    level: "Math Explorer",
    rank: 15,
    totalStudents: 150,
    subjects: [
      { 
        name: "Math", 
        progress: 85, 
        icon: "🔢", 
        color: "text-eduplay-blue",
        lessonsCompleted: 17,
        totalLessons: 20,
        lastScore: 95,
        timeSpent: "12h 30m"
      },
      { 
        name: "English", 
        progress: 72, 
        icon: "📖", 
        color: "text-eduplay-green",
        lessonsCompleted: 13,
        totalLessons: 18,
        lastScore: 88,
        timeSpent: "9h 45m"
      },
      { 
        name: "Bangla", 
        progress: 90, 
        icon: "🇧🇩", 
        color: "text-eduplay-orange",
        lessonsCompleted: 18,
        totalLessons: 20,
        lastScore: 92,
        timeSpent: "11h 20m"
      },
      { 
        name: "Science", 
        progress: 67, 
        icon: "🔬", 
        color: "text-eduplay-purple",
        lessonsCompleted: 10,
        totalLessons: 15,
        lastScore: 85,
        timeSpent: "8h 15m"
      }
    ],
    recentAchievements: [
      { title: "Math Master", description: "Solved 50 problems!", icon: "🏆", date: "Today", points: 100 },
      { title: "Bookworm", description: "Read 25 stories!", icon: "📚", date: "Yesterday", points: 75 },
      { title: "Star Collector", description: "Earned 1000 stars!", icon: "⭐", date: "2 days ago", points: 150 },
      { title: "Science Explorer", description: "Completed 10 experiments!", icon: "🧪", date: "3 days ago", points: 80 }
    ],
    weeklyActivity: [
      { day: "Mon", lessons: 3, stars: 12, minutes: 45 },
      { day: "Tue", lessons: 2, stars: 8, minutes: 30 },
      { day: "Wed", lessons: 4, stars: 15, minutes: 60 },
      { day: "Thu", lessons: 3, stars: 11, minutes: 40 },
      { day: "Fri", lessons: 5, stars: 18, minutes: 75 },
      { day: "Sat", lessons: 2, stars: 7, minutes: 25 },
      { day: "Sun", lessons: 1, stars: 4, minutes: 15 }
    ],
    favoriteSubjects: ["Math", "Science"],
    currentGoals: [
      { subject: "Science", target: 10, current: 6, description: "Complete 10 Science Lessons" },
      { subject: "English", target: 15, current: 13, description: "Read 15 Stories" },
      { subject: "Math", target: 100, current: 78, description: "Solve 100 Problems" }
    ],
    friends: [
      { name: "Alex", avatar: "👦", stars: 980, isOnline: true },
      { name: "Maya", avatar: "👧", stars: 1150, isOnline: false },
      { name: "Zara", avatar: "👧", stars: 1320, isOnline: true }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-0 md:p-6">
      {/* Header & Stats */}
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 p-8 md:p-12 mb-8 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-12 h-12 rounded-full bg-white/80 border-2 border-purple-200 flex items-center justify-center text-2xl shadow-lg overflow-hidden">
                  <img
                    src={profile.avatar_url || 'https://ui-avatars.com/api/?name=' + (profile.name || 'User')}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </span>
                <div>
                  <div className="text-lg md:text-2xl font-bold text-white drop-shadow">Welcome back, {profile.name || 'User'}! <span className="animate-wiggle">👋</span></div>
                  <div className="text-sm text-white/90">{profile.grade ? `Class: ${profile.grade}` : ''}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="bg-white/30 text-white px-3 py-1 rounded-full text-xs font-semibold">{profile.bio || 'Learner'}</span>
                {profile.address && <span className="bg-white/30 text-white px-3 py-1 rounded-full text-xs font-semibold">{profile.address}</span>}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-white/80 rounded-2xl px-6 py-4 flex flex-col items-center shadow-lg">
                <div className="text-3xl font-bold text-green-500">{profile.streak || 0}</div>
                <div className="text-xs font-semibold text-gray-700">Day Streak <span className="animate-bounce">🔥</span></div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-blue/10 to-eduplay-purple/10">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-eduplay-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-eduplay-purple">{studentData.totalStars}</div>
              <div className="text-sm text-gray-600">Total Stars</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-green/10 to-eduplay-blue/10">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-eduplay-yellow mx-auto mb-2" />
              <div className="text-2xl font-bold text-eduplay-green">{studentData.badges}</div>
              <div className="text-sm text-gray-600">Badges</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-orange/10 to-eduplay-pink/10">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-eduplay-pink mx-auto mb-2" />
              <div className="text-2xl font-bold text-eduplay-orange">{studentData.hoursLearned}</div>
              <div className="text-sm text-gray-600">Hours</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-purple/10 to-eduplay-pink/10">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-eduplay-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-eduplay-purple">{studentData.accuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
        </div>
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Progress & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subject Progress */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="w-6 h-6 text-eduplay-purple" />
                  <span>Subject Progress</span>
                  <span className="text-2xl">📚</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {studentData.subjects.map((subject, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{subject.icon}</span>
                        <span className="font-semibold text-gray-700">{subject.name}</span>
                      </div>
                      <Link to={`/lessons/${subject.name.toLowerCase()}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Play className="w-3 h-3 mr-1" />
                          Continue
                        </Button>
                      </Link>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Progress</div>
                        <div className={`font-bold ${subject.color}`}>{subject.progress}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Lessons</div>
                        <div className="font-bold">{subject.lessonsCompleted}/{subject.totalLessons}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Last Score</div>
                        <div className="font-bold text-green-600">{subject.lastScore}%</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Time Spent</div>
                        <div className="font-bold">{subject.timeSpent}</div>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-eduplay-blue" />
                  <span>This Week's Activity</span>
                  <span className="text-2xl">📊</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {studentData.weeklyActivity.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-600 mb-2">{day.day}</div>
                      <div className="bg-eduplay-blue/10 rounded-lg p-3 space-y-1">
                        <div className="text-sm font-bold text-eduplay-blue">{day.lessons}</div>
                        <div className="text-xs text-gray-600">lessons</div>
                        <div className="flex items-center justify-center">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          <span className="text-xs">{day.stars}</span>
                        </div>
                        <div className="text-xs text-gray-500">{day.minutes}m</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-6 h-6 text-eduplay-green" />
                  <span>Current Goals</span>
                  <span className="text-2xl">🎯</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {studentData.currentGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">{goal.description}</span>
                      <span className="text-sm font-bold">{goal.current}/{goal.target}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right: Achievements, Friends, Actions */}
          <div className="space-y-8">
            {/* Achievements */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-eduplay-yellow" />
                  <span>Recent Achievements</span>
                  <span className="text-2xl">🎉</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentData.recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-eduplay-yellow/10 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                      <div className="text-xs text-gray-500 mt-1">{achievement.date}</div>
                    </div>
                    <div className="text-xs font-bold text-eduplay-orange">+{achievement.points}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Friends */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-eduplay-pink" />
                  <span>Learning Friends</span>
                  <span className="text-2xl">👥</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentData.friends.map((friend, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-eduplay-pink/10 rounded-lg">
                    <div className="text-2xl relative">
                      {friend.avatar}
                      {friend.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{friend.name}</div>
                      <div className="text-xs text-gray-600">{friend.stars} stars</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {friend.isOnline ? '🟢 Online' : '⚫ Offline'}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-eduplay-green" />
                  <span>Quick Actions</span>
                  <span className="text-2xl">🚀</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/lessons/math" className="block">
                  <Button className="w-full bg-gradient-to-r from-eduplay-blue to-eduplay-purple">
                    Continue Math
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/lessons/english" className="block">
                  <Button className="w-full bg-gradient-to-r from-eduplay-green to-eduplay-blue">
                    Start English
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/lessons/science" className="block">
                  <Button className="w-full bg-gradient-to-r from-eduplay-purple to-eduplay-pink">
                    Explore Science
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Daily Motivation */}
            <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-orange/10 to-eduplay-pink/10">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">💪</div>
                <div className="text-lg font-bold text-eduplay-orange mb-2">You're doing great!</div>
                <div className="text-sm text-gray-700">Keep up the amazing work, {studentData.name}!</div>
                <div className="text-xs text-gray-600 mt-2">
                  "Learning is a treasure that will follow its owner everywhere!" ✨
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

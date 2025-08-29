
import { ArrowLeft, User, BarChart, Calendar, Trophy, Clock, AlertCircle, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ParentPanel = () => {
  const childData = {
    name: "Sarah",
    age: 8,
    grade: "Class 3",
    totalLearningTime: "45 hours",
    lessonsCompleted: 42,
    averageAccuracy: 89,
    currentStreak: 7,
    subjects: [
      { name: "Math", progress: 85, timeSpent: "12h", accuracy: 92, lastActivity: "Today" },
      { name: "English", progress: 72, timeSpent: "10h", accuracy: 88, lastActivity: "Yesterday" },
      { name: "Bangla", progress: 90, timeSpent: "15h", accuracy: 94, lastActivity: "Today" },
      { name: "Science", progress: 67, timeSpent: "8h", accuracy: 82, lastActivity: "2 days ago" }
    ],
    weeklyStats: {
      lessonsThisWeek: 12,
      starsEarned: 75,
      timeSpent: "8h 30m",
      improvement: "+15%"
    },
    recentActivity: [
      { subject: "Math", lesson: "Simple Addition", score: "3/3", time: "2 hours ago" },
      { subject: "Bangla", lesson: "বাংলা বর্ণমালা", score: "2/3", time: "5 hours ago" },
      { subject: "English", lesson: "ABC Letters", score: "3/3", time: "1 day ago" }
    ],
    recommendations: [
      "Sarah is doing great in Bangla! Consider encouraging more practice.",
      "Science progress could be improved with daily 15-minute sessions.",
      "Excellent streak! Reward Sarah for her consistency."
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-eduplay-purple to-eduplay-blue text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Parent Dashboard</h1>
              <p className="text-xl opacity-90">Monitor {childData.name}'s learning journey</p>
            </div>
            
            <div className="text-center bg-white/20 rounded-2xl p-6">
              <User className="w-8 h-8 mx-auto mb-2" />
              <div className="font-bold">{childData.name}</div>
              <div className="text-sm opacity-90">{childData.grade} • Age {childData.age}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Weekly Overview */}
        <Card className="mb-8 border-0 playful-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-eduplay-blue" />
              <span>This Week's Summary</span>
              <Badge className="bg-eduplay-green text-white">{childData.weeklyStats.improvement} improvement</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-eduplay-blue">{childData.weeklyStats.lessonsThisWeek}</div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-eduplay-orange">{childData.weeklyStats.starsEarned}</div>
                <div className="text-sm text-gray-600">Stars Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-eduplay-green">{childData.weeklyStats.timeSpent}</div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-eduplay-purple">{childData.currentStreak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subject Performance */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="w-6 h-6 text-eduplay-purple" />
                  <span>Subject Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {childData.subjects.map((subject, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{subject.name}</h4>
                        <Badge variant="outline">{subject.lastActivity}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-xl font-bold text-eduplay-blue">{subject.progress}%</div>
                          <div className="text-xs text-gray-600">Progress</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-eduplay-green">{subject.accuracy}%</div>
                          <div className="text-xs text-gray-600">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-eduplay-orange">{subject.timeSpent}</div>
                          <div className="text-xs text-gray-600">Time Spent</div>
                        </div>
                      </div>
                      
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-6 h-6 text-eduplay-green" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {childData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold">{activity.subject}: {activity.lesson}</div>
                        <div className="text-sm text-gray-600">{activity.time}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="font-bold text-eduplay-blue">{activity.score}</div>
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < parseInt(activity.score.split('/')[0]) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Overall Stats */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-eduplay-yellow" />
                  <span>Overall Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Learning Time:</span>
                  <span className="font-bold">{childData.totalLearningTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lessons Completed:</span>
                  <span className="font-bold">{childData.lessonsCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Average Accuracy:</span>
                  <span className="font-bold text-eduplay-green">{childData.averageAccuracy}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Streak:</span>
                  <span className="font-bold text-eduplay-orange">{childData.currentStreak} days 🔥</span>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-eduplay-blue" />
                  <span>Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {childData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-eduplay-blue mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-eduplay-purple" />
                  <span>This Month's Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Complete 50 lessons</span>
                    <span className="font-bold">42/50</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Maintain 85% accuracy</span>
                    <span className="font-bold text-green-600">89% ✓</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>7-day learning streak</span>
                    <span className="font-bold text-green-600">7/7 ✓</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPanel;

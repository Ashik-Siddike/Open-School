
import { BarChart, Star, Trophy, Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-eduplay-purple via-eduplay-blue to-eduplay-green bg-clip-text text-transparent">
              Track Your Amazing Progress!
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how much you've learned, celebrate your achievements, and discover what's next! 📈
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Student Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-blue/10 to-eduplay-purple/10">
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-eduplay-orange mx-auto mb-2" />
                  <div className="text-2xl font-bold text-eduplay-purple">1,250</div>
                  <div className="text-sm text-gray-600">Total Stars</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-green/10 to-eduplay-blue/10">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-eduplay-yellow mx-auto mb-2" />
                  <div className="text-2xl font-bold text-eduplay-green">15</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-orange/10 to-eduplay-pink/10">
                <CardContent className="p-6 text-center">
                  <Clock className="w-8 h-8 text-eduplay-pink mx-auto mb-2" />
                  <div className="text-2xl font-bold text-eduplay-orange">45</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-purple/10 to-eduplay-pink/10">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-eduplay-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-eduplay-purple">89%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </CardContent>
              </Card>
            </div>

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
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">🔢 Math</span>
                    <span className="text-sm font-bold text-eduplay-blue">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">📖 English</span>
                    <span className="text-sm font-bold text-eduplay-green">72%</span>
                  </div>
                  <Progress value={72} className="h-3" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">🇧🇩 Bangla</span>
                    <span className="text-sm font-bold text-eduplay-orange">90%</span>
                  </div>
                  <Progress value={90} className="h-3" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">🔬 Science</span>
                    <span className="text-sm font-bold text-eduplay-purple">67%</span>
                  </div>
                  <Progress value={67} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements & Goals */}
          <div className="space-y-8">
            {/* Recent Achievements */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-eduplay-yellow" />
                  <span>Recent Achievements</span>
                  <span className="text-2xl">🎉</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-eduplay-yellow/10 rounded-lg">
                  <div className="text-2xl">🏆</div>
                  <div>
                    <div className="font-semibold text-sm">Math Master</div>
                    <div className="text-xs text-gray-600">Solved 50 problems!</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-eduplay-green/10 rounded-lg">
                  <div className="text-2xl">📚</div>
                  <div>
                    <div className="font-semibold text-sm">Bookworm</div>
                    <div className="text-xs text-gray-600">Read 25 stories!</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-eduplay-purple/10 rounded-lg">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <div className="font-semibold text-sm">Star Collector</div>
                    <div className="text-xs text-gray-600">Earned 1000 stars!</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card className="border-0 playful-shadow bg-gradient-to-br from-eduplay-orange/10 to-eduplay-pink/10">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-3xl font-bold text-eduplay-orange mb-2">7 Days</div>
                <div className="text-sm text-gray-700 font-semibold">Learning Streak!</div>
                <div className="text-xs text-gray-600 mt-2">Keep it up, superstar!</div>
              </CardContent>
            </Card>

            {/* Next Goal */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-eduplay-green" />
                  <span>Next Goal</span>
                  <span className="text-2xl">🎯</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-lg font-semibold text-gray-700">Complete 10 Science Lessons</div>
                  <div className="text-3xl">🧪</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress:</span>
                      <span className="font-bold">6/10</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-600">Only 4 more to go!</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;

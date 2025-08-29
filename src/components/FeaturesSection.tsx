
import { Trophy, Gamepad2, BarChart, Users, Volume2, Puzzle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Gamepad2,
    title: 'Fun Games & Quizzes',
    description: 'Learn through exciting games, puzzles, and interactive quizzes!',
    color: 'from-eduplay-purple to-eduplay-blue',
    bgColor: 'bg-eduplay-purple/10',
    emoji: '🎮'
  },
  {
    icon: Trophy,
    title: 'Rewards & Badges',
    description: 'Earn stars, badges, and trophies as you complete lessons!',
    color: 'from-eduplay-orange to-eduplay-yellow',
    bgColor: 'bg-eduplay-orange/10',
    emoji: '🏆'
  },
  {
    icon: BarChart,
    title: 'Track Progress',
    description: 'See how much you\'ve learned with colorful progress charts!',
    color: 'from-eduplay-green to-eduplay-blue',
    bgColor: 'bg-eduplay-green/10',
    emoji: '📊'
  },
  {
    icon: Volume2,
    title: 'Audio Narration',
    description: 'Listen to friendly voices read lessons and instructions!',
    color: 'from-eduplay-pink to-eduplay-purple',
    bgColor: 'bg-eduplay-pink/10',
    emoji: '🔊'
  },
  {
    icon: Puzzle,
    title: 'Interactive Activities',
    description: 'Drag-and-drop, match games, and hands-on learning!',
    color: 'from-eduplay-blue to-eduplay-green',
    bgColor: 'bg-eduplay-blue/10',
    emoji: '🧩'
  },
  {
    icon: Users,
    title: 'Parent Dashboard',
    description: 'Parents can track progress and celebrate achievements!',
    color: 'from-eduplay-orange to-eduplay-pink',
    bgColor: 'bg-eduplay-orange/10',
    emoji: '👨‍👩‍👧‍👦'
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-eduplay-purple via-eduplay-blue to-eduplay-green bg-clip-text text-transparent">
              Why Kids Love <br />24/7 School!
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've designed every feature to make learning feel like playing! 
            Here's what makes 24/7 School special 🌈
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 playful-shadow bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center space-y-6">
                <div className="relative">
                  <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 text-2xl animate-bounce-gentle">
                    {feature.emoji}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fun Fact Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-eduplay-yellow/20 via-eduplay-orange/20 to-eduplay-pink/20 rounded-3xl p-8 playful-shadow max-w-4xl mx-auto">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-eduplay-purple to-eduplay-blue bg-clip-text text-transparent">
                Did you know?
              </span>
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Kids who use EduPlay spend 3x more time learning and remember 85% more information 
              compared to traditional methods! That's the power of fun learning! 🚀
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-eduplay-purple">3x</div>
                <div className="text-sm text-gray-600">More Engagement</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-eduplay-green">85%</div>
                <div className="text-sm text-gray-600">Better Retention</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-eduplay-orange">100%</div>
                <div className="text-sm text-gray-600">Fun Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

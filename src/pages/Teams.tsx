import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Linkedin, Github } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "Dr. Sujit Biswas",
    position: "CEO and Founder",
    bio: "Visionary leader dedicated to transforming education through innovative technology and creating accessible learning opportunities for all children.",
    photo: "/assets/shujit.jpg",
    email: "sujitbiswas@247school.org",
    location: "London, E6 2BN",
    github: "sujitedu",
    linkedin: "sujitedu",
    facebook: "engr.sujitbiswas",
    website: "https://www.sujitbiswas.info/"
  },
  {
    id: 2,
    name: "Md. Ashik Siddike",
    position: "Full Stack Developer & Graphic Designer",
    bio: "Passionate full-stack developer and creative designer, bringing educational visions to life through code and beautiful user experiences.",
    photo: "/assets/ashik.jpg",
    email: "ashik@247school.org",
    location: "Magura, Khulna, Bangladesh",
    github: "Ashik-Siddike",
    linkedin: "ashik-siddike",
    facebook: "ashik.siddike.official"
  },
  {
    id: 3,
    name: "Sagar Biswas",
    position: "Curriculum Developer",
    bio: "Educational content specialist focused on creating engaging and age-appropriate learning materials that make complex topics accessible to young minds.",
    photo: "/assets/shagor.jpg",
    email: "sagarbiswas@247school.org",
    altEmail: "sagarbiswas.jo@gmail.com",
    location: "Dharmotala, Jashore, Bangladesh",
    facebook: "sagarbiswas.jo"
  },
  {
    id: 4,
    name: "Aronyo Mojumder",
    position: "Research Assistant / Support Engineer",
    bio: "Dedicated researcher exploring innovative educational methodologies and technologies to enhance the learning experience for children.",
    photo: "/assets/Aronno.jpg",
    email: "aronyo@technoheaven.org",
    location: "Jashore, Khulna, Bangladesh",
    github: "aronyo24",
    linkedin: "aronyo-mojumder",
    facebook: "share/18yctJdieH/",
    website: "https://aronyo24.github.io/aronyomojumder/"
  },
  {
    id: 5,
    name: "SK Asaduzzaman",
    position: "Research Assistant / Support Engineer",
    bio: "Research-focused support engineer ensuring smooth operations and contributing to educational research initiatives.",
    photo: "/assets/asad.jpg",
    email: "asaduzzaman@247school.org",
    location: "Jashore, Khulna, Bangladesh",
    github: "skasaduzzamanabc",
    linkedin: "sk-asaduzzaman-sourov-1aaaaa2a9/",
    facebook: "skasaduzzamanabc"
  }
];

const Teams = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
            Meet Our <span className="bg-gradient-to-r from-eduplay-purple to-eduplay-blue bg-clip-text text-transparent">Amazing Team</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-150">
            Passionate educators, developers, and designers working together to make learning fun and accessible for every child.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={member.id}
              className="bg-white border-0 playful-shadow hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-eduplay-purple/20">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </CardTitle>
                <p className="text-lg text-eduplay-purple font-semibold mb-3">
                  {member.position}
                </p>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex justify-center space-x-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-full bg-eduplay-blue/10 hover:bg-eduplay-blue/20 transition-colors"
                    title="Send Email"
                  >
                    <Mail className="w-5 h-5 text-eduplay-blue" />
                  </a>
                  
                  {member.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-eduplay-purple/10 hover:bg-eduplay-purple/20 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-5 h-5 text-eduplay-purple" />
                    </a>
                  )}
                  
                  {member.github && (
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-600/10 hover:bg-gray-600/20 transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-5 h-5 text-gray-600" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-eduplay-purple via-eduplay-blue to-eduplay-green p-8 rounded-2xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
            <p className="text-white/90 text-lg mb-6">
              We're always looking for passionate individuals who want to make a difference in education.
            </p>
            <button className="bg-white text-eduplay-purple px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300">
              View Open Positions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;

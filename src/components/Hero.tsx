
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Search } from 'lucide-react';
import AnimatedButton from './ui-components/AnimatedButton';
import GlassCard from './ui-components/GlassCard';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="min-h-screen pt-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-placafala-highlight/20 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-placafala-highlight/10 blur-[100px] rounded-full -z-10" />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <span className="block">Drive Safe or</span>
            <span className="text-placafala-highlight">Be Exposed</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-placafala-lightgray/80 max-w-2xl mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Your voice matters. Report reckless driving and help make our roads safer for everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20 animate-fade-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <AnimatedButton 
              variant="highlight" 
              size="lg" 
              onClick={() => navigate('/report')}
              className="group"
            >
              <span className="flex items-center gap-2">
                Report a Driver 
                <AlertTriangle size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </AnimatedButton>
            
            <AnimatedButton 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/search')}
              className="group"
            >
              <span className="flex items-center gap-2">
                Search Complaints
                <Search size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
            </AnimatedButton>
          </div>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[
            {
              title: "Your Voice, Your Safety",
              desc: "Report reckless driving incidents to create a safer community.",
              delay: "0.6s",
              icon: <AlertTriangle className="text-placafala-highlight" size={24} />
            },
            {
              title: "Every Plate Tells a Story",
              desc: "Search vehicle plates to view historical complaints and patterns.",
              delay: "0.7s",
              icon: <Search className="text-placafala-highlight" size={24} />
            },
            {
              title: "The World is Watching",
              desc: "Accountability through transparency. Drive responsibly.",
              delay: "0.8s",
              icon: <ArrowRight className="text-placafala-highlight" size={24} />
            }
          ].map((card, index) => (
            <GlassCard 
              key={index}
              className="hover-scale hover-glow animate-fade-up opacity-0"
              style={{ animationDelay: card.delay, animationFillMode: 'forwards' }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  {card.icon}
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                </div>
                <p className="text-placafala-lightgray/80">{card.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

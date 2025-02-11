import React, { useState, useEffect } from 'react';
import { Target, Mic, Palette, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const About = () => {
  const [content, setContent] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section', 'about')
        .single();

      if (error) throw error;
      if (data) {
        setContent(data);
        setError(null);
      }
    } catch (error: any) {
      console.error('Error fetching about content:', error);
      setError(error.message);
    }
  };

  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-black to-[#1a0000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            {content.title && content.title.split(' ').map((word, index) => (
              <span key={index} className={word.toLowerCase() === 'kontinue' ? "text-[#A60000]" : ""}>
                {word}{' '}
              </span>
            ))}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Target className="w-8 h-8 text-[#A60000]" />,
              title: "Strategic Vision",
              description: "Crafting targeted digital strategies that align with your business goals"
            },
            {
              icon: <Mic className="w-8 h-8 text-[#A60000]" />,
              title: "Podcast Excellence",
              description: "Professional podcast production that engages and grows your audience"
            },
            {
              icon: <Palette className="w-8 h-8 text-[#A60000]" />,
              title: "Creative Content",
              description: "Compelling content that tells your brand's unique story"
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-[#A60000]" />,
              title: "Growth Focus",
              description: "Data-driven strategies for sustainable business growth"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
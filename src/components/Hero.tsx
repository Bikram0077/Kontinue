import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const Hero = () => {
  const [content, setContent] = useState({
    title: '',
    description: '',
    image_url: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section', 'hero')
        .single();

      if (error) throw error;
      if (data) {
        setContent(data);
        setError(null);
      }
    } catch (error: any) {
      console.error('Error fetching hero content:', error);
      setError(error.message);
    }
  };

  return (
    <div id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#A60000] to-black">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: content.image_url ? `url('${content.image_url}')` : 'none' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <img 
            src="https://i.postimg.cc/N0GQ5wL4/continuewhite.png"
            alt="Kontinue Creations Logo"
            className="w-32 h-auto mx-auto shadow-2xl"
          />
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
          {content.title && (
            <>
              {content.title.split(' ').map((word, index) => (
                <span key={index} className={index === 2 ? "bg-gradient-to-r from-white via-red-500 to-[#A60000] text-transparent bg-clip-text" : ""}>
                  {word}{' '}
                </span>
              ))}
            </>
          )}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
          {content.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            href="#services"
            className="inline-block bg-[#A60000] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#8a0000] transform hover:scale-105 transition duration-300 shadow-lg"
          >
            Explore Our Services
          </a>
          <a
            href="#contact"
            className="inline-block bg-transparent border-2 border-white/80 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#A60000] transform hover:scale-105 transition duration-300 shadow-lg"
          >
            Get in Touch
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default Hero;
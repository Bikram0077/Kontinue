import React, { useState, useEffect } from 'react';
import { 
  BarChart, Mic2, Palette, Share2, 
  Youtube, Instagram, Facebook as FacebookIcon, 
  PenTool, Camera, Megaphone 
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Services = () => {
  const [content, setContent] = useState({
    title: '',
    description: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServicesContent();
  }, []);

  const fetchServicesContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .eq('section', 'services')
        .single();

      if (error) throw error;
      if (data) {
        setContent(data);
        setError(null);
      }
    } catch (error: any) {
      console.error('Error fetching services content:', error);
      setError(error.message);
    }
  };

  const services = [
    {
      title: "Digital Marketing & Strategy",
      icon: <BarChart className="w-12 h-12 text-[#A60000]" />,
      description: "Comprehensive digital marketing solutions tailored to your business needs",
      features: ["Market Analysis", "SEO Optimization", "Campaign Management", "Performance Tracking"]
    },
    {
      title: "Podcast Production & Hosting",
      icon: <Mic2 className="w-12 h-12 text-[#A60000]" />,
      description: "Professional podcast production services from concept to execution",
      features: ["Studio Recording", "Content Planning", "Post-Production", "Distribution"]
    },
    {
      title: "Content Creation & Branding",
      icon: <Palette className="w-12 h-12 text-[#A60000]" />,
      description: "Creative content that builds and strengthens your brand identity",
      features: ["Brand Strategy", "Visual Design", "Content Writing", "Brand Guidelines"]
    },
    {
      title: "Social Media Management",
      icon: <Share2 className="w-12 h-12 text-[#A60000]" />,
      description: "Strategic social media management to grow your online presence",
      features: ["Platform Strategy", "Content Calendar", "Community Management", "Analytics"]
    }
  ];

  const platforms = [
    { icon: <Youtube />, name: "YouTube" },
    { icon: <Instagram />, name: "Instagram" },
    { icon: <FacebookIcon />, name: "Facebook" },
    { icon: <PenTool />, name: "Blog" },
    { icon: <Camera />, name: "Photography" },
    { icon: <Megaphone />, name: "Advertising" }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-[#1a0000] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">{content.title}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-[#A60000] rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-8">Platforms We Work With</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {platforms.map((platform, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-[#A60000] mb-2">{platform.icon}</div>
                <span className="text-gray-300 text-sm">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
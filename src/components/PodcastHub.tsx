import { Calendar, MessageSquare, Play } from 'lucide-react';
import React, { useState, useRef } from 'react';

const PodcastHub = () => {
  const [suggestion, setSuggestion] = useState('');
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const upcomingPodcasts = [
    {
      title: "What a Women Cricket Star has to say? ",
      date: "February 28, 2025",
      description: "Exploring the sportsperson's experience from Nepal."
    },
    {
      title: "Success Stories: Nepalese Sportsperson",
      date: "March 6, 2025",
      description: "Featuring Sportsperson sharing their journey and insights."
    },
    {
      title: "Becoming a Successful Entrepreneur",
      date: "March 17, 2025",
      description: "Learn effective strategies for business growth."
    }
  ];

  const featuredPodcasts = [
    {
      id: 1,
      title: "GUFF with National Cricket Player Abinash Bohara",
      description: "Experience of a National Cricketer in Nepal",
      thumbnail: "https://res.cloudinary.com/des4un3c1/image/upload/v1739590474/1_ntv6dv.png",
      videoUrl: "https://youtu.be/42f8moIeJm4?si=snc2ShbUCeXhpedC"
    },
    {
      id: 2,
      title: "GUFF with National Volleybal Player Saraswoti Chaudhary",
      description: "a national volleyball player who dedicated 12 years of her life to representing Nepal.",
      thumbnail: "https://scontent.fktm14-1.fna.fbcdn.net/v/t39.30808-6/480914839_122131675382578010_7504039083350813982_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=39JwPBhs36MQ7kNvgFWTht_&_nc_oc=Adh1oEAG8o8gZnx2Cm65zAKbQGFgnIdAt5hq8ZXtOfd5QUHye88m9ayvt4sx4gDYJ8Y&_nc_zt=23&_nc_ht=scontent.fktm14-1.fna&_nc_gid=AVo17Ks0ev2zrKqfRMxO2M9&oh=00_AYBS0doCyAeq8wrJr84YJ-GhKqX2LC9o9SBhuYDGzV3r_A&oe=67BF20F1",
      videoUrl: "https://youtu.be/WXXHmcQA-54?si=2CJY97iBE4XZ7InP"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestion('');
  };

  // Handlers for mouse dragging on the slider
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDown(true);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="podcasts" className="py-20 bg-gradient-to-b from-black to-[#1a0000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Podcast Hub</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our latest episodes and upcoming content
          </p>
        </div>

        {/* Featured Podcasts Slider */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-8">Featured Podcasts</h3>
          <div
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide flex space-x-8 cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
          >
            {/* Duplicate items for continuous feel */}
            {featuredPodcasts.concat(featuredPodcasts).map((podcast, index) => (
              <div 
                key={index}
                className="flex-none w-[400px] bg-white/5 backdrop-blur-sm p-6 rounded-lg relative overflow-hidden"
              >
                <img 
                  src={podcast.thumbnail}
                  alt="Podcast Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative z-10 text-center p-4">
                  <h4 className="text-xl font-bold text-white mb-2">{podcast.title}</h4>
                  <p className="text-gray-300 mb-4">{podcast.description}</p>
                  <a 
                    href={podcast.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#A60000] text-white px-4 py-2 rounded-full hover:bg-[#8a0000] transition-colors"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Channel Preview */}
        <div className="mb-16 flex justify-center">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Our Channel</h3>
            <div className="aspect-video w-full bg-gradient-to-br from-black via-[#A60000] to-black rounded-lg p-8 flex flex-col items-center justify-center">
              <img 
                src="https://i.postimg.cc/N0GQ5wL4/continuewhite.png"
                alt="Kontinue Creations Logo"
                className="w-28 h-28 mb-4 border-4 border-white/20"
              />
              <h4 className="text-xl font-semibold text-white mb-2">Kontinue Creations</h4>
              <p className="text-gray-300 text-center">
                Subscribe to our channel for the latest content and updates
              </p>
              <a 
                href="https://www.youtube.com/@Program_Host_Kontinue_Creation"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-[#A60000] text-white px-6 py-2 rounded-full hover:bg-[#8a0000] transition-colors"
              >
                Visit Channel
              </a>
            </div>
          </div>
        </div>

        {/* Upcoming Episodes */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-8">Upcoming Episodes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingPodcasts.map((podcast, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <Calendar className="w-5 h-5 text-[#A60000] mr-2" />
                  <span className="text-gray-400">{podcast.date}</span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{podcast.title}</h4>
                <p className="text-gray-400">{podcast.description}</p>
                <button className="mt-4 flex items-center text-[#A60000] hover:text-[#8a0000] transition-colors">
                  <Play className="w-4 h-4 mr-2" />
                  Set Reminder
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestion Form */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-8">Whom Should We Call Next?</h3>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
              <div className="mb-4">
                <label htmlFor="suggestion" className="block text-gray-300 mb-2">
                  Suggest a Guest or Topic
                </label>
                <textarea
                  id="suggestion"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  className="w-full bg-white/10 text-white rounded-lg p-3 focus:ring-2 focus:ring-[#A60000] focus:outline-none"
                  rows={4}
                  placeholder="Share your suggestions..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-full bg-[#A60000] text-white px-6 py-3 rounded-lg hover:bg-[#8a0000] transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Submit Suggestion
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Additional CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default PodcastHub;

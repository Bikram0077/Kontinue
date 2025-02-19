import { Calendar, MessageSquare, Play } from 'lucide-react';
import React, { useState } from 'react';

const PodcastHub = () => {
  const [suggestion, setSuggestion] = useState('');

  const upcomingPodcasts = [
    {
      title: "What a Women Volleyball Star has to say? ",
      date: "February 20, 2025",
      description: "Exploring the sportsperson's experience from Nepal."
    },
    {
      title: "Success Stories: Nepalese Sportsperson",
      date: "March 1, 2025",
      description: "Featuring Sportsperson sharing their journey and insights."
    },
    {
      title: "Becoming a Successful Entrepreneur",
      date: "March 8, 2025",
      description: "Learn effective strategies for business growth."
    }
  ];

  // Define your featured podcasts (add more as needed)
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
      title: "Podcast Two Title",
      description: "An inspiring conversation with a leading innovator.",
      thumbnail: "https://via.placeholder.com/600x400",
      videoUrl: "https://youtu.be/anotherVideoID"
    },
    {
      id: 3,
      title: "Podcast Three Title",
      description: "Insights from a renowned celebrity and entrepreneur.",
      thumbnail: "https://via.placeholder.com/600x400",
      videoUrl: "https://youtu.be/thirdVideoID"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuggestion('');
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
          <div className="slider-container relative overflow-hidden">
            <div className="slider-track flex space-x-8 animate-scroll">
              {/* Duplicate items for smooth infinite scrolling */}
              {featuredPodcasts.concat(featuredPodcasts).map((podcast, index) => (
                <div 
                  key={index} 
                  className="flex-none w-1/3 bg-white/5 backdrop-blur-sm p-6 rounded-lg relative overflow-hidden"
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
        </div>

        {/* Channel Preview & Other Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Channel Preview */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
            <h3 className="text-2xl font-semibold text-white mb-4">Our Channel</h3>
            <div className="aspect-video w-full bg-gradient-to-br from-black via-[#A60000] to-black rounded-lg p-8 flex flex-col items-center justify-center">
              <img 
                src="https://i.postimg.cc/N0GQ5wL4/continuewhite.png"
                alt="Kontinue Creations Logo"
                className="w-24 h-24 mb-4 border-4 border-white/20"
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

      {/* Custom CSS for the slider */}
      <style jsx>{`
        .slider-container {
          width: 100%;
        }
        .slider-track {
          width: calc(200%);
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default PodcastHub;

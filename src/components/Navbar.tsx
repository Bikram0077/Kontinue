import React, { useState, useEffect } from 'react';
import { Menu, X, Youtube, Facebook, Mail, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <img 
              src={isScrolled ? "https://i.postimg.cc/5061SqBQ/continueblacktranparent.png" : "https://i.postimg.cc/N0GQ5wL4/continuewhite.png"}
              alt="Kontinue Creations Logo"
              className="h-16 w-auto transition-all duration-300"
            />
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <a href="#home" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] px-3 py-2 rounded-md font-medium transition-colors`}>Home</a>
              <a href="#about" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] px-3 py-2 rounded-md font-medium transition-colors`}>About</a>
              <a href="#services" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] px-3 py-2 rounded-md font-medium transition-colors`}>Services</a>
              <a href="#podcasts" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] px-3 py-2 rounded-md font-medium transition-colors`}>Podcasts</a>
              <a href="#clients" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] px-3 py-2 rounded-md font-medium transition-colors`}>Clients</a>
              <a href="#contact" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] px-3 py-2 rounded-md font-medium transition-colors`}>Contact</a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://www.youtube.com/@Program_Host_Kontinue_Creation" target="_blank" rel="noopener noreferrer"
               className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] transition-colors`}>
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61567340320817" target="_blank" rel="noopener noreferrer"
               className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] transition-colors`}>
              <Facebook className="h-5 w-5" />
            </a>
            <a href="mailto:kontinuecreations@gmail.com"
               className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] transition-colors`}>
              <Mail className="h-5 w-5" />
            </a>
            <a href="tel:+61433933954"
               className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-[#A60000] transition-colors`}>
              <Phone className="h-5 w-5" />
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled ? 'text-gray-800' : 'text-white'
              } hover:text-[#A60000] focus:outline-none transition-colors`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm shadow-lg">
          <a href="#home" className="text-gray-800 hover:text-[#A60000] block px-3 py-2 rounded-md font-medium">Home</a>
          <a href="#about" className="text-gray-800 hover:text-[#A60000] block px-3 py-2 rounded-md font-medium">About</a>
          <a href="#services" className="text-gray-800 hover:text-[#A60000] block px-3 py-2 rounded-md font-medium">Services</a>
          <a href="#podcasts" className="text-gray-800 hover:text-[#A60000] block px-3 py-2 rounded-md font-medium">Podcasts</a>
          <a href="#clients" className="text-gray-800 hover:text-[#A60000] block px-3 py-2 rounded-md font-medium">Clients</a>
          <a href="#contact" className="text-gray-800 hover:text-[#A60000] block px-3 py-2 rounded-md font-medium">Contact</a>
          <div className="flex space-x-4 px-3 py-2">
            <a href="https://www.youtube.com/@Program_Host_Kontinue_Creation" target="_blank" rel="noopener noreferrer"
               className="text-gray-800 hover:text-[#A60000]">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61567340320817" target="_blank" rel="noopener noreferrer"
               className="text-gray-800 hover:text-[#A60000]">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="mailto:kontinuecreations@gmail.com"
               className="text-gray-800 hover:text-[#A60000]">
              <Mail className="h-5 w-5" />
            </a>
            <a href="tel:+61433933954"
               className="text-gray-800 hover:text-[#A60000]">
              <Phone className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
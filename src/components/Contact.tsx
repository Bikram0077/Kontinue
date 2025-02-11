import React from 'react';
import { Mail, Phone, MapPin, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-[#1a0000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Contact Us</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with us for any inquiries or collaborations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-[#A60000] mr-3" />
                <h3 className="text-xl font-semibold text-white">Email</h3>
              </div>
              <a 
                href="mailto:kontinuecreations@gmail.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                kontinuecreations@gmail.com
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-[#A60000] mr-3" />
                <h3 className="text-xl font-semibold text-white">Phone</h3>
              </div>
              <a 
                href="tel:+61433933954"
                className="text-gray-300 hover:text-white transition-colors"
              >
                +61 0433 933 954
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Facebook className="w-6 h-6 text-[#A60000] mr-3" />
                <h3 className="text-xl font-semibold text-white">Facebook</h3>
              </div>
              <a 
                href="https://www.facebook.com/profile.php?id=61567340320817"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Visit our Facebook Page
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-[#A60000] mr-3" />
                <h3 className="text-xl font-semibold text-white">Location</h3>
              </div>
              <p className="text-gray-300">
                39 Marion Street, Parramatta, NSW, Australia
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-2 rounded-lg overflow-hidden h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.6030817864607!2d151.00461127550625!3d-33.82255467324434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a32408ba692d%3A0x9e6704c9675e10c2!2s39%20Marion%20St%2C%20Parramatta%20NSW%202150!5e0!3m2!1sen!2sau!4v1710831655809!5m2!1sen!2sau"
              className="w-full h-full rounded-lg border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
import { FaLinkedin, FaGithub, FaFacebook, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SendEmail from  '../../Email-JS/SendEmail';
import logo from '../../assets/logo.png';
const Footer = () => {
  return (
    <footer className="bg-[#1b1b1b] text-white py-10 mt-[1px]">
      <div className="container mx-auto px-6 md:px-12">
        {/* Footer Top Section */}
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src= {logo}
              alt="Travel Logo"
              className="h-12 w-12 rounded-3xl"
            />
            <h3 className="text-3xl font-semibold text-blue-400">Explore Bangladesh</h3> 
          </div>

          {/* Quick Links */}
          <div className="flex space-x-12">
            <div>
              <h4 className="font-semibold text-xl mb-3">Useful Links</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="/about" className="hover:text-blue-300">About Us</Link>
                </li>
                <li>
                  <Link to="/destinations" className="hover:text-blue-300">Destinations</Link>
                </li>
                <li>
                  <Link to="/tips" className="hover:text-blue-300">Travel Tips</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-300">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-xl mb-3">Follow Us</h4>
              <div className="flex space-x-6">
                <a
                  href="https://www.linkedin.com/in/sourav-das-tivro-63883b28a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-500"
                >
                  <FaLinkedin size={28} />
                </a>
                <a
                  href="https://github.com/Tivro1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-black"
                >
                  <FaGithub size={28} />
                </a>
                <a
                  href="https://www.facebook.com/kera.reo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-600"
                >
                  <FaFacebook size={28} />
                </a>
                
               
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12">
       <SendEmail></SendEmail>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Explore Bangladesh. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">Your gateway to the most beautiful destinations in Bangladesh!</p>
        </div>

        {/* Footer Contact Section (Optional) */}
        <div className="mt-10 text-center">
          <a
            href="mailto:contact@explorebangladesh.com" 
            className="text-gray-300 hover:text-blue-500 text-lg font-medium"
          >
            <FaGlobe className="inline-block mr-2" />
            Get in touch with us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

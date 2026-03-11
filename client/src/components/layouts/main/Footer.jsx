import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";

const footerLinks = {
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: "FaTwitter" },
  { name: "GitHub", href: "https://github.com", icon: "FaGithub" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "FaLinkedin" },
  { name: "Instagram", href: "https://instagram.com", icon: "FaInstagram" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (iconName) => {
    const icons = {
      FaTwitter,
      FaGithub,
      FaLinkedin,
      FaInstagram,
    };
    return icons[iconName];
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
              >
                Blogify
              </Link>
              <p className="mt-4 text-gray-400 max-w-md">
                Welcome to my personal blog where I share insights, stories, and
                thoughts on technology, design, and development. Join me on this
                journey and feel free to leave your comments.
              </p>

              {/* Social Links */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  Connect With Me
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const IconComponent = getSocialIcon(social.icon);
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                        aria-label={social.name}
                      >
                        <IconComponent className="h-6 w-6" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center text-gray-400 text-sm">
              <span>&copy; {currentYear} BlogName. All rights reserved.</span>
            </div>

            <div className="flex items-center mt-4 sm:mt-0 text-gray-400 text-sm">
              <span>Made with</span>
              <FaHeart className="h-4 w-4 text-red-500 mx-1" />
              <span>by me</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

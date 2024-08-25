import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="ml-2 tertiary_bg px-4 sm:px-8 py-8 sm:py-16 mb-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div className="text-sm">
        <ul>
          <li className="font-bold mb-4">Company</li>
          <li className="text-gray-400 my-2 hover:text-white hover:underline cursor-pointer">About</li>
          <li className="text-gray-400 my-2">Jobs</li>
          <li className="text-gray-400 my-2">For the Record</li>
        </ul>
      </div>
      <div>
        <ul>
          <li className="font-bold mb-4">Communities</li>
          <li className="text-gray-400 my-2">For Artists</li>
          <li className="text-gray-400 my-2">Developers</li>
          <li className="text-gray-400 my-2">Advertising</li>
          <li className="text-gray-400 my-2">Investors</li>
          <li className="text-gray-400 my-2">Vendors</li>
        </ul>
      </div>
      <div>
        <ul>
          <li className="font-bold mb-4">Useful links</li>
          <li className="text-gray-400 my-2">Support</li>
          <li className="text-gray-400 my-2">Free Mobile App</li>
        </ul>
      </div>
      <div className="flex justify-center md:justify-end gap-4 md:gap-2">
        <FaFacebook className="text-3xl sm:text-4xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10 cursor-pointer" />
        <FaInstagram className="text-3xl sm:text-4xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10 cursor-pointer" />
        <FaTwitter className="text-3xl sm:text-4xl p-2 rounded-full bg-[#292929] shadow-2xl hover:bg-white/10 cursor-pointer" />
      </div>
    </div>
    
    <div className="border-b border-white/10 my-8 w-full"></div>
    
    <div className="flex flex-col sm:flex-row justify-between text-sm">
      <ul className="flex flex-col sm:flex-row gap-4 mb-4 sm:mb-0">
        <li className="text-gray-400">Legal</li>
        <li className="text-gray-400">Privacy Center</li>
        <li className="text-gray-400">Privacy Policy</li>
        <li className="text-gray-400">Cookies</li>
        <li className="text-gray-400">About Ads</li>
        <li className="text-gray-400">Accessibility</li>
      </ul>
      <h4 className="text-gray-400">© 2023 Spotify AB</h4>
    </div>
  </div>
  
  );
};

export default Footer;

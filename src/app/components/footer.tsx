import React from "react";
import Images from "next/image";
import { SiInstagram } from "react-icons/si";
import { FaYoutube } from "react-icons/fa6";

function Footer() {
  return (
    <header className="bg-[#054017] text-white shadow-md">
      
    
      <div className="max-w-6xl mx-auto px-4 py-3 items-center justify-between">
        <div>
        {/*Logo*/}
        <Images width={180} height={10} src='/logo.png' alt="Logo" />
    </div>
    <div>
        {/* Menú de navegación */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-gray-200">
                Follow us! --------------
              </a>
            </li>
             <li>
              <a href="#" className="hover:text-gray-200">
                <span><SiInstagram /></span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                <span><FaYoutube size={24}/></span>
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                <span></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      </div>
    </header>
  );
}

export default Footer;

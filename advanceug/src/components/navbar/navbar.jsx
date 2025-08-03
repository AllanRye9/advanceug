import React from 'react';
import { useEffect } from 'react';

export default function NavBar() {
  useEffect(() => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
      };

      menuBtn.addEventListener('click', toggleMenu);

      // Cleanup to avoid memory leaks
      return () => menuBtn.removeEventListener('click', toggleMenu);
    }
  }, []);

  return (
    <>
      <nav className="bg-white shadow-md m-4 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#" className="text-xl font-bold text-blue-600">Advaceug</a>
            </div>

            {/* Menu (Desktop) */}
            <div className="hidden md:flex md:items-center space-x-4 p-{4}">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button id="menu-btn" className="text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="md:hidden hidden px-4 pb-4">
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">Home</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">About</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">Services</a>
          <a href="#" className="block py-2 text-gray-700 hover:text-blue-600">Contact</a>
        </div>
      </nav>
    </>
  );
}

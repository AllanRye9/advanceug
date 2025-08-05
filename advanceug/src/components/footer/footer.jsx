import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and About */}
        <div>
          <h2 className="text-xl font-bold mb-2">Advanceug</h2>
          <p className="text-sm text-gray-400">
            Your one-stop platform for academic resources, past papers, and success tips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Resources</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Resources</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">PLE Papers</a></li>
            <li><a href="#" className="hover:underline">UCE Papers</a></li>
            <li><a href="/uace" className="hover:underline">UACE Papers</a></li>
            <li><a href="#" className="hover:underline">Tutorials</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
          <p className="text-sm text-gray-400 mb-3">Get the latest updates and resources.</p>
          <form className="flex flex-col sm:flex-row items-center sm:items-stretch gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-3 py-2 rounded text-black"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs text-gray-500 mt-8 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} Advanceug. All rights reserved.
      </div>
    </footer>
  );
}

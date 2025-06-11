import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-800 shadow-inner">
    <div className="flex items-center gap-3">
        <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="text-yellow-400">
        <path
            fill="currentColor"
            d="M22.672 15.226l-2.432.811..."></path>
        </svg>
        <p className="text-sm md:text-base font-medium">
        © {new Date().getFullYear()} The Legendary Hub. All rights reserved.
        </p>
    </div>

    <div className="flex gap-5">
        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557..."></path>
        </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184..."></path>
        </svg>
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 8h-3v4..."></path>
        </svg>
        </a>
    </div>
    </footer>

  )
}

export default Footer
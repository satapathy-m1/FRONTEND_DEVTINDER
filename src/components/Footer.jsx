import React from 'react'

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4 bottom-0 fixed">
    <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
    </aside>
    </footer>

  )
}

export default Footer
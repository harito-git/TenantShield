import React from 'react'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-left">
        </div>

        <div className="footer-center">2025 TenantsShield. All rights reserved</div>

        <div className="footer-right" aria-hidden></div>
      </div>
    </footer>
  )
}

export default Footer

import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#1a1410', color: '#fff', marginTop: '3rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>

        {/* About */}
        <div>
          <h3 style={{ color: '#C9A84C', fontSize: '18px', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>Shamil Shoe Palace</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.7' }}>
            22 years of quality footwear in Oddamavadi, Sri Lanka. Now bringing our trusted collection online — island-wide delivery to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '1rem', fontWeight: 'bold' }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px' }}>Shop All Products</Link>
            <Link to="/track" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px' }}>Track Your Order</Link>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px' }}>About Us</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px' }}>Returns &amp; Exchanges</a>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '1rem', fontWeight: 'bold' }}>Customer Service</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px' }}>FAQs</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px' }}>Shipping Info</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px' }}>Size Guide</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '13px' }}>Contact Us</a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '1rem', fontWeight: 'bold' }}>Get In Touch</h4>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.8', marginBottom: '4px' }}>
            📍 Oddamavadi Main Street, Sri Lanka
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.8', marginBottom: '4px' }}>
            📞 +94 77 332 4789
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.8', marginBottom: '12px' }}>
            ✉️ info@shamilshoepalace.com
          </p>

          {/* Social Media Icons */}
          <div style={{ display: 'flex', gap: '12px' }}>

            {/* Facebook */}
            <a href="#" target="_blank" rel="noopener noreferrer"
              style={{ width: '36px', height: '36px', background: '#1877F2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/shamilshoepalace?igsh=MWw2NnVvNzQzYWUzcg==" target="_blank" rel="noopener noreferrer"
              style={{ width: '36px', height: '36px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/94773324789" target="_blank" rel="noopener noreferrer"
              style={{ width: '36px', height: '36px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>

          </div>
        </div>

      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1.25rem 2rem', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
          © 2026 Shamil Shoe Palace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

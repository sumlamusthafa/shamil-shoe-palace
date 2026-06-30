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
            📞 +94 77 XXX XXXX
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: '1.8', marginBottom: '12px' }}>
            ✉️ info@shamilshoepalace.com
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="#" style={{ width: '32px', height: '32px', background: 'rgba(201,168,76,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '14px' }}>📘</a>
            <a href="#" style={{ width: '32px', height: '32px', background: 'rgba(201,168,76,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '14px' }}>📷</a>
            <a href="#" style={{ width: '32px', height: '32px', background: 'rgba(201,168,76,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '14px' }}>💬</a>
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

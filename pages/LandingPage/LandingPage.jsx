import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Shree Ganesh Automobiles Invoice System</h1>
        <p>Manage invoices, export PDFs, and track your sales easily!</p>
        <Link to="/generate" className="hero-btn">
          Generate Invoice
        </Link>
      </section>
      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Create & Manage Invoices</h3>
            <p>Easily create, edit, and delete invoices in one place.</p>
          </div>
          <div className="card">
            <h3>Export as PDF</h3>
            <p>Export your invoices as PDF using jsPDF + html2canvas.</p>
          </div>
          <div className="card">
            <h3>Send via Email</h3>
            <p>Automatically send invoices to customers via email.</p>
          </div>
          <div className="card">
            <h3>Secure Login</h3>
            <p>Clerk-based secure login for multiple users.</p>
          </div>
          <div className="card">
            <h3>Cloudinary Integration</h3>
            <p>Store invoice templates and images in Cloudinary.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Shree Ganesh Automobiles. All rights reserved.</p>
      </footer>
    </>
  );
};

export default LandingPage;

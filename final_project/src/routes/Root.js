import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Root() {
  return (
    <div>
      <header className="text-white py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="icon-section">
            <a
              href="mailto:twylazha@usc.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-3"
              title="Email Me"
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
            <a
              href="https://www.linkedin.com/in/twyla-zhang-27489b287/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-3"
              title="LinkedIn Profile"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>

          <nav className="nav">
            <NavLink to="/" className="nav-link text-white">
              Home
            </NavLink>
            <NavLink to="/resume" className="nav-link text-white">
              Resume
            </NavLink>
            <NavLink to="/albums" className="nav-link text-white">
              Albums
            </NavLink>
            <NavLink to="/photos" className="nav-link text-white">
              Photos
            </NavLink>
            <NavLink to="/contact" className="nav-link text-white">
              Contact Me
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container mt-4">
        <Outlet />
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 Twyla Zhang. All Rights Reserved.</p>
        <nav>
          <NavLink to="/" className="text-white mx-2">
            Home
          </NavLink>
          <NavLink to="/resume" className="text-white mx-2">
            Resume
          </NavLink>
          <NavLink to="/albums" className="text-white mx-2">
            Albums
          </NavLink>
          <NavLink to="/photos" className="text-white mx-2">
            Photos
          </NavLink>
          <NavLink to="/contact" className="text-white mx-2">
            Contact Me
          </NavLink>
        </nav>
      </footer>
    </div>
  );
}

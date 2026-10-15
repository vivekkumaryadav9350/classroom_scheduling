"use client";

import { useState } from "react";
import "../styles/Navbar.css";

export default function AdminNavbar() {

    const [isOpen,setIsOpen] =useState(true);
  return (
    <nav className="navbar">

      <div className="navbar-left">

        <button
          className="toogle-btn"
           onClick={() => setIsOpen(!isOpen)}
        >
         🏫
        </button>

        <h2 className="navbar-logo">
      Scheduling Dashbard
        </h2>

      </div>


      <div className="action">
          <a className="nav-home"
      href="/">
        🏠Home
      </a>

      <a className="nav-teacher"
      href="/components/TeacherTimetable">
        👤Teacher
      </a>
      </div>

    



      <div className="navbar-right">

        <span className="navbar-user">
          Welcome👤
        </span>

        <button className="logout-btn">
          Logout
        </button>

      </div>

    </nav>
  );
}
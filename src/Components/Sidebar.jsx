import React from 'react';
import { FaSignalMessenger } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { AiOutlineMessage } from 'react-icons/ai';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import './sidebar.css'; 

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'md-visible' : 'hidden'}`}>
      <div className="header">
        <FaSignalMessenger className="icon" />
        <span className="brand">sportsdunia event</span>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <FaHome className="icon" />
            <Link to="/">Home</Link>
          </li>
          <li>
            <AiOutlineMessage className="icon" />
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <IoIosLogIn className="icon" />
            <Link to="/payoutdetail">PayoutDeatil</Link>
          </li>
          <li>
            <IoIosLogOut className="icon" />
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <div className="footer">
        <p>© 2025 Nityam Mor</p>
      </div>
    </div>
  );
}

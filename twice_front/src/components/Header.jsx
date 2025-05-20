import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import homeIcon from '../icons/home.png';
import mujoIcon from '../icons/mujo.png';
import sayeonIcon from '../icons/sayeon.png';
import ingiIcon from '../icons/ingi.png';
import gaeinIcon from '../icons/gaein.png';

export default function Header() {
  const locationNow = useLocation();
  const navigate = useNavigate();


  // Example: you can use locationNow.pathname to determine which is active
  const navItems = [
    { icon: homeIcon, label: '홈', path: '/home', className: 'home' },
    { icon: mujoIcon, label: '무조건 응원함', path: '/support', className: 'mujo' },
    { icon: sayeonIcon, label: '사연 쓰기', path: '/write', className: 'sayeon' },
    { icon: ingiIcon, label: '인기 응원함', path: '/ingi', className: 'ingi' },
    { icon: gaeinIcon, label: '개인 응원함', path: '/gaein', className: 'gaein' },
  ];

  return (
    <header className="header">
      {navItems.map((item) => (
        <Link
          to={item.path}
          className={`nav-item ${item.className} ${locationNow.pathname === item.path ? 'active' : ''}`}
          key={item.path}
        >
          <img src={item.icon} alt={item.label} className="nav-icon" />
          <div className="nav-label">{item.label}</div>
        </Link>
      ))}
    </header>
  );
}
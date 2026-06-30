import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, ShoppingCart, ClipboardList, Settings } from 'lucide-react';
import { useStateValue } from '../StateContext';

const BottomNavbar = () => {
  const { totalItems } = useStateValue();

  const navItems = [
    {
      path: '/',
      label: 'الصفحة الرئيسية',
      icon: Home
    },
    {
      path: '/catalog',
      label: 'قائمة الأدوية',
      icon: LayoutGrid
    },
    {
      path: '/orders',
      label: 'مراجعة الطلبات',
      icon: ShoppingCart,
      badge: true
    },
    {
      path: '/inventory',
      label: 'جرد الطلبات',
      icon: ClipboardList
    },
    {
      path: '/settings',
      label: 'الإعدادات',
      icon: Settings
    }
  ];

  return (
    <nav className="bottom-navbar">
      <div className="bottom-nav-content">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="bottom-nav-icon-wrapper">
                <Icon size={22} className="bottom-nav-icon" />
                {item.badge && totalItems > 0 && (
                  <span className="bottom-nav-badge">{totalItems}</span>
                )}
              </div>
              <span className="bottom-nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;

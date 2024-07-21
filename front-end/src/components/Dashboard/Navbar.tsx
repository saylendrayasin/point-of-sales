import React, { useContext, useEffect } from 'react';
import {
  MdDashboard,
  MdPeople,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes';

export type TNavItem = {
  title?: string;
  url: string;
  icon?: any;
  separator_top?: boolean;
  separator_bottom?: boolean;
};

export function getNavList(): TNavItem[] {
  return [
    {
      title: 'Home',
      url: ROUTES.HOME,
      icon: <MdDashboard />,
      separator_bottom: true,
    },

    {
      title: 'Invoice',
      url: ROUTES.INVOICE,
      icon: <MdPeople />,
      separator_bottom: true,
    },
  ];
}

export default function Navbar() {
  return (
    <>
      {getNavList().map((item, i) => (
        <div key={i}>
          {item.separator_top && (
            <div className="dsm-separator dsm-separator--top"></div>
          )}

          {item.title && (
            <NavLink
              to={item.url}
              className={({ isActive }) => {
                return `dsm__content ${
                  isActive && item.url !== '' ? 'active' : ''
                }`;
              }}
            >
              {item.icon}
              <span className="dsmc__name">{item.title}</span>
            </NavLink>
          )}

          {item.separator_bottom && (
            <div className="dsm-separator dsm-separator--bottom"></div>
          )}
        </div>
      ))}
    </>
  );
}

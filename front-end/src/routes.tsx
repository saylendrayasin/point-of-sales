import path from 'path';
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const ROUTES = {
  PARENT: '/',
  HOME: '/home',
  INVOICE: '/invoice',
};

export const routerList = [
  {
    path: ROUTES.PARENT,
    lazy: () => import('./pages/PageDashboard'),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.HOME} replace={true} />,
      },
      {
        path: ROUTES.HOME,
        lazy: () => import('./pages/PageHome/PageHome'),
      },
      {
        path: ROUTES.INVOICE,
        lazy: () => import('./pages/PageInvoice/PageInvoice'),
      },
      {
        path: `${ROUTES.INVOICE}/add`,
        lazy: () => import('./pages/PageInvoice/PageInvoiceAdd'),
      },
    ],
  },
];

export const router = createBrowserRouter(routerList);

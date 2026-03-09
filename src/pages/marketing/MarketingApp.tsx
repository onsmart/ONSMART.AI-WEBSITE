/**
 * Marketing area wrapper: AuthProvider + Login or Protected Dashboard.
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MarketingAuthProvider } from '@/contexts/MarketingAuthContext';
import { MarketingProtectedRoute } from '@/components/marketing/MarketingProtectedRoute';
import MarketingLogin from '@/pages/marketing/MarketingLogin';
import MarketingDashboard from '@/pages/marketing/MarketingDashboard';
import MarketingContentEdit from '@/pages/marketing/MarketingContentEdit';

export default function MarketingApp() {
  return (
    <MarketingAuthProvider>
      <Routes>
        <Route path="login" element={<MarketingLogin />} />
        <Route
          index
          element={
            <MarketingProtectedRoute>
              <MarketingDashboard />
            </MarketingProtectedRoute>
          }
        />
        <Route
          path="content/new"
          element={
            <MarketingProtectedRoute>
              <MarketingContentEdit />
            </MarketingProtectedRoute>
          }
        />
        <Route
          path="content/:id"
          element={
            <MarketingProtectedRoute>
              <MarketingContentEdit />
            </MarketingProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/marketing" replace />} />
      </Routes>
    </MarketingAuthProvider>
  );
}

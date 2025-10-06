import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import HomePage from './pages/public/HomePage';
import PageView from './pages/public/PageView';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import PagesManager from './pages/admin/PagesManager';
import PageEditor from './pages/admin/PageEditor';
import MenuManager from './pages/admin/MenuManager';
import SectionsManager from './pages/admin/SectionsManager';
import MediaManager from './pages/admin/MediaManager';
import SettingsManager from './pages/admin/SettingsManager';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path=":slug" element={<PageView />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<PagesManager />} />
          <Route path="pages/new" element={<PageEditor />} />
          <Route path="pages/:id" element={<PageEditor />} />
          <Route path="menus" element={<MenuManager />} />
          <Route path="sections" element={<SectionsManager />} />
          <Route path="media" element={<MediaManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

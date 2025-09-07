import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider} from './contexts/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import AuthGuard from './components/AuthGuard';
import NotificationSystem from './components/NotificationSystem';
import './App.css';

const MusicLibrary = lazy(() => import('./components/MusicLibraryWrapper'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <AuthGuard>
            <Layout>
              <Suspense fallback={<div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
              </div>}>
                <MusicLibrary />
              </Suspense>
            </Layout>
          </AuthGuard>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
          <NotificationSystem />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

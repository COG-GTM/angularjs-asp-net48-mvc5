import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import { usePageTracking } from './hooks/usePageTracking';

const Home = lazy(() => import('./pages/Home/Home'));

function AppShell() {
  const { resolvedTheme } = useSettings();
  usePageTracking();

  return (
    <div className={`app-root theme-${resolvedTheme}`}>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <AppShell />
      </SettingsProvider>
    </BrowserRouter>
  );
}

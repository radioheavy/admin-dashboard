import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import { ToastProvider } from './context/ToastContext';
import { Sidebar, Header } from './components';
import { AnimatedBackground } from './components/ui';
import { Dashboard, Login, Register, ForgotPassword, Showcase } from './pages';

// Dashboard layout wrapper
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#050505] grain-overlay">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Sidebar - Fixed position */}
      <Sidebar />

      {/* Main Wrapper - Shifts based on sidebar state */}
      <div
        className={`
          relative z-10 min-h-screen
          transition-all duration-300 ease-out
          lg:pl-64
          ${isCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'}
        `}
      >
        {/* Header - Sticky within main content */}
        <Header />

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {/* Page Title */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Welcome back, <span className="text-gradient">Ismail</span>
            </h1>
            <p className="text-white/50 text-sm lg:text-base">
              Here's what's happening with your store today.
            </p>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

// Protected route wrapper (mock - always allows access for demo)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, you would check authentication here
  const isAuthenticated = true; // Mock: always authenticated for demo

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ToastProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            {/* Showcase Route - No layout, full page */}
            <Route path="/showcase" element={<Showcase />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={<Navigate to="/" replace />}
            />

            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </ToastProvider>
  );
}

export default App;

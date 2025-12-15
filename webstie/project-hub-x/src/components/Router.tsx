import { MemberProvider } from '@/integrations';
import { PageWrapper } from '@/integrations/cms-admin';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

import HomePage from '@/components/pages/HomePage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import ProjectDetailPage from '@/components/pages/ProjectDetailPage';
import CustomRequestPage from '@/components/pages/CustomRequestPage';
import ContactPage from '@/components/pages/ContactPage';
import DashboardPage from '@/components/pages/DashboardPage';
import FAQPage from '@/components/pages/FAQPage';
import AdminLoginPage from '@/components/pages/AdminLoginPage';
import AdminDashboardPage from '@/components/pages/AdminDashboardPage';

// Layout component that includes ScrollToTop and CMS content injection
function Layout() {
  return (
    <>
      <ScrollToTop />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetailPage />,
      },
      {
        path: "custom-request",
        element: <CustomRequestPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your dashboard">
            <DashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "terms",
        element: <Navigate to="/" replace />,
      },
      {
        path: "privacy",
        element: <Navigate to="/" replace />,
      },
      {
        path: "refund",
        element: <Navigate to="/" replace />,
      },
      {
        path: "admin/login",
        element: <AdminLoginPage />,
      },
      {
        path: "admin",
        element: <AdminDashboardPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}

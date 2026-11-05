import UnmaiCarbonHomePage from "./UnmaiCarbonHomePage";
import { ScrollToTop } from "./components/ScrollToTop";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FounderAdvisoryBoardPage } from "./components/FounderAdvisoryBoardPage";
import { CdmCountdownPage } from "./components/CdmCountdownPage";
import {
  AboutPage,
  ContactPage,
  DigitalInfrastructurePage,
  GlobalEngagementsPage,
  NewsArticlePage,
  NewsPage,
  ServicesPage,
} from "./OtherPages";
import { EventsPage } from "./components/EventsPage";

// Event Builder Components
import { DynamicEventRenderer } from "./event-builder/components/public/DynamicEventRenderer";
import { AdminLayout } from "./event-builder/components/admin/AdminLayout";
import { AdminDashboard } from "./event-builder/components/admin/AdminDashboard";
import { EventListPage } from "./event-builder/components/admin/EventListPage";
import { EventBuilder } from "./event-builder/components/builder/EventBuilder";
import { TemplatesPage } from "./event-builder/components/admin/TemplatesPage";
import { MediaLibraryPage } from "./event-builder/components/admin/MediaLibraryPage";
import { RegistrationsPage } from "./event-builder/components/admin/RegistrationsPage";
import { AdminSettingsPage } from "./event-builder/components/admin/AdminSettingsPage";
import { AdminLoginPage } from "./event-builder/components/admin/AdminLoginPage";
import { ProtectedRoute } from "./event-builder/components/admin/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Events Page & Dynamic Event Routes */}
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<DynamicEventRenderer />} />
        <Route path="/events/:slug/preview" element={<DynamicEventRenderer />} />
        <Route path="/event" element={<Navigate to="/events" replace />} />
        <Route path="/webinar" element={<Navigate to="/events/extending-legacy-cdm-cers-webinar" replace />} />

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Event Builder Fullscreen Studio */}
        <Route
          path="/admin/events/:id/builder"
          element={
            <ProtectedRoute>
              <EventBuilder />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard & Management Hub */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <EventListPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/templates"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <TemplatesPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/media"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <MediaLibraryPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/registrations"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <RegistrationsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminSettingsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Existing UNMAI Carbon Routes */}
        <Route path="/" element={<UnmaiCarbonHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/digital-infrastructure" element={<DigitalInfrastructurePage />} />
        <Route path="/global-engagements" element={<GlobalEngagementsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsArticlePage />} />
        <Route path="/insights" element={<Navigate to="/" replace />} />
        <Route path="/leadership" element={<Navigate to="/founder-advisory-board" replace />} />
        <Route path="/founder-advisory-board" element={<FounderAdvisoryBoardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cdm-countdown" element={<CdmCountdownPage />} />
        <Route path="/counter" element={<Navigate to="/#counter" replace />} />
        <Route path="/cdm-counter" element={<Navigate to="/#counter" replace />} />
        <Route path="/countdown" element={<Navigate to="/#counter" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


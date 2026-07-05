import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Protected Route */
import ProtectedRoute from "./ProtectedRoute";

/* ==========================
   Public Pages
========================== */

import Home from "../pages/Home";
import About from "../pages/about/About";
import Programs from "../pages/programs/Programs";
import Events from "../pages/events/Events";
import News from "../pages/news/News";
import Membership from "../pages/membership/Membership";
import Summit from "../pages/summit/Summit";
import Contact from "../pages/contact/Contact";

/* ==========================
   Authentication
========================== */

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ClaimMembership from "../pages/auth/ClaimMembership";
import VerifyOTP from "../pages/auth/VerifyOTP";
import CreatePassword from "../pages/auth/CreatePassword";

/* ==========================
   Dashboard Pages
========================== */

import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import MembershipCard from "../pages/dashboard/MembershipCard";
import EventsDashboard from "../pages/dashboard/Events";
import ProgramsDashboard from "../pages/dashboard/Programs";
import Certificates from "../pages/dashboard/Certificates";
import Notifications from "../pages/dashboard/Notifications";
import Settings from "../pages/dashboard/Settings";

/* ==========================
   Other
========================== */

import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==========================
            Public Pages
        =========================== */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/summit" element={<Summit />} />
        <Route path="/contact" element={<Contact />} />

        {/* ==========================
            Authentication
        =========================== */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate-membership" element={<ClaimMembership />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/create-password" element={<CreatePassword />} />

        {/* ==========================
            Protected Dashboard
        =========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/membership-card"
          element={
            <ProtectedRoute>
              <MembershipCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/events"
          element={
            <ProtectedRoute>
              <EventsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/programs"
          element={
            <ProtectedRoute>
              <ProgramsDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/certificates"
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ==========================
            404
        =========================== */}

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
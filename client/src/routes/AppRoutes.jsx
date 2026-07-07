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
   Dashboard Shell
========================== */

import DashboardShell from "../pages/dashboard/DashboardShell";

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

        {/* =====================================
            PUBLIC PAGES
        ====================================== */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/programs" element={<Programs />} />

        <Route path="/events" element={<Events />} />

        <Route path="/news" element={<News />} />

        <Route path="/membership" element={<Membership />} />

        <Route path="/summit" element={<Summit />} />

        <Route path="/contact" element={<Contact />} />

        {/* =====================================
            AUTHENTICATION
        ====================================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/activate-membership"
          element={<ClaimMembership />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOTP />}
        />

        <Route
          path="/create-password"
          element={<CreatePassword />}
        />

        {/* =====================================
            DASHBOARD
        ====================================== */}

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute>

              <DashboardShell />

            </ProtectedRoute>

          }

        >

          <Route

            index

            element={<Dashboard />}

          />

          <Route

            path="profile"

            element={<Profile />}

          />

          <Route

            path="membership-card"

            element={<MembershipCard />}

          />

          <Route

            path="events"

            element={<EventsDashboard />}

          />

          <Route

            path="programs"

            element={<ProgramsDashboard />}

          />

          <Route

            path="certificates"

            element={<Certificates />}

          />

          <Route

            path="notifications"

            element={<Notifications />}

          />

          <Route

            path="settings"

            element={<Settings />}

          />

        </Route>

        {/* =====================================
            404
        ====================================== */}

        <Route

          path="*"

          element={<NotFound />}

        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;
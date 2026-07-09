import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ==========================================
   ROUTE GUARDS
========================================== */

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

/* ==========================================
   PUBLIC PAGES
========================================== */

import Home from "../pages/Home";
import About from "../pages/about/About";
import Programs from "../pages/programs/Programs";
import Events from "../pages/events/Events";
import News from "../pages/news/News";
import Membership from "../pages/membership/Membership";
import Summit from "../pages/summit/Summit";
import Contact from "../pages/contact/Contact";

/* ==========================================
   AUTHENTICATION
========================================== */

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ClaimMembership from "../pages/auth/ClaimMembership";
import VerifyOTP from "../pages/auth/VerifyOTP";
import CreatePassword from "../pages/auth/CreatePassword";

/* ==========================================
   MEMBER DASHBOARD
========================================== */

import DashboardShell from "../pages/dashboard/DashboardShell";

import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile";
import MembershipCard from "../pages/dashboard/MembershipCard";
import EventsDashboard from "../pages/dashboard/Events";
import ProgramsDashboard from "../pages/dashboard/Programs";
import Certificates from "../pages/dashboard/Certificates";
import Notifications from "../pages/dashboard/Notifications";
import Settings from "../pages/dashboard/Settings";

/* ==========================================
   ADMIN
========================================== */

import AdminShell from "../pages/admin/AdminShell";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Members from "../pages/admin/Members";
import MemberProfile from "../pages/admin/MemberProfile";
import EditMember from "../pages/admin/EditMember";

/* ==========================================
   OTHER
========================================== */

import NotFound from "../pages/NotFound";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =====================================
            PUBLIC WEBSITE
        ====================================== */}

        <Route

          path="/"

          element={<Home />}

        />

        <Route

          path="/about"

          element={<About />}

        />

        <Route

          path="/programs"

          element={<Programs />}

        />

        <Route

          path="/events"

          element={<Events />}

        />

        <Route

          path="/news"

          element={<News />}

        />

        <Route

          path="/membership"

          element={<Membership />}

        />

        <Route

          path="/summit"

          element={<Summit />}

        />

        <Route

          path="/contact"

          element={<Contact />}

        />

        {/* =====================================
            AUTHENTICATION
        ====================================== */}

        <Route

          path="/login"

          element={<Login />}

        />

        <Route

          path="/register"

          element={<Register />}

        />

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
            MEMBER DASHBOARD
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
            ADMIN PORTAL
        ====================================== */}

        <Route

          path="/admin"

          element={

            <AdminRoute>

              <AdminShell />

            </AdminRoute>

          }

        >

          <Route

            index

            element={<AdminDashboard />}

          />

          <Route

            path="members"

            element={<Members />}

          />

          <Route

            path="members/:id"

            element={<MemberProfile />}

          />

          <Route

            path="members/:id/edit"

            element={<EditMember />}

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
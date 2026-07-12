import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";
import "./styles/variables.css";
import "./styles/utilities.css";
import "./styles/buttons.css";
import "./styles/section.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";
import { ProfileProvider } from "./context/ProfileContext";
import { PaymentProvider } from "./context/PaymentContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <AuthProvider>

      <DashboardProvider>

        <ProfileProvider>

          <PaymentProvider>

            <App />

          </PaymentProvider>

        </ProfileProvider>

      </DashboardProvider>

    </AuthProvider>

  </React.StrictMode>

);
import { useEffect, useMemo, useState } from "react";

import "./Leadership.css";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import LeadershipHero from "./components/LeadershipHero";
import PatronSection from "./components/PatronSection";
import ExecutiveSection from "./components/ExecutiveSection";
import AssemblySection from "./components/AssemblySection";
import CountyLeadershipSection from "./components/CountyLeadershipSection";

import leaderService from "../../services/leader.service";

export default function Leadership() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ==========================================================
     LOAD LEADERS
  ========================================================== */

  useEffect(() => {
    const loadLeadership = async () => {
      try {
        setLoading(true);

        const response =
          await leaderService.getLeaders({
            active: true,
          });

        setLeaders(response.data || []);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Unable to load leadership."
        );
      } finally {
        setLoading(false);
      }
    };

    loadLeadership();
  }, []);

  /* ==========================================================
     GROUP LEADERS
  ========================================================== */

  const patron = useMemo(
    () =>
      leaders.find(
        (leader) =>
          leader.category === "patron"
      ) || null,
    [leaders]
  );

  const executive = useMemo(
    () =>
      leaders
        .filter(
          (leader) =>
            leader.category ===
            "regional_executive"
        )
        .sort(
          (a, b) =>
            (a.displayOrder || 0) -
            (b.displayOrder || 0)
        ),
    [leaders]
  );

  const assembly = useMemo(
    () =>
      leaders
        .filter(
          (leader) =>
            leader.category ===
            "youth_assembly"
        )
        .sort(
          (a, b) =>
            (a.displayOrder || 0) -
            (b.displayOrder || 0)
        ),
    [leaders]
  );

  const countyLeadership = useMemo(() => {
    const grouped = {};

    leaders
      .filter(
        (leader) =>
          leader.category ===
          "county_leadership"
      )
      .forEach((leader) => {
        const county =
          leader.county || "Other";

        if (!grouped[county]) {
          grouped[county] = [];
        }

        grouped[county].push(leader);
      });

    return grouped;
  }, [leaders]);

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <>
      <Navbar />

      <main className="leadership-page">

        <LeadershipHero />

        {loading && (
          <div className="leadership-message">
            Loading leadership...
          </div>
        )}

        {error && (
          <div className="leadership-message error">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <PatronSection
              leader={patron}
            />

            <ExecutiveSection
              leaders={executive}
            />

            <AssemblySection
              leaders={assembly}
            />

            <CountyLeadershipSection
              counties={
                countyLeadership
              }
            />
          </>
        )}

      </main>

      <Footer />
    </>
  );
}
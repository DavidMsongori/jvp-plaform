import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import {
  getMember,
  activateMember,
  deactivateMember,
} from "../../services/admin.service";

import ProfileHeader from "../../components/admin/members/ProfileHeader";
import PersonalInformation from "../../components/admin/members/PersonalInformation";
import MembershipInformation from "../../components/admin/members/MembershipInformation";
import AccountInformation from "../../components/admin/members/AccountInformation";
import PaymentHistory from "../../components/admin/members/PaymentHistory";
import EventRegistrations from "../../components/admin/members/EventRegistrations";
import ActivityTimeline from "../../components/admin/members/ActivityTimeline";

import "../../components/admin/members/MemberProfile.css";

function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ==========================================================
     STATE
  ========================================================== */

  const [member, setMember] = useState(null);
  const [account, setAccount] = useState(null);

  const [payments, setPayments] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState({});

  const [registrations, setRegistrations] = useState([]);
  const [eventSummary, setEventSummary] = useState({});

  const [activities, setActivities] = useState([]);
  const [memberSummary, setMemberSummary] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [processing, setProcessing] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ==========================================================
     LOAD MEMBER PROFILE
  ========================================================== */

  const loadMember = async () => {
    try {
      setLoading(true);

      const response = await getMember(id);

      const profile = response.data;

      setMember(profile.member);

      setAccount(profile.account);

      setPayments(
        profile.payments?.items || []
      );

      setPaymentSummary(
        profile.payments?.summary || {}
      );

      setRegistrations(
        profile.events?.items || []
      );

      setEventSummary(
        profile.events?.summary || {}
      );

      setActivities(
        profile.activity?.items || []
      );

      setMemberSummary(
        profile.summary || {}
      );

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load member profile."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMember();
  }, [id]);

  /* ==========================================================
     ACTIVATE / DEACTIVATE
  ========================================================== */

  const handleToggleStatus = async () => {
    if (!member) return;

    try {
      setProcessing(true);

      if (member.accountActivated) {
        await deactivateMember(member._id);
      } else {
        await activateMember(member._id);
      }

      await loadMember();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to update member."
      );
    } finally {
      setProcessing(false);
    }
  };

  /* ==========================================================
     EDIT
  ========================================================== */

  const handleEdit = () => {
    navigate(`/admin/members/${id}/edit`);
  };

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <div className="member-profile-page">
        <div className="profile-loading">
          Loading member profile...
        </div>
      </div>
    );
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error) {
    return (
      <div className="member-profile-page">
        <Link
          to="/admin/members"
          className="back-link"
        >
          <FaArrowLeft />
          Back to Members
        </Link>

        <div className="profile-error">
          <h3>Unable to load member</h3>

          <p>{error}</p>
        </div>
      </div>
    );
  }

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <div className="member-profile-page">

      <Link
        to="/admin/members"
        className="back-link"
      >
        <FaArrowLeft />
        Back to Members
      </Link>

      <ProfileHeader
        member={member}
        account={account}
        onEdit={handleEdit}
        onToggleStatus={
          handleToggleStatus
        }
        processing={processing}
      />

      <div className="member-details-grid">

        <PersonalInformation
          member={member}
          account={account}
        />

        <MembershipInformation
          member={member}
          summary={memberSummary}
        />

        <AccountInformation
          account={account}
        />

        <PaymentHistory
          payments={payments}
          summary={paymentSummary}
        />

        <EventRegistrations
          registrations={registrations}
          summary={eventSummary}
        />

      </div>

      <ActivityTimeline
        activities={activities}
      />

    </div>
  );
}

export default MemberDetails;
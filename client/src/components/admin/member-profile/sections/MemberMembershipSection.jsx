import {
  CreditCard,
  ShieldCheck,
  Wallet,
  BadgeCheck,
  Calendar,
  UserCheck,
  Pencil,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../../../context/AdminContext";

import MemberStatusBadge from "../../members/MemberStatusBadge";

function MemberMembershipSection() {

  const navigate = useNavigate();

  const {

    selectedMember,

  } = useAdmin();

  if (!selectedMember) {

    return null;

  }

  return (

    <section className="member-profile-section">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="member-profile-section-header">

        <div>

          <h2>

            Membership Information

          </h2>

          <p>

            Membership status, activation and account information.

          </p>

        </div>

        <button

          className="section-edit-btn"

          onClick={() =>

            navigate(

              `/admin/members/${selectedMember._id}/edit`

            )

          }

        >

          <Pencil size={16} />

          Edit

        </button>

      </div>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="member-profile-grid">

        <div className="member-profile-field">

          <label>

            <CreditCard size={15} />

            Membership Number

          </label>

          <span>

            {

              selectedMember.membershipNumber ||

              "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <ShieldCheck size={15} />

            Membership Status

          </label>

          <MemberStatusBadge

            type="membership"

            value={

              selectedMember.membershipStatus

            }

          />

        </div>

        <div className="member-profile-field">

          <label>

            <BadgeCheck size={15} />

            Activation Status

          </label>

          <MemberStatusBadge

            type="activation"

            value={

              selectedMember.activationStatus

            }

          />

        </div>

        <div className="member-profile-field">

          <label>

            <Wallet size={15} />

            Payment Status

          </label>

          <MemberStatusBadge

            type="payment"

            value={

              selectedMember.paymentStatus

            }

          />

        </div>

        <div className="member-profile-field">

          <label>

            <Calendar size={15} />

            Member Since

          </label>

          <span>

            {

              selectedMember.memberSince

                ? new Date(

                    selectedMember.memberSince

                  ).toLocaleDateString()

                : "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Calendar size={15} />

            Membership Expiry

          </label>

          <span>

            {

              selectedMember.membershipExpiry

                ? new Date(

                    selectedMember.membershipExpiry

                  ).toLocaleDateString()

                : "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <UserCheck size={15} />

            Member Role

          </label>

          <span>

            {

              selectedMember.role

                ?.replace(/_/g, " ")

                .replace(

                  /\b\w/g,

                  c => c.toUpperCase()

                ) ||

              "-"

            }

          </span>

        </div>

        <div className="member-profile-field">

          <label>

            <Calendar size={15} />

            Last Profile Update

          </label>

          <span>

            {

              selectedMember.lastProfileUpdate

                ? new Date(

                    selectedMember.lastProfileUpdate

                  ).toLocaleString()

                : "-"

            }

          </span>

        </div>

      </div>

    </section>

  );

}

export default MemberMembershipSection;
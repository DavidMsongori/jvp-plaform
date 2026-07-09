import {
  UserCheck,
  ShieldCheck,
  CreditCard,
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  CheckCircle,
} from "lucide-react";

import { useAdmin } from "../../../context/AdminContext";

import MemberStatusBadge from "../members/MemberStatusBadge";

import "./EditMemberSidebar.css";

function EditMemberSidebar() {

  const {

    selectedMember,

  } = useAdmin();

  if (!selectedMember) {

    return null;

  }

  const profileCompleted =

    selectedMember.profileCompleted || 0;

  return (

    <aside className="edit-member-sidebar">

      {/* ==========================================
          PROFILE COMPLETION
      ========================================== */}

      <section className="edit-sidebar-card">

        <h3>

          Profile Completion

        </h3>

        <div className="completion-circle">

          <strong>

            {profileCompleted}%

          </strong>

        </div>

        <div className="completion-bar">

          <div

            className="completion-fill"

            style={{

              width: `${profileCompleted}%`,

            }}

          />

        </div>

      </section>

      {/* ==========================================
          ACCOUNT STATUS
      ========================================== */}

      <section className="edit-sidebar-card">

        <h3>

          Account Status

        </h3>

        <div className="sidebar-row">

          <ShieldCheck size={18} />

          <div>

            <small>

              Membership

            </small>

            <MemberStatusBadge

              type="membership"

              value={

                selectedMember.membershipStatus

              }

            />

          </div>

        </div>

        <div className="sidebar-row">

          <UserCheck size={18} />

          <div>

            <small>

              Activation

            </small>

            <MemberStatusBadge

              type="activation"

              value={

                selectedMember.activationStatus

              }

            />

          </div>

        </div>

        <div className="sidebar-row">

          <CreditCard size={18} />

          <div>

            <small>

              Payment

            </small>

            <MemberStatusBadge

              type="payment"

              value={

                selectedMember.paymentStatus

              }

            />

          </div>

        </div>

      </section>

      {/* ==========================================
          MEMBER SUMMARY
      ========================================== */}

      <section className="edit-sidebar-card">

        <h3>

          Member Summary

        </h3>

        <div className="sidebar-row">

          <MapPin size={18} />

          <div>

            <small>

              County

            </small>

            <strong>

              {selectedMember.county || "-"}

            </strong>

          </div>

        </div>

        <div className="sidebar-row">

          <Briefcase size={18} />

          <div>

            <small>

              Occupation

            </small>

            <strong>

              {

                selectedMember.occupation ||

                "-"

              }

            </strong>

          </div>

        </div>

        <div className="sidebar-row">

          <Calendar size={18} />

          <div>

            <small>

              Member Since

            </small>

            <strong>

              {

                selectedMember.memberSince

                  ? new Date(

                      selectedMember.memberSince

                    ).toLocaleDateString()

                  : "-"

              }

            </strong>

          </div>

        </div>

      </section>

      {/* ==========================================
          SYSTEM
      ========================================== */}

      <section className="edit-sidebar-card">

        <h3>

          System

        </h3>

        <div className="sidebar-row">

          <Clock size={18} />

          <div>

            <small>

              Last Login

            </small>

            <strong>

              {

                selectedMember.lastLogin

                  ? new Date(

                      selectedMember.lastLogin

                    ).toLocaleString()

                  : "Never"

              }

            </strong>

          </div>

        </div>

        <div className="sidebar-row">

          <CheckCircle size={18} />

          <div>

            <small>

              Last Updated

            </small>

            <strong>

              {

                selectedMember.updatedAt

                  ? new Date(

                      selectedMember.updatedAt

                    ).toLocaleDateString()

                  : "-"

              }

            </strong>

          </div>

        </div>

      </section>

    </aside>

  );

}

export default EditMemberSidebar;
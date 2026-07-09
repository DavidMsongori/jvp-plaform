import {
  UserCheck,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
} from "lucide-react";

import { useAdmin } from "../../../context/AdminContext";

import "./MemberProfileSidebar.css";

function MemberProfileSidebar() {

  const {

    selectedMember,

  } = useAdmin();

  if (!selectedMember) {

    return null;

  }

  const profileCompleted =

    selectedMember.profileCompleted || 0;

  return (

    <aside className="member-profile-sidebar">

      {/* ==========================================
          PROFILE COMPLETION
      ========================================== */}

      <section className="sidebar-card">

        <h3>

          Profile Completion

        </h3>

        <div className="profile-progress-circle">

          <strong>

            {profileCompleted}%

          </strong>

        </div>

        <div className="profile-progress">

          <div className="progress-track">

            <div

              className="progress-fill"

              style={{

                width: `${profileCompleted}%`

              }}

            />

          </div>

        </div>

      </section>

      {/* ==========================================
          ACCOUNT STATUS
      ========================================== */}

      <section className="sidebar-card">

        <h3>

          Account Status

        </h3>

        <div className="sidebar-item">

          <UserCheck size={18} />

          <div>

            <small>

              Membership

            </small>

            <strong>

              {

                selectedMember.membershipStatus

              }

            </strong>

          </div>

        </div>

        <div className="sidebar-item">

          <ShieldCheck size={18} />

          <div>

            <small>

              Activation

            </small>

            <strong>

              {

                selectedMember.activationStatus

              }

            </strong>

          </div>

        </div>

        <div className="sidebar-item">

          <CreditCard size={18} />

          <div>

            <small>

              Payment

            </small>

            <strong>

              {

                selectedMember.paymentStatus

              }

            </strong>

          </div>

        </div>

      </section>

      {/* ==========================================
          MEMBERSHIP
      ========================================== */}

      <section className="sidebar-card">

        <h3>

          Membership

        </h3>

        <div className="sidebar-item">

          <CheckCircle2 size={18} />

          <div>

            <small>

              Membership Number

            </small>

            <strong>

              {

                selectedMember.membershipNumber ||

                "-"

              }

            </strong>

          </div>

        </div>

        <div className="sidebar-item">

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

      <section className="sidebar-card">

        <h3>

          System Information

        </h3>

        <div className="sidebar-item">

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

        <div className="sidebar-item">

          <Calendar size={18} />

          <div>

            <small>

              Created

            </small>

            <strong>

              {

                selectedMember.createdAt

                  ? new Date(

                      selectedMember.createdAt

                    ).toLocaleDateString()

                  : "-"

              }

            </strong>

          </div>

        </div>

        <div className="sidebar-item">

          <Calendar size={18} />

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

export default MemberProfileSidebar;
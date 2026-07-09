import {
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
  User,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MemberStatusBadge from "./MemberStatusBadge";

import "./MemberRow.css";

function MemberRow({ member }) {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const fullName = [

    member.firstName,

    member.middleName,

    member.lastName,

  ]

    .filter(Boolean)

    .join(" ");

  return (

    <tr>

      {/* ==========================================
          MEMBER
      ========================================== */}

      <td>

        <div className="member-cell">

          <div className="member-avatar">

            {

              member.profilePhoto ? (

                <img

                  src={member.profilePhoto}

                  alt={fullName}

                />

              ) : (

                <User size={22} />

              )

            }

          </div>

          <div className="member-basic-info">

            <strong>

              {fullName}

            </strong>

            <small>

              {member.email || "-"}

            </small>

          </div>

        </div>

      </td>

      {/* ==========================================
          MEMBERSHIP NUMBER
      ========================================== */}

      <td>

        {member.membershipNumber || "-"}

      </td>

      {/* ==========================================
          COUNTY
      ========================================== */}

      <td>

        {member.county || "-"}

      </td>

      {/* ==========================================
          PHONE
      ========================================== */}

      <td>

        {member.phone || "-"}

      </td>

      {/* ==========================================
          ROLE
      ========================================== */}

      <td>

        {

          member.role

            ?.replace(/_/g, " ")

            .replace(

              /\b\w/g,

              c => c.toUpperCase()

            ) || "-"

        }

      </td>

      {/* ==========================================
          MEMBERSHIP STATUS
      ========================================== */}

      <td>

        <MemberStatusBadge

          type="membership"

          value={member.membershipStatus}

        />

      </td>

      {/* ==========================================
          PAYMENT STATUS
      ========================================== */}

      <td>

        <MemberStatusBadge

          type="payment"

          value={member.paymentStatus}

        />

      </td>

      {/* ==========================================
          JOINED
      ========================================== */}

      <td>

        {

          member.createdAt

            ? new Date(

                member.createdAt

              ).toLocaleDateString()

            : "-"

        }

      </td>

      {/* ==========================================
          ACTIONS
      ========================================== */}

      <td>

        <div className="member-actions">

          <button

            className="action-button"

            title="View"

            onClick={() =>

              navigate(

                `/admin/members/${member._id}`

              )

            }

          >

            <Eye size={16} />

          </button>

          <button

            className="action-button"

            title="Edit"

            onClick={() =>

              navigate(

                `/admin/members/${member._id}/edit`

              )

            }

          >

            <Pencil size={16} />

          </button>

          <button

            className="action-button"

            title="Delete"

          >

            <Trash2 size={16} />

          </button>

          <button

            className="action-button"

            onClick={() =>

              setMenuOpen(

                !menuOpen

              )

            }

          >

            <MoreVertical size={16} />

          </button>

          {

            menuOpen && (

              <div className="member-dropdown">

                <button>

                  Activate

                </button>

                <button>

                  Suspend

                </button>

                <button>

                  Reset Password

                </button>

                <button>

                  Issue Card

                </button>

              </div>

            )

          }

        </div>

      </td>

    </tr>

  );

}

export default MemberRow;
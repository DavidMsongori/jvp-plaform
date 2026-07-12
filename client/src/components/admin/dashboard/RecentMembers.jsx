import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

import SectionCard from "../common/SectionCard";
import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";

import "./RecentMembers.css";

const RecentMembers = ({ members = [] }) => {
  return (
    <SectionCard
      title="Recent Members"
      subtitle="Newest registrations."
    >
      {members.length === 0 ? (
        <EmptyState
          title="No Members"
          message="No recent registrations."
        />
      ) : (
        <div className="recent-members">

          {members.map((member) => (

            <div
              key={member._id}
              className="recent-member"
            >

              <div className="recent-avatar">
                {(member.firstName || "U")[0]}
              </div>

              <div className="recent-info">

                <h6>
                  {member.firstName} {member.lastName}
                </h6>

                <small>
                  {member.membershipNumber}
                </small>

              </div>

              <StatusBadge
                status={member.membershipStatus}
              />

              <Link
                to={`/admin/members/${member._id}`}
                className="btn btn-sm btn-outline-primary"
              >
                <Eye size={16} />
              </Link>

            </div>

          ))}

        </div>
      )}
    </SectionCard>
  );
};

export default RecentMembers;
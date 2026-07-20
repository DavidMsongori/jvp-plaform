import {
  Edit,
  Trash2,
  UserCheck,
} from "lucide-react";

const DEFAULT_AVATAR = "/avatar.png";

export default function LeaderTable({
  leaders = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <div className="empty-state">
        Loading leadership assignments...
      </div>
    );
  }

  /* ==========================================================
     EMPTY
  ========================================================== */

  if (!leaders.length) {
    return (
      <div className="empty-state">
        <UserCheck size={54} />

        <h3>No Leaders Found</h3>

        <p>
          No leadership assignments match the selected
          filters.
        </p>
      </div>
    );
  }

  /* ==========================================================
     HELPERS
  ========================================================== */

  const getLeaderName = (leader) => {
    return (
      leader.profile?.fullName ||
      "Unknown Leader"
    );
  };

  const getPhoto = (leader) => {
    const photo =
      leader.profile?.profilePhoto;

    if (!photo) {
      return DEFAULT_AVATAR;
    }

    // Cloudinary object
    if (
      typeof photo === "object" &&
      photo.url
    ) {
      return photo.url;
    }

    // Legacy string
    if (typeof photo === "string") {
      return photo;
    }

    return DEFAULT_AVATAR;
  };

  const getCounty = (leader) => {
    return (
      leader.profile?.county ||
      leader.county ||
      "-"
    );
  };

  const getMemberNumber = (leader) => {
    return (
      leader.profile?.memberNumber ||
      ""
    );
  };

  const formatCategory = (category) =>
    category
      ?.replaceAll("_", " ")
      .replace(
        /\b\w/g,
        (char) => char.toUpperCase()
      );

  /* ==========================================================
     TABLE
  ========================================================== */

  return (
    <div className="leadership-card">

      <table className="leader-table">

        <thead>

          <tr>
            <th>Leader</th>
            <th>Position</th>
            <th>Category</th>
            <th>County</th>
            <th>Status</th>
            <th>Display Order</th>
            <th width="130">
              Actions
            </th>
          </tr>

        </thead>

        <tbody>

          {leaders.map((leader) => (

            <tr key={leader._id}>

              <td>

                <div className="leader-info">

                  <img
                    src={getPhoto(leader)}
                    alt={getLeaderName(leader)}
                    onError={(e) => {
                      e.currentTarget.src =
                        DEFAULT_AVATAR;
                    }}
                  />

                  <div>

                    <strong>
                      {getLeaderName(leader)}
                    </strong>

                    {!!getMemberNumber(
                      leader
                    ) && (

                      <small>
                        {
                          getMemberNumber(
                            leader
                          )
                        }
                      </small>

                    )}

                  </div>

                </div>

              </td>

              <td>
                {leader.position}
              </td>

              <td>
                {formatCategory(
                  leader.category
                )}
              </td>

              <td>
                {getCounty(leader)}
              </td>

              <td>

                <span
                  className={
                    leader.isActive
                      ? "status active"
                      : "status inactive"
                  }
                >
                  {leader.isActive
                    ? "Active"
                    : "Inactive"}
                </span>

              </td>

              <td>
                {leader.displayOrder}
              </td>

              <td>

                <div className="table-actions">

                  <button
                    className="icon-action edit"
                    onClick={() =>
                      onEdit?.(leader)
                    }
                    title="Edit"
                  >
                    <Edit size={17} />
                  </button>

                  <button
                    className="icon-action delete"
                    onClick={() =>
                      onDelete?.(leader)
                    }
                    title="Delete"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
import "./PatronSection.css";

const DEFAULT_AVATAR = "/avatar.png";

export default function PatronSection({ leader }) {
  if (!leader) return null;

  const profile = leader.profile || {};

  const photo =
    typeof profile.profilePhoto === "object"
      ? profile.profilePhoto?.url
      : profile.profilePhoto;

  const fullName =
    profile.fullName || "Patron";

  const title =
    profile.title ||
    leader.position ||
    "Patron";

  const organization =
    profile.organization || "";

  const bio =
    profile.bio ||
    "The Patron provides strategic leadership, mentorship and guidance to the organization while championing youth development, partnerships and regional transformation.";

  return (
    <section className="patron-section">

      <div className="patron-heading">

        <span>Leadership</span>

        <h2>Our Patron</h2>

        <p>
          The Patron serves as the chief mentor of
          Jumuiya ya Vijana wa Pwani, providing
          strategic guidance, inspiration and
          institutional support.
        </p>

      </div>

      <div className="patron-card">

        <div className="patron-image">

          <img
            src={photo || DEFAULT_AVATAR}
            alt={fullName}
            onError={(e) => {
              e.currentTarget.src =
                DEFAULT_AVATAR;
            }}
          />

        </div>

        <div className="patron-content">

          <span className="patron-role">
            {title}
          </span>

          <h3>{fullName}</h3>

          {organization && (
            <h4>{organization}</h4>
          )}

          <p>{bio}</p>

        </div>

      </div>

    </section>
  );
}
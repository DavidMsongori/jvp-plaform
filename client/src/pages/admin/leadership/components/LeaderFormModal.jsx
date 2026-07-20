import { useEffect, useState } from "react";
import { X } from "lucide-react";

import MemberSearch from "../../../../components/common/MemberSearch";

const CATEGORIES = [
  {
    value: "patron",
    label: "Patron",
  },
  {
    value: "regional_executive",
    label: "Regional Executive Committee",
  },
  {
    value: "youth_assembly",
    label: "Youth Assembly",
  },
  {
    value: "county_leadership",
    label: "County Leadership",
  },
];

const REGIONAL_POSITIONS = [
  "President",
  "Deputy President",
  "Secretary General",
  "Deputy Secretary General",
  "National Treasurer",
  "Deputy National Treasurer",
  "Organizing Secretary",
  "Deputy Organizing Secretary",
  "Women's Representative",
  "Deputy Women's Representative",
  "Youth Representative",
  "Deputy Youth Representative",
  "Publicity Secretary",
  "Deputy Publicity Secretary",
  "Projects Coordinator",
];

const ASSEMBLY_POSITIONS = [
  "Speaker",
  "Deputy Speaker",
  "Clerk",
  "Deputy Clerk",
  "Youth MP",
];

const COUNTY_POSITIONS = [
  "Governor",
  "Deputy Governor",
  "Youth MCA",
];

const COUNTIES = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita Taveta",
];

const INITIAL_FORM = {
  member: "",

  category: "regional_executive",

  position: "",

  county: "",

  displayOrder: 1,

  termStart: "",

  termEnd: "",

  patron: {
    name: "",
    organization: "",
    biography: "",
    photo: "",
  },
};

export default function LeaderFormModal({
  open,
  onClose,
  onSave,
  leader = null,
  loading = false,
}) {
  const [form, setForm] = useState(INITIAL_FORM);

  const [selectedMember, setSelectedMember] =
    useState(null);

  const [errors, setErrors] = useState({});

  /* ==========================================================
     LOAD FORM
  ========================================================== */

  useEffect(() => {
    if (!open) return;

    if (leader) {
      setForm({
        ...INITIAL_FORM,
        ...leader,
      });

      setSelectedMember(
        leader.member || null
      );
    } else {
      setForm(INITIAL_FORM);

      setSelectedMember(null);

      setErrors({});
    }
  }, [leader, open]);

  /* ==========================================================
     UPDATE FIELD
  ========================================================== */

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* ==========================================================
     UPDATE PATRON
  ========================================================== */

  const updatePatron = (field, value) => {
    setForm((prev) => ({
      ...prev,
      patron: {
        ...prev.patron,
        [field]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      patronName: "",
    }));
  };

  /* ==========================================================
     CATEGORY CHANGE
  ========================================================== */

  const changeCategory = (category) => {
    setForm((prev) => ({
      ...prev,

      category,

      member:
        category === "patron"
          ? ""
          : prev.member,

      position: "",

      county:
        category === "county_leadership"
          ? prev.county
          : "",
    }));

    setErrors({});

    if (category === "patron") {
      setSelectedMember(null);
    }
  };

  /* ==========================================================
     MEMBER SELECT
  ========================================================== */

  const handleMemberSelect = (
    member
  ) => {
    setSelectedMember(member);

    update(
      "member",
      member?._id || ""
    );

    setErrors((prev) => ({
      ...prev,
      member: "",
    }));
  };

  /* ==========================================================
     AVAILABLE POSITIONS
  ========================================================== */

  const positions = (() => {
    switch (form.category) {
      case "regional_executive":
        return REGIONAL_POSITIONS;

      case "youth_assembly":
        return ASSEMBLY_POSITIONS;

      case "county_leadership":
        return COUNTY_POSITIONS;

      default:
        return [];
    }
  })();

  /* ==========================================================
     VALIDATE
  ========================================================== */

  const validate = () => {
    const validationErrors = {};

    if (
      form.category !== "patron"
    ) {
      if (!form.member) {
        validationErrors.member =
          "Please select a member.";
      }

      if (!form.position) {
        validationErrors.position =
          "Please select a position.";
      }

      if (
        form.category ===
          "county_leadership" &&
        !form.county
      ) {
        validationErrors.county =
          "Please select a county.";
      }
    } else {
      if (
        !form.patron.name.trim()
      ) {
        validationErrors.patronName =
          "Patron name is required.";
      }
    }

    if (
      !form.displayOrder ||
      form.displayOrder < 1
    ) {
      validationErrors.displayOrder =
        "Display order must be at least 1.";
    }

    if (
      form.termStart &&
      form.termEnd &&
      new Date(form.termEnd) <
        new Date(form.termStart)
    ) {
      validationErrors.termEnd =
        "Term End cannot be before Term Start.";
    }

    setErrors(validationErrors);

    return (
      Object.keys(
        validationErrors
      ).length === 0
    );
  };

  /* ==========================================================
     SUBMIT
  ========================================================== */

  const submit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSave(form);
  };

  if (!open) return null;
    return (
    <div className="modal-overlay">

      <div className="modal leadership-modal">

        <div className="modal-header">

          <h2>
            {leader
              ? "Edit Leadership Assignment"
              : "Assign Leader"}
          </h2>

          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            disabled={loading}
          >
            <X size={20} />
          </button>

        </div>

        <form onSubmit={submit} noValidate>

          <div className="form-grid">

            {/* ==========================================
                CATEGORY
            ========================================== */}

            <div className="form-group">

              <label>Category</label>

              <select
                value={form.category}
                disabled={loading}
                onChange={(e) =>
                  changeCategory(e.target.value)
                }
              >
                {CATEGORIES.map((category) => (
                  <option
                    key={category.value}
                    value={category.value}
                  >
                    {category.label}
                  </option>
                ))}
              </select>

            </div>

            {/* ==========================================
                MEMBER SEARCH
            ========================================== */}

            {form.category !== "patron" && (

              <div className="form-group full">

                <MemberSearch
                  value={selectedMember}
                  disabled={loading}
                  onChange={handleMemberSelect}
                />

                {errors.member && (
                  <small className="form-error">
                    {errors.member}
                  </small>
                )}

              </div>

            )}

            {/* ==========================================
                PATRON
            ========================================== */}

            {form.category === "patron" && (

              <>

                <div className="form-group">

                  <label>Patron Name</label>

                  <input
                    type="text"
                    value={form.patron.name}
                    disabled={loading}
                    onChange={(e) =>
                      updatePatron(
                        "name",
                        e.target.value
                      )
                    }
                  />

                  {errors.patronName && (
                    <small className="form-error">
                      {errors.patronName}
                    </small>
                  )}

                </div>

                <div className="form-group">

                  <label>Organization</label>

                  <input
                    type="text"
                    value={
                      form.patron.organization
                    }
                    disabled={loading}
                    onChange={(e) =>
                      updatePatron(
                        "organization",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="form-group full">

                  <label>Biography</label>

                  <textarea
                    rows={4}
                    value={
                      form.patron.biography
                    }
                    disabled={loading}
                    onChange={(e) =>
                      updatePatron(
                        "biography",
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="form-group full">

                  <label>Photo URL</label>

                  <input
                    type="text"
                    value={
                      form.patron.photo
                    }
                    disabled={loading}
                    onChange={(e) =>
                      updatePatron(
                        "photo",
                        e.target.value
                      )
                    }
                  />

                </div>

              </>

            )}

            {/* ==========================================
                POSITION
            ========================================== */}

            {form.category !== "patron" && (

              <div className="form-group">

                <label>Position</label>

                <select
                  value={form.position}
                  disabled={loading}
                  onChange={(e) =>
                    update(
                      "position",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select Position
                  </option>

                  {positions.map((position) => (
                    <option
                      key={position}
                      value={position}
                    >
                      {position}
                    </option>
                  ))}

                </select>

                {errors.position && (
                  <small className="form-error">
                    {errors.position}
                  </small>
                )}

              </div>

            )}

            {/* ==========================================
                COUNTY
            ========================================== */}

            {form.category ===
              "county_leadership" && (

              <div className="form-group">

                <label>County</label>

                <select
                  value={form.county}
                  disabled={loading}
                  onChange={(e) =>
                    update(
                      "county",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Select County
                  </option>

                  {COUNTIES.map((county) => (
                    <option
                      key={county}
                      value={county}
                    >
                      {county}
                    </option>
                  ))}

                </select>

                {errors.county && (
                  <small className="form-error">
                    {errors.county}
                  </small>
                )}

              </div>

            )}

            {/* ==========================================
                DISPLAY ORDER
            ========================================== */}

            <div className="form-group">

              <label>Display Order</label>

              <input
                type="number"
                min="1"
                value={form.displayOrder}
                disabled={loading}
                onChange={(e) =>
                  update(
                    "displayOrder",
                    Number(e.target.value)
                  )
                }
              />

              {errors.displayOrder && (
                <small className="form-error">
                  {errors.displayOrder}
                </small>
              )}

            </div>

            {/* ==========================================
                TERM START
            ========================================== */}

            <div className="form-group">

              <label>Term Start</label>

              <input
                type="date"
                value={form.termStart}
                disabled={loading}
                onChange={(e) =>
                  update(
                    "termStart",
                    e.target.value
                  )
                }
              />

            </div>

            {/* ==========================================
                TERM END
            ========================================== */}

            <div className="form-group">

              <label>Term End</label>

              <input
                type="date"
                value={form.termEnd}
                disabled={loading}
                onChange={(e) =>
                  update(
                    "termEnd",
                    e.target.value
                  )
                }
              />

              {errors.termEnd && (
                <small className="form-error">
                  {errors.termEnd}
                </small>
              )}

            </div>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="btn-secondary"
              disabled={loading}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading
                ? leader
                  ? "Updating..."
                  : "Assigning..."
                : leader
                ? "Update Leader"
                : "Assign Leader"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
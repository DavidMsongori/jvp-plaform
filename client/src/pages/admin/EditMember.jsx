import EditMemberHeader from "../../components/admin/member-edit/EditMemberHeader";
import EditMemberForm from "../../components/admin/member-edit/EditMemberForm";
import EditMemberSidebar from "../../components/admin/member-edit/EditMemberSidebar";

import "./EditMember.css";

function EditMember() {

  return (

    <section className="edit-member-page">

      {/* ==========================================
          HEADER
      ========================================== */}

      <EditMemberHeader />

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="edit-member-grid">

        <div className="edit-member-main">

          <EditMemberForm />

        </div>

        <aside className="edit-member-side">

          <EditMemberSidebar />

        </aside>

      </div>

    </section>

  );

}

export default EditMember;
import { useEffect, useState } from "react";

import {
  getMembers,
} from "../../services/admin.service";

import MemberSummary from "../../components/admin/members/MemberSummary";
import MemberFilters from "../../components/admin/members/MemberFilters";
import MembersTable from "../../components/admin/members/MembersTable";

import "./Members.css";

function Members() {

  const [members, setMembers] = useState([]);

  const [summary, setSummary] = useState({});

  const [pagination, setPagination] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [filters, setFilters] =
    useState({

      search: "",

      county: "",

      membershipStatus: "",

      membershipType: "",

      page: 1,

      limit: 10,

    });

  /* ==========================================
     LOAD MEMBERS
  ========================================== */

  const loadMembers = async () => {

    try {

      setLoading(true);

      const response =
        await getMembers(filters);

      setMembers(
        response.data.members
      );

      setSummary(
        response.data.summary
      );

      setPagination(
        response.data.pagination
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadMembers();

  }, [filters]);

  return (

    <div className="admin-members-page">

      <div className="page-header">

        <div>

          <h1>

            Members

          </h1>

          <p>

            Manage all registered JVP members.

          </p>

        </div>

      </div>

      <MemberSummary
        summary={summary}
      />

      <MemberFilters

        filters={filters}

        setFilters={setFilters}

      />

      <MembersTable

        members={members}

        loading={loading}

        pagination={pagination}

        filters={filters}

        setFilters={setFilters}

        refresh={loadMembers}

      />

    </div>

  );

}

export default Members;
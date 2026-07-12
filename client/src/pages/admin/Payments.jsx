import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock3,
  Loader2,
  RefreshCw,
  Download,
} from "lucide-react";

import { getPayments } from "../../services/admin.service";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const loadPayments = async () => {
    try {
      setLoading(true);

      const res = await getPayments();

      setPayments(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const text = search.toLowerCase();

      const matchSearch =
        payment.memberName?.toLowerCase().includes(text) ||
        payment.phone?.toLowerCase().includes(text) ||
        payment.receiptNumber?.toLowerCase().includes(text) ||
        payment.transactionId?.toLowerCase().includes(text);

      const matchStatus =
        status === "ALL" || payment.status === status;

      return matchSearch && matchStatus;
    });
  }, [payments, search, status]);

  const stats = useMemo(() => {
    const successful = payments.filter(
      (p) => p.status === "SUCCESS"
    );

    return {
      total: payments.length,
      successful: successful.length,
      pending: payments.filter((p) => p.status === "PENDING").length,
      failed: payments.filter((p) => p.status === "FAILED").length,
      revenue: successful.reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
      ),
    };
  }, [payments]);

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            <CreditCard className="me-2" />
            Payments
          </h2>

          <p className="text-muted">
            Membership payment management.
          </p>
        </div>

        <div className="d-flex gap-2">

          <button
            className="btn btn-outline-primary"
            onClick={loadPayments}
          >
            <RefreshCw size={18} className="me-2" />
            Refresh
          </button>

          <button className="btn btn-success">
            <Download size={18} className="me-2" />
            Export
          </button>

        </div>
      </div>

      {/* Statistics */}

      <div className="row g-3 mb-4">

        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <small>Total Payments</small>
              <h3>{stats.total}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <small>Successful</small>
              <h3 className="text-success">
                {stats.successful}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <small>Pending</small>
              <h3 className="text-warning">
                {stats.pending}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <small>Total Revenue</small>
              <h3 className="text-primary">
                KES {stats.revenue.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <div className="row">

            <div className="col-md-8">

              <div className="input-group">

                <span className="input-group-text">
                  <Search size={18} />
                </span>

                <input
                  className="form-control"
                  placeholder="Search receipt, phone, member..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

            </div>

            <div className="col-md-4">

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="SUCCESS">Successful</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
              </select>

            </div>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="card border-0 shadow-sm">

        <div className="table-responsive">

          <table className="table table-hover align-middle mb-0">

            <thead className="table-light">

              <tr>
                <th>Receipt</th>
                <th>Member</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    <Loader2 className="spin" />
                  </td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment._id}>

                    <td>{payment.receiptNumber}</td>

                    <td>{payment.memberName}</td>

                    <td>{payment.phone}</td>

                    <td>KES {Number(payment.amount).toLocaleString()}</td>

                    <td>
                      {payment.status === "SUCCESS" && (
                        <span className="badge bg-success">
                          <CheckCircle2 size={14} className="me-1" />
                          Success
                        </span>
                      )}

                      {payment.status === "FAILED" && (
                        <span className="badge bg-danger">
                          <XCircle size={14} className="me-1" />
                          Failed
                        </span>
                      )}

                      {payment.status === "PENDING" && (
                        <span className="badge bg-warning text-dark">
                          <Clock3 size={14} className="me-1" />
                          Pending
                        </span>
                      )}
                    </td>

                    <td>
                      {new Date(payment.createdAt).toLocaleString()}
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Payments;
import { Link } from "react-router-dom";
import { CreditCard } from "lucide-react";

import SectionCard from "../common/SectionCard";
import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";

import "./RecentPayments.css";

const RecentPayments = ({ payments = [] }) => {
  return (
    <SectionCard
      title="Recent Payments"
      subtitle="Latest membership payments."
      action={
        <Link
          to="/admin/payments"
          className="btn btn-sm btn-outline-primary"
        >
          View All
        </Link>
      }
    >
      {payments.length === 0 ? (
        <EmptyState
          title="No Payments"
          message="No payment records available."
        />
      ) : (
        <div className="recent-payments">

          {payments.map((payment) => (

            <div
              className="payment-item"
              key={payment._id}
            >

              <div className="payment-icon">
                <CreditCard size={20} />
              </div>

              <div className="payment-info">

                <h6>{payment.memberName}</h6>

                <small>
                  {payment.receiptNumber}
                </small>

              </div>

              <div className="payment-amount">
                KES {Number(payment.amount).toLocaleString()}
              </div>

              <StatusBadge status={payment.status} />

            </div>

          ))}

        </div>
      )}
    </SectionCard>
  );
};

export default RecentPayments;
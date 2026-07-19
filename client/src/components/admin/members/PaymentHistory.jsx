import "./MemberProfile.css";

function PaymentHistory({
  payments = [],
  summary = {},
}) {
  return (
    <div className="profile-card">

      <div className="card-header">
        <h3>Payment History</h3>
      </div>

      <div className="profile-summary-grid">

        <div className="summary-item">
          <span>Total Payments</span>
          <strong>
            {summary.totalPayments ?? payments.length}
          </strong>
        </div>

        <div className="summary-item">
          <span>Total Amount</span>
          <strong>
            KES{" "}
            {Number(
              summary.totalAmount || 0
            ).toLocaleString()}
          </strong>
        </div>

        <div className="summary-item">
          <span>Latest Payment</span>
          <strong>
            {summary.lastPaymentDate
              ? new Date(
                  summary.lastPaymentDate
                ).toLocaleDateString()
              : "-"}
          </strong>
        </div>

      </div>

      {payments.length === 0 ? (
        <div className="empty-state">
          <p>No payment records found.</p>
        </div>
      ) : (
        <div className="payment-table-wrapper">

          <table className="payment-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr key={payment._id}>

                  <td>
                    {payment.createdAt
                      ? new Date(
                          payment.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    {payment.reference ||
                      payment.transactionReference ||
                      payment.mpesaReceiptNumber ||
                      "-"}
                  </td>

                  <td>
                    KES{" "}
                    {Number(
                      payment.amount || 0
                    ).toLocaleString()}
                  </td>

                  <td>
                    {payment.paymentMethod ||
                      payment.method ||
                      "-"}
                  </td>

                  <td>

                    <span
                      className={`info-badge payment-${(
                        payment.status || "pending"
                      ).toLowerCase()}`}
                    >
                      {payment.status || "Pending"}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default PaymentHistory;
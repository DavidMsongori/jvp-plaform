import "./MemberStatusBadge.css";

function MemberStatusBadge({

  type,

  value,

}) {

  const status =

    value || "Unknown";

  const getClassName = () => {

    switch (type) {

      /* ==========================================
         MEMBERSHIP STATUS
      ========================================== */

      case "membership":

        switch (status.toLowerCase()) {

          case "active":

            return "badge success";

          case "pending":

            return "badge warning";

          case "suspended":

            return "badge danger";

          case "expired":

            return "badge dark";

          default:

            return "badge neutral";

        }

      /* ==========================================
         PAYMENT STATUS
      ========================================== */

      case "payment":

        switch (status.toLowerCase()) {

          case "paid":

            return "badge success";

          case "pending":

            return "badge warning";

          case "exempt":

            return "badge info";

          default:

            return "badge neutral";

        }

      /* ==========================================
         ACTIVATION STATUS
      ========================================== */

      case "activation":

        switch (status.toLowerCase()) {

          case "activated":

            return "badge success";

          case "pending otp":

            return "badge warning";

          case "not activated":

            return "badge danger";

          default:

            return "badge neutral";

        }

      /* ==========================================
         DEFAULT
      ========================================== */

      default:

        return "badge neutral";

    }

  };

  return (

    <span className={getClassName()}>

      {status}

    </span>

  );

}

export default MemberStatusBadge;
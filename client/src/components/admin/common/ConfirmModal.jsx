import "./ConfirmModal.css";

const ConfirmModal = ({
  show,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div className="confirm-backdrop">

      <div className="confirm-modal">

        <div className="confirm-header">
          <h4>{title}</h4>
        </div>

        <div className="confirm-body">
          <p>{message}</p>
        </div>

        <div className="confirm-footer">

          <button
            className="btn btn-light"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className={`btn btn-${confirmVariant}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
};

export default ConfirmModal;
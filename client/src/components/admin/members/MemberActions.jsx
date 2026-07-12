import { useState } from "react";

import {
  FaEllipsisV,
  FaEye,
  FaEdit,
} from "react-icons/fa";

import {
  MdPersonAdd,
  MdPersonOff,
} from "react-icons/md";

import {
  RiDeleteBin6Line,
} from "react-icons/ri";

import "./Members.css";

function MemberActions({

  member,

  onView,

  onEdit,

  onActivate,

  onDeactivate,

  onDelete,

}) {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="member-actions">

      <button

        className="action-toggle"

        onClick={() =>
          setOpen(!open)
        }

      >

        <FaEllipsisV />

      </button>

      {open && (

        <div className="action-menu">

          <button

            onClick={() => {

              setOpen(false);

              onView?.(member);

            }}

          >

            <FaEye />

            <span>View</span>

          </button>

          <button

            onClick={() => {

              setOpen(false);

              onEdit?.(member);

            }}

          >

            <FaEdit />

            <span>Edit</span>

          </button>

          {member.membershipStatus ===
          "active" ? (

            <button

              onClick={() => {

                setOpen(false);

                onDeactivate?.(member);

              }}

            >

              <MdPersonOff />

              <span>Deactivate</span>

            </button>

          ) : (

            <button

              onClick={() => {

                setOpen(false);

                onActivate?.(member);

              }}

            >

              <MdPersonAdd />

              <span>Activate</span>

            </button>

          )}

          <button

            className="danger"

            onClick={() => {

              setOpen(false);

              onDelete?.(member);

            }}

          >

            <RiDeleteBin6Line />

            <span>Delete</span>

          </button>

        </div>

      )}

    </div>

  );

}

export default MemberActions;
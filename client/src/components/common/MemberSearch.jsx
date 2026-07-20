import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Search,
  Loader2,
  User,
  X,
} from "lucide-react";

import memberService from "../../services/member.service";

import "./MemberSearch.css";

const DEFAULT_AVATAR = "/avatar.png";

export default function MemberSearch({

  value,

  onChange,

  placeholder = "Search member...",

  disabled = false,

}) {

  const [query, setQuery] = useState("");

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const wrapperRef = useRef(null);

  /* ==========================================================
     LOAD MEMBERS
  ========================================================== */

  useEffect(() => {

    if (!query.trim()) {

      setMembers([]);

      return;

    }

    const timer = setTimeout(async () => {

      try {

        setLoading(true);

        const response =
          await memberService.searchMembers(query);

        setMembers(response.data || []);

        setShowResults(true);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }, 300);

    return () => clearTimeout(timer);

  }, [query]);

  /* ==========================================================
     OUTSIDE CLICK
  ========================================================== */

  useEffect(() => {

    function handleClick(event) {

      if (

        wrapperRef.current &&

        !wrapperRef.current.contains(event.target)

      ) {

        setShowResults(false);

      }

    }

    document.addEventListener(

      "mousedown",

      handleClick

    );

    return () =>

      document.removeEventListener(

        "mousedown",

        handleClick

      );

  }, []);

  /* ==========================================================
     SELECT MEMBER
  ========================================================== */

  const selectMember = (member) => {

    onChange(member);

    setQuery("");

    setShowResults(false);

  };

  /* ==========================================================
     CLEAR
  ========================================================== */

  const clearSelection = () => {

    onChange(null);

    setQuery("");

    setMembers([]);

  };

  return (

    <div

      className="member-search"

      ref={wrapperRef}

    >

      <label>

        Member

      </label>

      {value ? (

        <div className="selected-member">

          <img

            src={

              value.profilePhoto ||

              DEFAULT_AVATAR

            }

            alt={value.firstName}

          />

          <div>

            <strong>

              {value.firstName}

              {" "}

              {value.middleName}

              {" "}

              {value.lastName}

            </strong>

            <span>

              {value.memberNumber}

            </span>

          </div>

          {!disabled && (

            <button

              type="button"

              onClick={clearSelection}

            >

              <X size={16} />

            </button>

          )}

        </div>

      ) : (

        <>

          <div className="member-search-input">

            <Search size={18} />

            <input

              type="text"

              value={query}

              disabled={disabled}

              placeholder={placeholder}

              onFocus={() =>

                setShowResults(true)

              }

              onChange={(e) =>

                setQuery(e.target.value)

              }

            />

            {loading && (

              <Loader2

                size={18}

                className="spin"

              />

            )}

          </div>

          {showResults && members.length > 0 && (

            <div className="member-results">

              {members.map((member) => (

                <button

                  key={member._id}

                  type="button"

                  className="member-result"

                  onClick={() =>

                    selectMember(member)

                  }

                >

                  <img

                    src={

                      member.profilePhoto ||

                      DEFAULT_AVATAR

                    }

                    alt={member.firstName}

                  />

                  <div>

                    <strong>

                      {member.firstName}

                      {" "}

                      {member.middleName}

                      {" "}

                      {member.lastName}

                    </strong>

                    <span>

                      {member.memberNumber}

                    </span>

                    <small>

                      {member.county}

                    </small>

                  </div>

                </button>

              ))}

            </div>

          )}

          {showResults &&
            !loading &&
            query &&
            members.length === 0 && (

            <div className="member-empty">

              <User size={18} />

              <span>

                No members found

              </span>

            </div>

          )}

        </>

      )}

    </div>

  );

}
function PersonalSection({

  formData,

  handleChange,

}) {

  return (

    <section className="profile-section">

      <h2>

        Personal Information

      </h2>

      <div className="profile-grid">

        <div className="form-group">

          <label>First Name</label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>Middle Name</label>

          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>Last Name</label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>Gender</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >

            <option value="">Select</option>

            <option value="Male">Male</option>

            <option value="Female">Female</option>

            <option value="Other">Other</option>

          </select>

        </div>

        <div className="form-group">

          <label>Date of Birth</label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>Phone Number</label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

        </div>

        <div className="form-group full-width">

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

        </div>

      </div>

    </section>

  );

}

export default PersonalSection;
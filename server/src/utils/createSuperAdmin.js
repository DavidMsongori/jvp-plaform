const bcrypt = require("bcrypt");

const Member = require("../models/Member");

/* =====================================================
   CREATE DEFAULT SUPER ADMIN
===================================================== */

async function createSuperAdmin() {

  try {

    /* ==========================================
       CHECK IF SUPER ADMIN EXISTS
    ========================================== */

    const existingSuperAdmin = await Member.findOne({

      role: "super_admin",

    });

    if (existingSuperAdmin) {

      console.log(

        "✅ Super Admin already exists."

      );

      return;

    }

    /* ==========================================
       HASH PASSWORD
    ========================================== */

    const hashedPassword = await bcrypt.hash(

      process.env.SUPER_ADMIN_PASSWORD,

      12

    );

    /* ==========================================
       CREATE SUPER ADMIN
    ========================================== */

    const superAdmin = new Member({

      role:

        process.env.SUPER_ADMIN_ROLE ||

        "super_admin",

      firstName:

        process.env.SUPER_ADMIN_FIRST_NAME,

      middleName:

        process.env.SUPER_ADMIN_MIDDLE_NAME ||

        "",

      lastName:

        process.env.SUPER_ADMIN_LAST_NAME,

      phone:

        process.env.SUPER_ADMIN_PHONE,

      email:

        process.env.SUPER_ADMIN_EMAIL

          .toLowerCase()

          .trim(),

      password:

        hashedPassword,

      activationStatus:

        "Activated",

      membershipStatus:

        "Active",

      paymentStatus:

        "Exempt",

      accountVerified: true,

      legacyMember: false,

      migrationCompleted: true,

      memberSince: new Date(),

      location: {

        county:

          process.env.SUPER_ADMIN_COUNTY ||

          "",

        constituency:

          process.env.SUPER_ADMIN_CONSTITUENCY ||

          "",

        ward:

          process.env.SUPER_ADMIN_WARD ||

          "",

      },

    });

    await superAdmin.save();

    console.log("");

    console.log(

      "=========================================="

    );

    console.log(

      "🚀 SUPER ADMIN CREATED"

    );

    console.log(

      "=========================================="

    );

    console.log(

      "Name:",

      `${superAdmin.firstName} ${superAdmin.lastName}`

    );

    console.log(

      "Email:",

      superAdmin.email

    );

    console.log(

      "Role:",

      superAdmin.role

    );

    console.log(

      "=========================================="

    );

    console.log("");

  }

  catch (error) {

    console.error(

      "Failed to create Super Admin:",

      error.message

    );

  }

}

module.exports = createSuperAdmin;
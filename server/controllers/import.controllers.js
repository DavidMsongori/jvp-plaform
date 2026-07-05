const Member = require("../models/Member");

const importMembers = async (req, res) => {

  console.log("===== NEW IMPORT CONTROLLER IS RUNNING =====");

  try {

    const members = req.body;

    if (!Array.isArray(members)) {
      return res.status(400).json({
        success: false,
        message: "Expected an array of members."
      });
    }

    let imported = 0;
    let skipped = 0;

    for (const data of members) {

      const exists = await Member.findOne({
        $or: [
          { phone: data.phone },
          { email: data.email }
        ]
      });

      if (exists) {
        skipped++;
        continue;
      }

      await Member.create(data);

      imported++;
    }

    return res.json({
      success: true,
      imported,
      skipped,
      total: members.length
    });

  } catch (error) {

    console.error("========== IMPORT ERROR ==========");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  importMembers
};
const authService = require("../services/auth.services");

exports.register = async (req, res) => {
  try {
    const member = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "Member registered successfully.",
      member,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      ...result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
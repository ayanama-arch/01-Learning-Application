const validator = require("validator");

function validateName(name) {
  if (validator.isEmpty(name || "", { ignore_whitespace: true })) return false;
  if (!validator.isLength(name.trim(), { min: 2, max: 50 })) return false;
  if (!validator.matches(name, /^[\p{L}\s'-]+$/u)) return false;
  return true;
}

module.exports = validateName;

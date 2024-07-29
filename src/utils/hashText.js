const bcrypt = require("bcrypt");

const hashText = async (text) => {
  const salt = await bcrypt.genSalt(10);
  const hashedText = await bcrypt.hash(text, salt);

  return hashedText;
};

module.exports = hashText;

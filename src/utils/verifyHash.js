const bcrypt = require("bcrypt");

const verifyHash = async (data, encryptedData) => {
  const doesMatch = await bcrypt.compare(data, encryptedData);
  return doesMatch;
};

module.exports = verifyHash;

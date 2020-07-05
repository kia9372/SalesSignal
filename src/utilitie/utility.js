const bycrypt = require("bcrypt");

module.exports = new (class Utilitie {
  HashField(field) {
    return new Promise((resolve, reject) => {
      bycrypt.hash(field, bycrypt.genSaltSync(15), (error, hash) => {
        if (error) return reject(error);
        resolve(hash);
      });
    });
  }


  getDirectoryImage(dir) {
    return dir.substring(10);
}

})();

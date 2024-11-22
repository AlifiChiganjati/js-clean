import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 8, (err, hash) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("hashPassword", hash);
    return hash;
  });
};

const REGEXP = {
  // at least one uppercase letter, one lowercase letter, one number and one special character:
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};

export default REGEXP;

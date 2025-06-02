

export const authConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 2,
      message: "Name must be at least 2 charcters long.",
    },
  },
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: "Password must be at least 8 charcters long.",
    },
    format: {
      pattern:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]$/,
      message:
        "Password must have at least one lowercase, one uppercase, one special character, and one digit.",
    },
  },
};
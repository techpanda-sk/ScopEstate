const SUCCESS = {
  USER_CREATED: "User created successfully",
  SUPER_ADMIN_EXISTS: "Super Admin already exists",
  SUPER_ADMIN_CREATED: "Super Admin created successfully",
  LOGIN_SUCCESS: "Login successful",
  FETCH_SUCCESS: "Data fetched successfully",
  USER_DELETED: "User deleted successfully.",
  USER_UPDATED: "User updated successfully.",
  STICKEY_CREATE: "Sticky note created successfully",
};

const ERROR = {
  VALIDATION: "Validation error",
  DUPLICATE: "Duplicate entry",
  SERVER: "Internal server error",
  NOT_FOUND: "Resource not found",
  AUTH_FAILED: "Authentication failed",
  FORBIDDEN: "Access denied",
  INVALID_TOKEN: "Invalid or expired token.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  ALL_FIELDS_REQUIRED: "All fields are required.",
  USER_ALREADY_EXISTS: "User with this email already exists",
};

module.exports = {
  SUCCESS,
  ERROR,
};

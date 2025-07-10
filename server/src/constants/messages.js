const SUCCESS = {
    USER_CREATED: 'User created successfully',
    SUPER_ADMIN_EXISTS: 'Super Admin already exists',
    SUPER_ADMIN_CREATED: 'Super Admin created successfully',
    LOGIN_SUCCESS: 'Login successful',
    FETCH_SUCCESS: 'Data fetched successfully',
};

const ERROR = {
    VALIDATION: 'Validation error',
    DUPLICATE: 'Duplicate entry',
    SERVER: 'Internal server error',
    NOT_FOUND: 'Resource not found',
    AUTH_FAILED: 'Authentication failed',
    FORBIDDEN: 'Access denied',
};

module.exports = {
    SUCCESS,
    ERROR,
};

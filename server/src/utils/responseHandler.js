const successResponse = (
  res,
  message = "Success",
  data = {},
  status = 200,
  extra = {}
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    ...extra,
  });
};
const errorResponse = (res, error = "Error", status = 500) => {
  return res.status(status).json({
    success: false,
    error: error,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};

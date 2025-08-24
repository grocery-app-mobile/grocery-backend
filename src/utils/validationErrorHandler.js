export const handleValidationError = (res, error) => {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message
    });
  };
  
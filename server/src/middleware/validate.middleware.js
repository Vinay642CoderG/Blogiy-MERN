import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  if (!req.body) req.body = {};

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = {};

    error.details.forEach((err) => {
      const field = err.path.join(".") || err.context.key;

      let message = err.message.replace(/["]/g, "");
      message = message.charAt(0).toUpperCase() + message.slice(1);

      if (!errors[field]) errors[field] = [];
      errors[field].push(message);
    });

    return next(new ApiError(422, "Validation Error", errors));
  }

  next();
};

export default validate;

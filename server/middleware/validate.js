import Joi from "joi";

const validate = (schema, req, res, next) => {
  const options = {
    abortEarly: true,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);

  let message = "";

  if (error) {
    switch (error.details[0].path[0]) {
      case "first_name":
        message = "The name is incorrect.";
        break;
      case "last_name":
        message = "The last name is incorrect.";
        break;
      case "email":
        message = "The email is incorrect.";
        break;
      case "password":
        message = "The password is incorrect.";
        break;
      case "supplierId":
        message = "The supplierId is incorrect.";
        break;
      case "price":
        message = "The price is incorrect.";
        break;
      case "duration":
        message = "The duration is incorrect.";
        break;
      case "phone_number":
        message = "The phone number is incorrect.";
        break;
      case "order_date":
        message = "The order date is incorrect.";
        break;
      case "name":
        message = "The name is incorrect.";
        break;
      case "status":
        message = "The status is incorrect.";
        break;
      case "address":
        message = "The address is incorrect.";
        break;
      default:
        message = "Fields filled in incorrectly";
        break;
    }

    return res.status(500).send(message);
  }

  req.body = value;
  next();
};

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  });

  validate(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(12).required(),
  });

  validate(schema, req, res, next);
};

export const workersValidator = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
    supplierId: Joi.number().integer().required(),
  });

  validate(schema, req, res, next);
};

export const servicesValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    duration: Joi.string().min(2).required(),
    price: Joi.number().required(),
    supplierId: Joi.number().integer().required(),
  });

  validate(schema, req, res, next);
};

export const suppliersValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    address: Joi.string().min(2).required(),
    phone_number: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  validate(schema, req, res, next);
};

export const ordersValidator = (req, res, next) => {
  const schema = Joi.object({
    order_date: Joi.date().required(),
    status: Joi.number().integer(),
    serviceId: Joi.number().integer().required(),
  });

  validate(schema, req, res, next);
};

export const ratingsValidator = (req, res, next) => {
  const schema = Joi.object({
    rating: Joi.number().required(),
  });

  validate(schema, req, res, next);
};

export default validate;

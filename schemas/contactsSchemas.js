import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.number().required().min(12),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().min(12).required(),
})
  .min(1)
  .message("Body must have at least one field");

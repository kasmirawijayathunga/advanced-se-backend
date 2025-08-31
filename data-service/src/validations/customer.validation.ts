import Joi from "joi";

export const getCustomer = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export const addCustomer = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
};

export const updateCustomer = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        disabled: Joi.boolean(),
    }),
};

export const deleteCustomer = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer,
};

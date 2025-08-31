import Joi from "joi";

export const getUser = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export const addUser = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.number().optional(),
    }),
};

export const updateUser = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        role: Joi.number(),
        disabled: Joi.boolean(),
    }),
};

export const deleteUser = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getUser,
    addUser,
    updateUser,
    deleteUser,
};

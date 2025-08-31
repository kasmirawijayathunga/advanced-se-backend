import Joi from "joi";

export const getRoute = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export const addRoute = {
    body: Joi.object().keys({
        label: Joi.string().required(),
    }),
};

export const updateRoute = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        label: Joi.string(),
        disabled: Joi.boolean(),
    }),
};

export const deleteRoute = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getRoute,
    addRoute,
    updateRoute,
    deleteRoute,
};

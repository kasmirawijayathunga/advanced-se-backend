import Joi from "joi";

export const getShoptype = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export const addShoptype = {
    body: Joi.object().keys({
        label: Joi.string().required(),
    }),
};

export const updateShoptype = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        label: Joi.string(),
        disabled: Joi.boolean(),
    }),
};

export const deleteShoptype = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

export default {
    getShoptype,
    addShoptype,
    updateShoptype,
    deleteShoptype,
};

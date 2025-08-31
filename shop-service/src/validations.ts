import Joi from "joi";

const getShop = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
};

const addShop = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        address: Joi.string().required(),
        longitude: Joi.string().required(),
        latitude: Joi.string().required(),
        email: Joi.string().required(),

        phone1: Joi.string().required(),
        phone1_whatsapp: Joi.boolean(),
        phone1_call: Joi.boolean(),
        phone1_message: Joi.boolean(),
        phone2: Joi.string().allow(""),
        phone2_whatsapp: Joi.boolean(),
        phone2_call: Joi.boolean(),
        phone2_message: Joi.boolean(),
        phone3: Joi.string().allow(""),
        phone3_whatsapp: Joi.boolean(),
        phone3_call: Joi.boolean(),
        phone3_message: Joi.boolean(),

        customer_id: Joi.string().required(),
        route_id: Joi.string().required(),
        type_id: Joi.string().required()
    }),
};

const updateShop = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        address: Joi.string(),
        longitude: Joi.string(),
        latitude: Joi.string(),
        email: Joi.string(),

        phone1: Joi.string(),
        phone1_whatsapp: Joi.boolean(),
        phone1_call: Joi.boolean(),
        phone1_message: Joi.boolean(),
        phone2: Joi.string().allow(""),
        phone2_whatsapp: Joi.boolean(),
        phone2_call: Joi.boolean(),
        phone2_message: Joi.boolean(),
        phone3: Joi.string().allow(""),
        phone3_whatsapp: Joi.boolean(),
        phone3_call: Joi.boolean(),
        phone3_message: Joi.boolean(),
        removedImg: Joi.string(),

        customer_id: Joi.string(),
        route_id: Joi.string(),
        type_id: Joi.string()
    }),
};

const deleteShop = {
    params: Joi.object().keys({
        id: Joi.string().required()
    }),
};

export default {
    deleteShop,
    getShop,
    updateShop,
    addShop
}
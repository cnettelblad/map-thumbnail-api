import Joi from 'joi';

export const createThumbnailSchema = {
    payload: Joi.object({
        longitude: Joi.number().min(-180).max(180).required(),
        latitude: Joi.number().min(-90).max(90).required(),
    })
};

export const getThumbnailSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

export const deleteThumbnailSchema = {
    params: Joi.object({
        id: Joi.string().required(),
    })
};

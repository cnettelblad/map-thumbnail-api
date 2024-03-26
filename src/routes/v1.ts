import * as ThumbnailController from '../controllers/v1/thumbnail';
import { createThumbnailSchema, getThumbnailSchema } from '../schemas/v1/thumbnail';

export default [
    {
        method: 'GET',
        path: '/v1/thumbnail/{id}',
        handler: ThumbnailController.show,
        options: {
            validate: getThumbnailSchema
        }
    },
    {
        method: 'POST',
        path: '/v1/thumbnail',
        handler: ThumbnailController.store,
        options: {
            validate: createThumbnailSchema
        }
    },
];
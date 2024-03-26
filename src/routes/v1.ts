import * as ThumbnailController from '../controllers/v1/thumbnail';
import { createThumbnailSchema } from '../schemas/v1/thumbnail';

export default [
    {
        method: 'POST',
        path: '/v1/thumbnail',
        handler: ThumbnailController.store,
        options: {
            validate: createThumbnailSchema
        }
    },
];
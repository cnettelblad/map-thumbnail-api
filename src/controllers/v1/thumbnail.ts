import {
    Request,
    ResponseToolkit,
    ResponseObject
} from '@hapi/hapi';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { generateMapImageUrl } from '../../services/google/maps';

/**
 * Convert incoming request to a thumbnail.
 * 
 * Longitude and Latitude are sent to Google Maps Static API
 * and the resulting image is saved on the server.
 * 
 * @todo Use Object Storage (S3 or GCS) to store the image.
 * @todo Make image model and save the image path to the database.
 */
export const store = async (
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> => {
    /**
     * @todo Payload should be resolved as an object with
     *       `longitude` and `latitude` properties (type).
     */
    const payload = request.payload as { longitude: number, latitude: number };
    const { longitude, latitude } = payload;
    const imageUrl = generateMapImageUrl(latitude, longitude);

    // Download image
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    const uploadPath = `${__dirname}/../../../uploads`;

    if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = randomUUID();

    writeFileSync(
        `${uploadPath}/${fileName}.png`,
        Buffer.from(buffer)
    );

    return h.response({
        message: 'Thumbnail created',
        path: `/v1/thumbnail/${fileName}`
    }).code(200);
};

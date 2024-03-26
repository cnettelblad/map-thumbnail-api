import { URLSearchParams } from 'url';

const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';

export const generateMapImageUrl = (
    latitude: number,
    longitude: number,
    size: string = '600x300'
): string => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) throw new Error('GOOGLE_MAPS_API_KEY is required');

    const params = new URLSearchParams({
        markers: `${latitude},${longitude}`,
        zoom: '5',
        size,
        key: apiKey
    });

    return `${baseUrl}?${params.toString()}`;
};
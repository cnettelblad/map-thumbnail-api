import { Server, ServerApplicationState } from "@hapi/hapi";
import { init } from "../src/server";
import * as maps from "../src/services/google/maps";

/**
 * Disable writeFileSync for testing
 */
jest.mock('node:fs', () => {
    return {
        ...jest.requireActual('node:fs'),
        writeFileSync: jest.fn(),
    };
});

describe("/POST Thumbnail Creation", () => {
    let server: Server<ServerApplicationState>;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it("should return a 400 error", async () => {
        const response = await server.inject({
            method: "POST",
            url: "/v1/thumbnail",
            payload: {
                latitude: 37.7749
            }
        });

        expect(response.statusCode).toBe(400);
        expect(response.result).toMatchObject({
            statusCode: 400,
            error: "Bad Request",
            message: "Invalid request payload input"
        });
    });

    it("should return a thumbnail url", async () => {

        // Mock the "Generate Image URL" function
        jest.spyOn(maps, "generateMapImageUrl")
            .mockReturnValue("https://placehold.co/600x400/EEE/31343C")

        const response = await server.inject({
            method: "POST",
            url: "/v1/thumbnail",
            payload: {
                latitude: 37.7749,
                longitude: 122.4194
            }
        });

        expect(response.statusCode).toBe(200);
        expect(response.result).toMatchObject({
            message: "Thumbnail created",
            path: expect.stringMatching(/\/v1\/thumbnail\/[a-z0-9-]+/)
        })
    });
});
import Hapi, { ReqRefDefaults } from '@hapi/hapi';
import v1 from './routes/v1';
import logging from './plugins/logging';
import Path from 'node:path';
import inert from '@hapi/inert';

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    debug: false,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'upload')
        }
    }
});

/**
 * Register the V1 Routes
 */
server.route(v1);

export const init = async () => {
    await server.register(inert);
    await server.initialize();
    return server;
};

export const start = async () => {
    await server.register(logging);
    await server.register(inert);
    await server.start();

    console.log(`Server running at: ${server.info.uri}`);

    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
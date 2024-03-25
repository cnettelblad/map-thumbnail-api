import Hapi from '@hapi/hapi';

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost'
    });

    server.start().then(() => {
        console.log('Server running on %s', server.info.uri);
    });
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
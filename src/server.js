const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const connection = require('./dbconfig');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan di ${server.info.uri}`);
    isConnect();
};

const isConnect = async () => {
    try {
        await connection.authenticate();
        console.log("Database Connected");
    } catch (error) {
        console.log("Not Connected Database");
    }
}

init();
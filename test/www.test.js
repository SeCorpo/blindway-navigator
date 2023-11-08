const assert = require('chai').assert;
const http = require('http');
const app = require('../bin/www');

describe('Server', () => {
    let server;

    beforeEach(() => {
        server = http.createServer(app);
    });

    afterEach(() => {
        server.close();
    });


    it('should start the server without errors', (done) => {
        server.listen(0, () => {
            const address = server.address();
            assert.isNotNull(address);
            assert.isAbove(address.port, 0);
            done();
        });
    });

    it('should handle server errors', (done) => {
        const port = 3001;
        server.on('error', (error) => {
            assert.instanceOf(error, Error);
            done();
        });

        server.close(() => {
            server = http.createServer(app);
            server.listen(port);
        });
    });

    it('should listen and be able to close', (done) => {
        server.listen(0, () => {
            server.close(() => {
                done();
            });
        });
    });
});

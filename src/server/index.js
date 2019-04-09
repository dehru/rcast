'use strict';

const server = require('./server');

const { PORT } = require('./config');
// const { logger } = require('./utils/logger');

server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Application available at: http://localhost:${PORT}`);
});

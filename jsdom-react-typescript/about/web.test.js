/**
 * @jest-environment node
 */

import http from 'http';
import { openPage, eventually } from './support/index.js';

import { app } from '../.instrumented/server/app.js';
import fs from 'fs';

describe('home page', () => {
    let port = 5001;
    let server;
    let page;

    beforeEach(async () => {
        await new Promise((resolve) => {
            server = http.createServer(app).listen(port, () => {
                resolve(null);
            });
        });
        page = await openPage(`http://localhost:${port}`);
    });
    afterEach(() => {
        fs.writeFileSync(
            `.nyc_output/coverage-client-${Date.now()}.json`,
            JSON.stringify(page.defaultView.__coverage__)
        );
        fs.writeFileSync(
            `.nyc_output/coverage-server-${Date.now()}.json`,
            JSON.stringify(global.__coverage__)
        );
        server.close();
    });

    test('displays expected message', async () => {
        await eventually(() => {
            expect(page.body.textContent).toMatch(/hello world/);
        });
    });
});

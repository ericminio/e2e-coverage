import http from 'http';
import fs from 'fs';
import { ClientFunction, Selector } from 'testcafe';

import { app } from '../.instrumented/server/app.js';

let port = 5001;
let server;

fixture('Home page greetings')
    .page('about:blank')
    .beforeEach(async (t) => {
        await new Promise((resolve) => {
            server = http.createServer(app).listen(port, () => {
                resolve(null);
            });
        });
        await t.navigateTo(`http://localhost:${port}`);
    })
    .afterEach(async () => {
        fs.writeFileSync(
            `.nyc_output/coverage-client-${Date.now()}.json`,
            JSON.stringify(await ClientFunction(() => window.__coverage__)())
        );
        fs.writeFileSync(
            `.nyc_output/coverage-server-${Date.now()}.json`,
            JSON.stringify(global.__coverage__)
        );
        server.close();
    });

test('displays expected message', async (t) => {
    await t.expect(Selector('body').textContent).match(/hello world/);
});

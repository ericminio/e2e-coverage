import express from 'express';
import fs from 'fs';

export const app = express();

app.get('/', function (_, response) {
    response.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync('app/client/index.html').toString();

    response.write(html);
    response.end();
});

app.get('/webapp.js', function (_, response) {
    response.setHeader('Content-Type', 'text/javascript');
    const code = fs.readFileSync('.build/webapp.js').toString();

    response.write(code);
    response.end();
});
app.get('/react.js', function (_, response) {
    response.setHeader('Content-Type', 'text/javascript');
    const code = fs.readFileSync('app/client/react.js').toString();

    response.write(code);
    response.end();
});

app.get('/data', function (_, response) {
    response.setHeader('Content-Type', 'application/json');
    const data = JSON.stringify({ message: 'hello world' });

    response.write(data);
    response.end();
});

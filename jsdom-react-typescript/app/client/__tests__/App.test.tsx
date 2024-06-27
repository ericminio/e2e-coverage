import React from 'react';
import fs from 'fs';

import { render } from '@testing-library/react';

import { App } from '../../../.instrumented/client/App';

describe('App', () => {
    beforeEach(() => {
        global.fetch = jest.fn(async () => ({
            json: () => Promise.resolve({ message: 'hi' }),
        })) as jest.Mock;
    });
    afterEach(() => {
        fs.writeFileSync(
            `.nyc_output/coverage-App-${Date.now()}.json`,
            JSON.stringify(global.__coverage__)
        );
    });

    it('presents fetched data', async () => {
        const { findByText } = render(<App />);

        expect(await findByText('Received: hi')).toBeDefined();
    });
});

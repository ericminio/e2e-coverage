import React from 'react';
import fs from 'fs';

import { render } from '@testing-library/react';

import { App } from '../App';

describe('App', () => {
    beforeEach(() => {
        global.fetch = jest.fn(async () => ({
            json: () => Promise.reject(),
        })) as jest.Mock;
    });
    afterEach(() => {
        fs.writeFileSync(
            `.nyc_output/coverage-App-${Date.now()}.json`,
            JSON.stringify(global.__coverage__)
        );
    });

    it('discloses errors if any', async () => {
        const { findByText } = render(<App />);

        expect(await findByText(/oops/)).toBeDefined();
    });
});

import React from 'react';

import { render } from '@testing-library/react';

import { App } from '../App';

describe('App', () => {
    beforeEach(() => {
        global.fetch = jest.fn(async () => ({
            json: () => Promise.reject(),
        })) as jest.Mock;
    });

    it('discloses errors if any', async () => {
        const { findByText } = render(<App />);

        expect(await findByText(/oops/)).toBeDefined();
    });
});

module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'],
    collectCoverage: true,
    collectCoverageFrom: ['app/**/*.tsx'],
    coverageDirectory: '.nyc_output',
    coverageReporters: ['json'],
};

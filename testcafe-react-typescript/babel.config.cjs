module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
    ],
    plugins: [
        [
            'babel-plugin-module-resolver',
            {
                resolvePath(sourcePath, currentFile, opts) {
                    if (
                        process.argv[1].endsWith('jest') &&
                        sourcePath === '../App'
                    ) {
                        return '../../../.instrumented/client/App';
                    }
                    return undefined;
                },
            },
        ],
    ],
};

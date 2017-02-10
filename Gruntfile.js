module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            ts: {
                files: ['**/**.ts', '!node_modules/**/**'],
                tasks: ['ts:default']
            }
        },

        ts: {
            default: {
                options: {
                    experimentalDecorators: true,
                    target: 'es6',
                    module: 'commonjs',
                    moduleResolution: "node",
                    sourceMap: true,
                    emitDecoratorMetadata: true,
                    removeComments: false,
                    noImplicitAny: false
                },
                src: ['**/**.ts', '!node_modules/**/**'],
            }
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask('default', ['ts:default']);

};

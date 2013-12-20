module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),

        'banner': {
            'full': [
                '/*!',
                ' * Balloons.js v<%= pkg.version %>',
                ' * http://balloonsjs.com/',
                ' *',
                ' * Copyright (c) <%= grunt.template.today("yyyy") %>, MercadoLibre.com',
                ' * Released under the MIT license.',
                ' * http://balloonsjs.com/',
                ' */\n'
            ].join('\n'),
            'min': '/*! Balloons.js v<%= pkg.version %> http://balloonsjs.com/ | Released under the MIT license. */'
        },

        'concat': {
            'options': {
                'stripBanners': {
                    'options': {
                        'block': true,
                        'line': true
                    }
                }
            },

            'js': {
                'options': {
                    'banner': '<%= banner.full %>'
                },
                'src': ['./src/Q.js', './src/emitter.js', './src/define.js'],
                'dest': './dist/Q.js'
            }
        },

        'uglify': {
            'options': {
                'mangle': false,
                'banner': '<%= banner.min %>'
            },

            'js': {
                'src': ['<%= concat.js.dest %>'],
                'dest': './dist/Q.min.js'
            }

        },

        'jslint': { // configure the task
            'files': ['<%= concat.js.dest %>'],
            'directives': {
                'nomen': true,
                'todo': true
            },
            'options': {
                'errorsOnly': true, // only display errors
                'failOnError': false, // defaults to true
                'shebang': true, // ignore shebang lines
            }
        },

        'jsdoc': {
            'dist': {
                'src': ['<%= concat.js.dest %>'],
                'options': {
                    'template': './libs/doc-template',
                    'destination': './doc/',
                    'private': false
                }
            }
        },

        'jasmine': {
            'src': ['dist/Q.js'],
            'options': {
                'specs': ['tests/**/spec.js'],
                'version': '1.3.1'
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Resgister task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('test', ['concat', 'jasmine']);
    grunt.registerTask('lint', ['concat', 'jslint']);
    grunt.registerTask('doc', ['concat', 'jsdoc']);
    grunt.registerTask('dev', ['concat']);
    grunt.registerTask('dist', ['concat', 'uglify']);
};
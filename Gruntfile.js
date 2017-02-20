module.exports = function(grunt) {
 
  // Checks the dependencies associated with Grunt and autoloads
  // & requires ALL of them in this Gruntfile
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
 
  // Project configuration.
  grunt.initConfig({





    // Sass configuration
    sass: {
      options: {
        sourceMap: false,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
          'css/main.css': 'css/scss/main.scss'
        }
      }
    },





    //Use PostCSS Autoprefixer to apply browser prefixes for certain styles
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer-core')({
              browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },





    // SVG Sprites
    svg_sprite: {
      icons: {
        expand: true,
        cwd: 'img',
        src: ['**/*.svg'],
        dest: 'img/',
        options: {
          mode: {
            symbol: true
          }
        }
      }
    },





    // Compress images
    imagemin: {                          // Task
      options: {                       // Target options
        optimizationLevel: 3
      },
      dist: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'img',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'img'                  // Destination path prefix
        }]
      }
    },





    // JS
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.min.js', 
          'bower_components/typed.js/dist/typed.min.js', 
          'node_modules/smooth-scroll/dist/js/smooth-scroll.min.js', 
          'bower_components/moment/min/moment.min.js', 
          'node_modules/js-cookie/src/js.cookie.js', 
          'node_modules/lity/dist/lity.min.js', 
          'js/main.js'
        ],
        dest: 'js/build.js',
      },
    },
 




    //Watches files and folders for us
    watch: {
      files: [
        '*.html',
        'js/**/*.js',
        'css/**/*.scss',
        'img/*.{png,jpg,gif}'
      ],
      tasks: [
        'sass',
        'postcss',
        'concat'
      ]
    },





    // run tasks in parallel
    concurrent: {
      serve: [
        'sass',
        'postcss',
        'concat',
        'svg_sprite',
        'watch',
        'shell:jekyllServe'
      ],
      serveDrafts: [
        'sass',
        'watch',
        'shell:jekyllDrafts'
      ],
      options: {
        logConcurrentOutput: true
      }
    },





    // Server
    // connect: {
    //   server: {
    //     options: {
    //       livereload: true,
    //       base: '',
    //       port: 4001
    //     }
    //   }
    // }
    // shell commands for use in Grunt tasks
    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      },
      jekyllServe: {
        command: 'jekyll serve'
      },
      jekyllDrafts: {
        command: 'jekyll serve --drafts'
      }
    }
 
  });
 
  //grunt serve
  // grunt.registerTask('default', ['connect:server','watch']);
  // Register the grunt serve task
  grunt.registerTask('serve', [
    'concurrent:serve'
  ]);

  // Register build as the default task fallback
  grunt.registerTask('default', 'serve');

  // Serve with drafts too
  grunt.registerTask('drafts', ['concurrent:serveDrafts']);

};

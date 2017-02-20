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
    imagemin: {
      options: {
        optimizationLevel: 3
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'img',
          src: ['*.{png,jpg,gif}'],
          dest: 'img'
        }]
      }
    },





    // JS Concat
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

    // JS Minify
    uglify: {
      my_target: {
        files: {
          'js/build.js': ['js/build.js']
        }
      }
    },
 




    //Watches files and folders for us
    watch: {
      css: {
        files: [
          'css/**/*.scss'
        ],
        tasks: [
          'sass',
          'postcss'
        ]
      },
      scripts: {
        files: [
          'js/**/*.js'
        ],
        tasks: [
          'concat', 'uglify'
        ]
      },
      html: {
        files: [
          '**/*.{html,markdown,md}','!_site'
        ],
        tasks: [
          'shell:jekyllBuild'
        ]
      },
      images: {
        files: [
          'img/*.{png,jpg,gif}'
        ],
        tasks: [
          'imagemin'
        ]
      },
      svg: {
        files: [
          'img/src/*.{svg}'
        ],
        tasks: [
          'svg_sprite'
        ]
      }
    },





    // run tasks in parallel
    concurrent: {
      serve: [
        'sass',
        'postcss',
        'concat',
        'uglify',
        'imagemin',
        'svg_sprite',
        'shell:jekyllServe',
        'watch',
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
 
  // Register the grunt serve task
  grunt.registerTask('serve', [
    'concurrent:serve'
  ]);

  // Register build as the default task fallback
  grunt.registerTask('default', 'serve');

  // Serve with drafts too
  grunt.registerTask('drafts', ['concurrent:serveDrafts']);

};

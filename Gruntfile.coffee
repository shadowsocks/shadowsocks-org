module.exports = (grunt) ->
  grunt.initConfig
    less:
      docs:
        files:
          'assets/css/app.css': 'src/less/app.less'
    cssmin:
      docs:
        files:
          'assets/css/app.css': 'assets/css/app.css'
    uglify:
      docs:
        files:
          'assets/js/app.js': [
            'src/js/jquery.js'
            'src/js/jquery.easing.js'
            'src/js/ddsmoothmenu.js'
            'src/js/jquery.flexslider.js'
            'src/js/colortip.js'
            'src/js/selectnav.js'
            'src/js/custom.js'
          ]
    connect:
      server:
        options:
          hostname: '0.0.0.0'
          base: '.'
          port: 8000
          keepalive: true

    static:
      options:
        template: 'src/jade'
      docs:
        files:
          '.': 'src/content'

    watch:
      less:
        files: 'src/less/**/*.less'
        tasks: ['less:docs', 'cssmin:docs']
      js:
        files: 'src/js/*.js'
        tasks: ['uglify:docs']
      jade:
        files: ['src/content/**/*.md', 'src/jade/**/*.jade']
        tasks: ['static:docs']

  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadTasks 'tasks'

  grunt.registerTask 'build', [
    'less:docs'
    'cssmin:docs'
    'uglify:docs'
    'static:docs'
  ]
  grunt.registerTask 'server', 'connect:server'

  grunt.registerTask 'default', ['build', 'server', 'watch']

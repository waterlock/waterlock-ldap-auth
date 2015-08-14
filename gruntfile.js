module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        node: true,
        expr: true,
        globals: {
          waterlock: true
        }
      },
      all: [
        'gruntfile.js',
        'index.js',
        'lib/**/*.js',
        'test/**/*.js'
      ]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('travis', ['jshint']);
};

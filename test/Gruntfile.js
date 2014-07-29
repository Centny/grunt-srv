module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('../tasks');
  // grunt.loadNpmTasks('grunt-selenium-launcher');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    shell: {
      sleep: {
        command: 'sleep 3'
      }
    },
    srv: {
      test1: {
        command: 'sleep',
        args: ["100"]
      },
      test2: {
        command: 'sleep',
        args: ["100"]
      },
      test3: {
        command: 'sleep'
      },
      test4: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'sleep'
      },
      wdm: {
        options: {
          ctrlc: true
        },
        command: 'webdriver-manager',
        args: ["start"]
      }
    }
  });
  //server daemon
  grunt.registerTask('serve', ['srv-stop','srv:wdm', 'srv:test1', 'srv:test2', 'srv:test3', 'srv:test4', 'shell:sleep', 'srv-stop']);
};
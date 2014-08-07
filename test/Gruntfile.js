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
        cmd: 'sleep 100'
      },
      test2: {
        cmd: 'sleep 100'
      },
      test3: {
        cmd: 'sleep'
      },
      test4: {
        options: {
          stdout: true,
          stderr: true
        },
        cmd: 'sleep'
      },
      test5: {
        options: {
          stdout: true,
          stderr: true,
          cwd: "../"
        },
        cmd: 'ls'
      },
      test6: {
        options: {
          stdout: true,
          stderr: true,
          cwd: "../",
          env: {
            "ABC": "123456"
          }
        },
        cmd: 'test/c.sh'
      },
      test7: {
        options: {
          stdout: true,
          stderr: true,
          cwd: "../"
        },
        cmd: 'env PWD',
      },
      wdm: {
        options: {
          ctrlc: true,
          stdout: true,
          wait: 1000
        },
        cmd: 'webdriver-manager start'
      }
    }
  });
  // nonexistentFunc();
  //server daemon
  grunt.registerTask('default', ['srv-stop', 'srv:wdm',
    'srv:test1', 'srv:test2', 'srv:test3',
    'srv:test4', 'srv:test5', 'srv:test6',
    'srv:test7', 'shell:sleep', 'srv-stop'
  ]);
  grunt.registerTask('abc', ['srv:wdm', 'srv-stop']);
  grunt.registerTask('test5', ['srv:test5']);
  console.log(this.process);
};
'use strict';
module.exports = function(grunt) {
	grunt.registerMultiTask('srv', 'Start a server...', function() {
		var options = this.options({
			stdout: false,
			stderr: false,
			ctrlc: false,
			kill: "SIGINT"
		});
		var cmd = this.data.command;
		if (cmd === undefined) {
			throw new Error('`command` required');
		}
		var args = this.data.args;
		if (args === undefined) {
			args = [];
		}
		if (!grunt._srv_) {
			grunt._srv_ = new Array();
			grunt._srv_l = 0;
		}
		var spawn = require('child_process').spawn;
		var exec = spawn(cmd, args);
		if (options.stdout) {
			exec.stdout.pipe(process.stdout);
		}
		if (options.stderr) {
			exec.stderr.pipe(process.stderr);
		}
		exec.options = options;
		exec.nameArgs = this.nameArgs;
		exec.on("close", function() {
			this.closed_ = true;
			grunt._srv_l--;
			console.log("The " + this.nameArgs + " server closed(" + this.pid + ")...");
			if (grunt._srv_l < 1) {
				grunt.event.emit("_SRV_DONE_");
			}
		});
		grunt._srv_[grunt._srv_.length] = exec;
		grunt._srv_l++;
		console.log("Starting " + this.nameArgs + " server(" + exec.pid + ")...");
	});
	grunt.registerTask('srv-stop', 'Stop all server.', function() {
		var done = this.async();
		console.log("Closing " + (grunt._srv_l ? grunt._srv_l : 0) + " server...");
		if (!grunt._srv_ || !grunt._srv_.length || !grunt._srv_l) {
			done();
			return
		}
		grunt.event.on("_SRV_DONE_", function() {
			done();
		});
		var slen = grunt._srv_.length;
		for (var i in grunt._srv_) {
			var exec = grunt._srv_[i];
			if (exec.closed_) {
				continue;
			}
			if (exec.options.ctrlc) {
				exec.stdin.write('\x03');
			} else {
				exec.kill(exec.options.kill);
			}
		}
	});
};
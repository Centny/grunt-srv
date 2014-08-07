'use strict';
module.exports = function(grunt) {
	function env_(t) {
		// console.log(t);
		var env = {};
		for (var i in process.env) {
			env[i] = process.env[i];
		}
		if (t) {
			for (var i in t) {
				env[i] = t[i];
			}
		}
		return env;
	}

	grunt.SrvWebKill = function(options) {
		var http = require("http");
		http.get(options, function(res) {
			var resdata = "";
			res.setEncoding('utf8');
			res.on('data', function(chunk) {
				resdata += chunk;
			});
			res.on('end', function() {
				console.log("SrvWebKill result: " + resdata);
			});
		}).on('error', function(e) {
			console.log("SrvWebKill error: " + e.message);
		});
	};
	grunt.registerMultiTask('srv', 'Start a server...', function() {
		var options = this.options({
			stdout: false,
			stderr: true,
			ctrlc: false,
			stopf: undefined,
			kill: "SIGINT",
			wait: 1000
		});

		var cmd = this.data.cmd;;
		switch (process.platform) {
			case "win32":
				if (this.data.wcmd) {
					cmd = this.data.wcmd;
				}
			default:
				if (this.data.ucmd) {
					cmd = this.data.ucmd;
				}
		}

		if (cmd === undefined) {
			throw new Error('`cmd` required');
		}
		if (options.wait < 200) {
			throw new Error('`wait` can not less 200');
		}
		var done = this.async();
		var args = this.data.args;
		if (args === undefined) {
			args = [];
		}
		if (!grunt._srv_) {
			grunt._srv_ = new Array();
			grunt._srv_l = 0;
		}
		var env = env_(options.env);
		// console.log(env);
		// var spawn = .spawn;
		var exec = require('child_process').exec(cmd, {
			cwd: options.cwd,
			env: env
		});
		exec.options = options;
		exec.nameArgs = this.nameArgs;
		exec.on("close", function(code, sig) {
			// if (code) {
			// 	grunt.fail.fatal("start " + this.nameArgs + " error", code);
			// 	return;
			// }
			this.closed_ = true;
			grunt._srv_l--;
			console.log("The " + this.nameArgs + " server closed(" + this.pid + ")...");
			if (grunt._srv_l < 1) {
				grunt.event.emit("_SRV_DONE_");
			}
		});
		grunt._srv_[grunt._srv_.length] = exec;
		grunt._srv_l++;
		if (options.stdout) {
			exec.stdout.pipe(process.stdout);
		}
		if (options.stderr) {
			exec.stderr.pipe(process.stderr);
		}
		setTimeout(done, options.wait);
		console.log("Starting " + this.nameArgs + " server(" + exec.pid + ")...");
	});
	grunt.registerTask('srv-stop', 'Stop all server.', function() {
		var done = this.async();
		console.log("Closing " + (grunt._srv_l ? grunt._srv_l : 0) + " server...");
		if (!grunt._srv_ || !grunt._srv_.length || !grunt._srv_l) {
			done();
			return;
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
			} else if (exec.options.stopf) {
				exec.options.stopf(exec);
			} else {
				exec.kill(exec.options.kill);
			}
		}
	});
	grunt.registerTask('srv-stop-n', 'Stop all server.', function() {
		console.log("Closing " + (grunt._srv_l ? grunt._srv_l : 0) + " server...");
		if (!grunt._srv_ || !grunt._srv_.length || !grunt._srv_l) {
			return;
		}
		var slen = grunt._srv_.length;
		for (var i in grunt._srv_) {
			var exec = grunt._srv_[i];
			if (exec.closed_) {
				continue;
			}
			if (exec.options.ctrlc) {
				exec.stdin.write('\x03');
			} else if (exec.options.stopf) {
				exec.options.stopf(exec);
			} else {
				exec.kill(exec.options.kill);
			}
		}
	});
};
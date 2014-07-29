# grunt-srv

> Run service commands



## Getting Started

install this plugin with this command:

```bash
$ npm install --save-dev grunt-srv
```

```bash
$ npm install git://github.com/Centny/grunt-srv.git
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-srv');
```


## Documentation


### Example config

```js
grunt.initConfig({
	srv: {								// Task
		wdm: {						// Target
			options: {						// Options
				stderr: true,
				stdout: true
			},
			command: 'webdriver-manager',
			args: ["start"]
		}
	}
});

grunt.loadNpmTasks('grunt-srv');
grunt.registerTask('default', ['srv:wdm']);
```

### Config


#### cmd

**Required**  
Type: `String`

The command you want to run or a function which returns it. not include command arguments.
#### args
**Optioned**  
Type: `String Array`

The command command arguments.

### Options


#### stdout

Default: `false`
Type: `Boolean`

Show stdout in the Terminal.


#### stderr

Default: `false`
Type: `Boolean`

Show stderr in the Terminal.

#### env
Default: `null`
Type: `Object`

#### cwd
Default: `.`
Type: `String`

#### ctrlc
Default: `false`
Type: `Boolean`

Send ctrl+c to stop the service.

#### kill
Default: `SIGINT`
Type: `String`

Send specifed signal to stop the service.


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

```
grunt.initConfig({
    srv: {
      wdm: {
        options: {
          ctrlc: true,//kill service by ctrl+c,default is kill.
          wait: 1000
        },
        cmd: 'webdriver-manager start'
      },
      jcr: {
        options: {
          stdout: true,
          wait: 1000,
          stopf: function(exec) {
             //kill service by web
            grunt.SrvWebKill("http://localhost:5457/jcr/exit");
          }
        },
        cmd: 'jcr start -o /tmp/e2e'
      }
    }
});
//srv-stop is inner registered task,adding for stop the services.
grunt.registerTask('default', ['srv:wdm', 'srv:jcr', 'srv-stop']);
```

### Config


#### cmd

**Required**  
Type: `String`

The command you want to run or a function which returns it. not include command arguments.

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

#### wait
Default: `500`
Type: `Long`

Set wait time for service start.

#### stopf
Default: `undefined`
Type: `Function(exec)` `exec:the subprocess`

The custom function to stop service,instead of ctrl+c or kill.
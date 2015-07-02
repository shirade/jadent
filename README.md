# jadent
A command line tool to compilie jade templates for use in running on browsers.

Inspired by [https://github.com/jgallen23/clientjade](https://github.com/jgallen23/clientjade).

## Getting started
```bash
$ npm install jadent

# or

$ git clone git@github.com:shirade/jadent
$ cd jadent
$ npm install
$ ./bin/jadent ...
```

## How to use
### Basic usage

```bash
$ jadent --help

  Usage: jadent [options] source target

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -w, --watch                  watch folder for file changes
    -n, --namespace <namespace>  add namespace and wrap by nameless immediately-invoked function
    -u, --uglify                 uglify client side template



  Examples:


    jadent views/client public/javascripts
      -> compile jade templates in views/client into public/javascripts/jadent.js


    jadent views/client/index.jade public/javascripts
      -> compile views/client/index.jade into public/javascripts/jadent.js


    jadent views/client public/javascripts/index.js
      -> compile jade templates in views/client into public/javascripts/index.js


    jadent views/client/index.jade public/javascripts/index.js
      -> compile views/client/index.jade into public/javascripts/index.js
```

```jacascript
var jadent = {};
jadent["index"] = function(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;;
  var locals_for_with = (locals || {});
  (function(name, title) {
    buf.push("<!DOCTYPE html><html lang=\"en\"><head><title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</title></head><body><h1>jadent sample jade template</h1><p>Hello, " + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + " !</p></body></html>");
  }.call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined, "title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined));;
  return buf.join("");
}
```

#### -w, --watch
Watch folder for file changes in source folder/file to recreate templates

##### Example
Two jade templates are in ./views/, and they will be compiled whenever they were modified.

```bash
$ jadent --watch ./views/client ./public/javascripts

Starting Watching folder ./views/client

File added: views/client/index.jade
Created public/javascripts/jadent.js

File added: views/client/signin.jade
Created public/javascripts/jadent.js

# views/client/index.jade was modified.
File changed: views/client/index.jade
Created public/javascripts/jadent.js

# views/client/signin.jade was removed.
File removed: views/client/signin.jade
Created public/javascripts/jadent.js
```

#### -n, --namespace <namespace>
Add namespace and wrap by nameless immediately-invoked function

##### Example
```bash
$ jadent --namespace namespace ./views/client ./public/javascripts
```

Two jade templates are in ./views/client.

```jade
// ./views/client/index.jade
doctype html
html(lang="en")
  head
    title= title
  body
    h1 jadent sample jade template
    p Hello, #{name} !
```

```jade
// ./views/client/sigin.jade
doctype html
html(lang="en")
  head
    title= title
  body
    h1 jadent sample jade template
    input(type='text' name='username')
    input(type='password' name='password')
```

They are compiled with option `-n namespace` into ./public/javascripts/jadent.js.

```javascript
// ./public/javascripts/jadent.js
var namespace = namespace || {};
namespace.jadent = {};
(function(jadent) {
  jadent["index"] = function(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function(name, title) {
      buf.push("<!DOCTYPE html><html lang=\"en\"><head><title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</title></head><body><h1>jadent sample jade template</h1><p>Hello, " + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + " !</p></body></html>");
    }.call(this, "name" in locals_for_with ? locals_for_with.name : typeof name !== "undefined" ? name : undefined, "title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined));;
    return buf.join("");
  }
  jadent["signin"] = function(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function(title) {
      buf.push("<!DOCTYPE html><html lang=\"en\"><head><title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</title></head><body><h1>jadent sample jade template</h1><input type=\"text\" name=\"username\"><input type=\"password\" name=\"password\"></body></html>");
    }.call(this, "title" in locals_for_with ? locals_for_with.title : typeof title !== "undefined" ? title : undefined));;
    return buf.join("");
  }
})(namespace.jadent);
```

#### -u, --uglify
Uglify client side template javascript file

##### Example
```bash
$ jadent --uglify ./views/client ./public/javascripts
```

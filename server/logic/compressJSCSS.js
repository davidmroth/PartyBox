'use strict';

var fs = require('fs');
var path = require('path')
var compressJSCSS = require('node-minify');
var compress_settings = require('server/config/peformance_tuning');

var error = null;
var isProduction = false;

function clone(obj) {
  if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
    return obj;

  var temp = obj.constructor(); // changed

  for(var key in obj) {
    if(Object.prototype.hasOwnProperty.call(obj, key)) {
      obj['isActiveClone'] = null;
      temp[key] = clone(obj[key]);
      delete obj['isActiveClone'];
    }
  }

  return temp;
}

function getFiles(scan_settings, path, results) {
  var result = clone(scan_settings);
  var files_or_directories = scan_settings.compress_files_or_directories;
  result.files = [];

  var walk = function(files_or_directories) {
    var objectType = Object.prototype.toString.call(files_or_directories);

    if (objectType !== '[object Array]')
      files_or_directories = [files_or_directories];

    files_or_directories.some(function(dir) {
      var fileStat = fs.statSync(dir);

      if (!fileStat.isDirectory()) {
        dir = (isProduction) ? dir : dir.replace(path, '');
        result.files.push(dir);
        var list = [];

      } else {
        var list = fs.readdirSync(dir)
      }

      var i = 0;

      (function next() {
        var file = list[i++];

        if (!file)
          return;

        file = dir + '/' + file;

        var stat = fs.statSync(file)

        if (stat && stat.isDirectory()) {
            walk(file);
            next();

        } else {
          file = (isProduction) ? file : file.replace(path, '');
          result.files.push(file);
          next();
        }
      })();
    });
  }

  walk(files_or_directories);
  results.push(result);

  return results;
}

function parseSettings(settings, isProduction) {
  var results = [];

  settings.file_settings.forEach(function(scan_settings) {
    getFiles(scan_settings, settings.development_dir, results)
  });

  return results;
}

function developmentView(app, settings) {
  var jsFiles = [];
  var cssFiles = [];

  parseSettings(settings).forEach(function(parsedSetting) {
    switch(parsedSetting.file_type) {
      case 'js':
        jsFiles = jsFiles.concat(parsedSetting.files)
        break;

      case 'css':
        cssFiles = cssFiles.concat(parsedSetting.files)
        break;
    }
  });

  return {
    cssFiles: cssFiles,
    jsFiles: jsFiles,
    publicFolder: settings.development_dir,
  }
}

function compress(app, settings) {
  var compressableCSS = {
    comppression_type: 'sqwish',
    tempPath: '/tmp/',
    compress_to: settings.compress_css_to,
    files: [],
  };

  var compressableJS = {
    comppression_type: 'yui-js',
    tempPath: '/tmp/',
    compress_to: settings.compress_js_to,
    files: [],
  };

  parseSettings(settings).forEach(function(parsedSetting) {
    switch(parsedSetting.file_type) {
    case 'js':
      compressableJS.files = compressableJS.files.concat(parsedSetting.files)
      break;

    case 'css':
      compressableCSS.files = compressableCSS.files.concat(parsedSetting.files)
      break;
    }
  });

  [compressableCSS, compressableJS].forEach(function(value) {
    console.log("Tuning: " + value.files)
    new compressJSCSS.minify({
      type: value.comppression_type,
      fileIn: value.files,
      fileOut: settings.production_dir + '/' + value.compress_to,
      callback: function(err, min) {
        if(err) {
          throw err;
        }
      }
    });
  })

  return {
    engine: function (callBack) {
      callBack(error);

      return {
        cssFiles: [settings.compress_css_to],
        jsFiles: [settings.compress_js_to],
        publicFolder: settings.production_dir,
      };
    },
  };
}

module.exports = function (app, env) {
  if(env === 'development') {
    return {
      engine: function engine() {
        console.log('\n************************************************');
        console.log('Compression disabled in development environment!');
        console.log('************************************************\n');

        isProduction = false;
        return developmentView(app, compress_settings.settings);
      },
    };

  } else {
    isProduction = true;
    return compress(app, compress_settings.settings);
  }
};

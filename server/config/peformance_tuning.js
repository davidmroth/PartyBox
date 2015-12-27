'use strict';

exports.settings = {
  development_dir: 'client/development',
  production_dir: 'client/public',
  compress_js_to: 'js/app.min.js',
  compress_css_to: 'css/app.min.css',
  file_settings: [{
    file_type: 'js',
    compress_files_or_directories: ['client/development/js/lib'],
  },
  {
    file_type: 'js',
    compress_files_or_directories: ['client/development/js/stagekit.js'],
  },
  {
    file_type: 'css',
    compress_files_or_directories: ['client/development/css/lib'],
  },
  {
    file_type: 'css',
    compress_files_or_directories: ['client/development/css/app.css'],
  }],
};

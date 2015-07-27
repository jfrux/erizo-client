'use strict';
module.exports = function(grunt) {
var gitOpts = {
  repository: "https://github.com/ging/licode.git",
  branch: "master",
  directory: "repo"
}
var VENDOR = [
  "lib/socket.io.js"
];
var SRC = [
  "src/Events.js",
  "src/webrtc-stacks/FcStack.js",
  "src/webrtc-stacks/ChromeStableStack.js",
  "src/webrtc-stacks/ChromeCanaryStack.js",
  "src/webrtc-stacks/FirefoxStack.js",
  "src/webrtc-stacks/BowserStack.js",
  "src/Connection.js",
  "src/Stream.js",
  "src/Room.js",
  "src/utils/L.Logger.js",
  "src/utils/L.Base64.js",
  "src/utils/L.Resizer.js",
  "src/views/View.js",
  "src/views/VideoPlayer.js",
  "src/views/AudioPlayer.js",
  "src/views/Bar.js",
  "src/views/Speaker.js"
]

grunt.initConfig({
  clean: {
    post_build: [
      'extras/',
      'src/',
      'tools/',
      'lib/'
    ],
    full: [
      'repo/*',
      'build/*'
    ]
  },
  jshint: {
    options: {
      jshintrc: '.jshintrc'
    },
    all: SRC
  },
  uglify: {
    dist: {
      files: {
        'dist/erizo.all.min.js': 'dist/erizo.all.js',
        'dist/erizo.min.js': 'dist/erizo.js'
      }
      // ,options: {
      //   // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
      //   sourceMap: 'dist/erizo.full.min.js.map',
      //   sourceMappingURL: 'dist/erizo.full.min.js.map'
      // }
    }
  },
  gitclone: {
    dist: {
      options: gitOpts
    }
  },
  concat: {
    basic: {
      src: SRC,
      dest: 'dist/erizo.js'
    },
    all: {
      src: VENDOR.concat(SRC),
      dest: 'dist/erizo.all.js'
    }
  },
  shell: {
    options: {
      stderr: false
    },
    copy: {
      command: 'cp -R ./repo/erizo_controller/erizoClient/ ./'
    }
  }
});

  // Load tasks
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('build', [
    'shell',
    'concat',
    'uglify',
    'clean:post_build'
  ])
  // Register tasks
  grunt.registerTask('update', [
    'clean',
    'gitclone',
    'copy'
  ]);
};

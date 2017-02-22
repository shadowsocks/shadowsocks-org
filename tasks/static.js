/**
 * Generate the docs ;-)
 *
 * @author Vojta Jina <vojta.jina@gmail.com>
 */

var path = require('path');

var q = require('q');
var fs = require('q-io/fs');
var namp = require('namp');
var jade = require('jade');
var semver = require('semver');


module.exports = function(grunt) {

  // Helper Methods

  var urlFromFilename = function(fileName) {
    return fileName.replace(/^\d*-/, '').replace(/md$/, 'html');
  };

  var menuTitleFromFilename = function(fileName) {
    return fileName.replace(/^\d*-/, '').replace(/\.md$/, '').split(/[\s_-]/).map(function(word) {
      return word.charAt(0).toUpperCase() + word.substr(1);
    }).join(' ');
  };

  var pageTitleFromFilename = menuTitleFromFilename;

  var editUrlFromFilenameAndSection = function(fileName, section) {
    return 'https://github.com/madeye/shadowsocks-org/edit/master/docs/' + section + '/' + fileName;
  };

  var filterOnlyFiles = function(path, stat) {
    // ignore dot files like .DS_Store
    var filename = path.split('/').pop();
    return stat.isFile() && !filename.match(/^\./);
  };

  var sortByVersion = function(a, b) {
    return semver.lt(a + '.0', b + '.0');
  };


  // Register Grunt Task
  grunt.registerMultiTask('static', 'Generate a static homepage', function() {

    // Async Task
    var done = this.async();
    var options = this.options({});
    var template = options.template;

    grunt.verbose.writeflags(options, 'Options');

    // Compile Jade templates and cache them.
    var tplCache = Object.create(null);
    var getJadeTpl = function(name) {
      if (!tplCache[name]) {
        var tplFileName = path.join(template, name + '.jade');

        tplCache[name] = fs.read(tplFileName).then(function(content) {
          return jade.compile(content, {filename: tplFileName, cache: true, pretty: true});
        });
      }
      return tplCache[name];
    };

    this.files.forEach(function(f) {

      // Options
      var source = f.src[0];
      var destination = f.dest[0];

      grunt.log.writeln('Building files from \"' + source + '\" to \"' + destination + '\".');

      // Read all the markdown files
      fs.listTree(source, filterOnlyFiles).then(function(files) {
        return q.all(files.sort().filter(function(filePath) {
            var parts = filePath.substr(source.length).replace(/^\//, '').split('/');
            var fileName = parts.pop();
            var re = /^Home.md$/i;
            return fileName.match(re) == null;
          }).map(function(filePath) {
          return fs.read(filePath).then(function(content) {
            var parts = filePath.substr(source.length).replace(/^\//, '').split('/');
            var fileName = parts.pop();
            var version = parts[0];
            var section = parts[1] || null;
            var basePath = parts.join('/') + '/';
            var parsed = namp(content);

            return {
              url: basePath + urlFromFilename(fileName),
              editUrl: editUrlFromFilenameAndSection(fileName, section),
              layout: parsed.metadata.layout || 'layout',
              content: parsed.html,
              version: version,
              section: section,
              menuTitle: parsed.metadata.menuTitle || menuTitleFromFilename(fileName),
              showInMenu: parsed.metadata.showInMenu !== 'false',
              pageTitle: parsed.metadata.pageTitle || pageTitleFromFilename(fileName),
              editButton: parsed.metadata.editButton !== 'false'
            };
          });
        }));
      }).then(function(files) {
        // construct the menu tree
        var menu = Object.create(null);
        files.forEach(function(file) {
          if (!file.showInMenu) return;

          menu[file.version] = menu[file.version] || Object.create(null);
          menu[file.version][file.section] = menu[file.version][file.section] || [];
          menu[file.version][file.section].push(file);
        });

        // generate and write all the html files
        var versions = Object.keys(menu).sort(sortByVersion);
        return q.all(files.map(function(file) {
          var fileUrl = path.join(destination, file.url);
          return q.all([getJadeTpl(file.layout), fs.makeTree(path.dirname(fileUrl))]).then(function(args) {
            var jadeTpl = args[0];

            return fs.write(fileUrl, jadeTpl({
              versions: versions,
              menu: menu[file.version],
              self: file
            }));
          });
        }));
      }).then(function() {
        done();
      }, function(e) {
        grunt.fail.fatal(e.stack);
        done(e);
      });
    });
  });
};

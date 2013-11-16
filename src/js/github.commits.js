(function ($) {
  function widget(element, options, callback) {
    this.element = element;
    this.options = options;
    this.callback = $.isFunction(callback) ? callback : $.noop;
  }
  
  widget.prototype = (function() {

    function getCommits(user, repo, branch, callback) {
      $.ajax({
        url: "https://api.github.com/repos/" + user + "/" + repo + "/commits?sha=" + branch,
        dataType: 'jsonp',
        success: callback
      });
    }

    function _widgetRun(widget) {
      if (!widget.options) {
        widget.element.append('<span class="error">Options for widget are not set.</span>');
        return;
      }
      var callback = widget.callback;
      var element = widget.element;
      var user = widget.options.user;
      var repo = widget.options.repo;
      var branch = widget.options.branch;
      var avatarSize = widget.options.avatarSize || 20;
      var last = widget.options.last === undefined ? 0 : widget.options.last;
      var limitMessage = widget.options.limitMessageTo === undefined ? 0 : widget.options.limitMessageTo;

      element.append('<p>Widget intitalization, please wait...</p>');
      getCommits(user, repo, branch, function (data) {
        var commits = data.data;
        var totalCommits = (last < commits.length ? last : commits.length);

        element.empty();

        var list = $('<ul class="github-commits-list">').appendTo(element);
        for (var c = 0; c < totalCommits; c++) {
          var commit = commits[c];
          list.append(
            '<li ' + itemClass(c, totalCommits) + ' >' +
              ' ' + ((commit.author !== null) ? avatar(commit.author.gravatar_id, avatarSize) : '') +
              '<div class="github-commits-content">' +
              ' ' + ((commit.author !== null) ? author(commit.author.login) : commit.commit.committer.name) +
              ' committed ' + message(replaceHtmlTags(commit.commit.message), commit.sha) +
              ' ' + when(commit.commit.committer.date) +
              '</div>' + 
              '</li>');
        }
        element.append('<p class="github-commits-widget-by">by <a href="https://github.com/alexanderbeletsky/github.commits.widget">github.commits.widget</a></p>');
        callback(element);

        function itemClass(current, totalCommits) {
          if (current === 0) {
            return 'class="first"';
          } else if (current === totalCommits - 1) {
            return 'class="last"';
          }
          return '';
        }

        function avatar(hash, size) {
          return '<img class="github-avatar" src="http://www.gravatar.com/avatar/' + hash + '?s=' + size + '"/>';
        }

        function author(login) {
          return '<a class="github-user" href="https://github.com/' + login + '">' + login + '</a>';
        }

        function message(commitMessage, sha) {
          var originalCommitMessage = commitMessage;
          if (limitMessage > 0 && commitMessage.length > limitMessage)
          {
            commitMessage = commitMessage.substr(0, limitMessage) + '...';
          }
          return '"' + '<a class="github-commit" title="' + originalCommitMessage + '" href="https://github.com/' + user + '/' + repo + '/commit/' + sha + '">' + commitMessage + '</a>"';
        }

        function replaceHtmlTags(message) {
          return message.replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
        }

        function when(commitDate) {
          var commitTime = new Date(commitDate).getTime();
          var todayTime = new Date().getTime();

          var differenceInDays = Math.floor(((todayTime - commitTime)/(24*3600*1000)));
          if (differenceInDays === 0) {
            var differenceInHours = Math.floor(((todayTime - commitTime)/(3600*1000)));
            if (differenceInHours === 0) {
              var differenceInMinutes = Math.floor(((todayTime - commitTime)/(600*1000)));
              if (differenceInMinutes === 0) {

                return 'just now';
              }

              return 'about ' + differenceInMinutes + ' minutes ago';
            }

            return 'about ' + differenceInHours + ' hours ago';
          } else if (differenceInDays == 1) {
            return 'yesterday';
          }
          return differenceInDays + ' days ago';
        }
      });
    }

    return {
      run: function () {
        _widgetRun(this);
      }
    };

  })();

  $.fn.githubInfoWidget = function(options, callback) {
    this.each(function () {
      new widget($(this), options, callback)
        .run();
    });
    return this;
  };

})(jQuery);

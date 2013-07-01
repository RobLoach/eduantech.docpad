// Generated by CoffeeScript 1.6.3
var App, docpadConfig, moment,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

moment = require('moment');

App = (function() {
  function App() {
    this.stateChange = __bind(this.stateChange, this);
    this.anchorChange = __bind(this.anchorChange, this);
    this.$window.on('anchorchange', this.anchorChange);
    this.$window.on('statechangecomplete', this.stateChange);
  }

  App.prototype.anchorChange = function() {
    var el, hash;
    hash = History.getHash();
    if (!hash) {
      return;
    }
    el = document.getElementById(hash);
    if (!el) {
      return;
    }
    if (el.tagName.toLowerCase() === 'h2') {
      return $(el).trigger('select');
    } else {
      return $(el).ScrollTo(this.config.sectionScrollOpts);
    }
  };

  App.prototype.stateChange = function() {
    return $('h1,h2,h3,h4,h5,h6').each(function() {
      var id;
      if (this.id) {
        return;
      }
      id = this.innerText.toLowerCase().replace(/\s+/g, ' ').replace(/[^a-zA-Z0-9]+/g, '-').replace(/--+/g, '-').replace(/^-|-$/g, '');
      if (document.getElementById(id)) {
        return;
      }
      this.id = id;
      if (!this.getAttribute('data-href')) {
        this.setAttribute('data-href', '#' + this.id);
      }
      if (this.className.indexOf('hover-link') === -1) {
        return this.className += 'hover-link';
      }
    });
  };

  return App;

})();

docpadConfig = {
  plugins: {
    stylus: {
      compress: true
    },
    sitemap: {
      cachetime: 600000,
      changefreq: 'hourly',
      priority: 0.5,
      sitemap: true
    },
    highlightjs: {
      replaceTab: null
    }
  },
  templateData: {
    site: {
      url: "http://eduantech.com",
      title: "EduanTech",
      author: "Eduan Lavaque",
      email: "eduan@snapsimpletech.com",
      description: "A hacker's advice for Linux (and a lot of stuff that works on Linux), WordPress, s2Member and web development.",
      keywords: "greduan, eduan, eduan lavaque, lavaque, hacker, linux, wordpress, s2member, vim, tmux, web development, code"
    },
    getPreparedTitle: function() {
      if (this.document.title) {
        return "" + this.document.title + " - " + this.site.title;
      } else {
        return this.site.title;
      }
    },
    getPreparedAuthor: function() {
      return this.document.author || this.site.author;
    },
    getPreparedEmail: function() {
      return this.document.email || this.site.email;
    },
    getPreparedDescription: function() {
      return this.document.description || this.site.description;
    },
    getPreparedKeywords: function() {
      return this.site.keywords.concat(this.document.keywords || []).join(', ');
    }
  },
  localeCode: "en",
  collections: {
    posts: function() {
      return this.getCollection("html").findAllLive({
        relativeOutDirPath: 'archives'
      }, [
        {
          date: -1
        }
      ]).on("add", function(model) {
        return model.setMetaDefaults({
          layout: "post"
        });
      });
    },
    pages: function() {
      return this.getCollection('documents').findAllLive({
        menuOrder: {
          $exists: true
        }
      }, [
        {
          menuOrder: 1
        }
      ]);
    }
  }
};

module.exports = docpadConfig;
define([
  "use!backbone",
  "use!underscore",
  "jquery"
], function(Backbone, _, $) {
  var tplCache = {};

  var View = Backbone.View.extend({
    template : '<div></div>',

    initialize : function(config) {
      _.bindAll(this, 'bindTo', 'unbind');

      if (config) {
        _.keys(config).forEach(_.bind(function(k) {
          this[k] = config[k];
        }, this));
      }

      this.bindings = [];
      this.prepare();
    },

    prepare : function() {
      // stub for implementation
    },

    render : function() {
      if (!tplCache[this.template]) {
        tplCache[this.template] = _.template(this.template);
      }

      var tpl = tplCache[this.template],
          data = this.model ? this.model.toJSON() : this;

      this.$el.html(tpl(data));
      this.trigger('render');
      this.postRender();
      return this;
    },

    postRender : function() {
      // stub for implementation
    },

    placeAt : function(node, position) {
      var method = {
        'first' :     'prepend',
        'last' :      'append',
        'only' :      'html'
      }[position] || 'append';

      $(node)[method](this.$el);
      return this;
    },

    // ref: http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853
    bindTo : function(model, evt, fn) {
      model.bind(evt, fn, this);
      var binding = {
        evt : evt,
        fn : fn,
        model : model
      };
      this.bindings.push(binding);
      return binding;
    },

    unbind : function() {
      _.each(this.bindings, function(b) {
        b.model.off(b.evt, b.fn);
      });
    },

    destroy : function() {
      this.unbind();
      this.remove();
    }

  });

  View.extend(Backbone.Events);

  return View;
});


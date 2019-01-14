/*
* adapt-resizableIframe
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Kevin Corry <kevinc@learningpool.com>
*/
define(function(require) {

    var ComponentView = require("coreViews/componentView");
    var Adapt = require("coreJS/adapt");
    var iframeResizing = require("./iframeResizer.min.js");

    var ResizableIframe = ComponentView.extend({

        events: {
            'inview': 'inview'
        },

        preRender: function() {
            this.checkIfResetOnRevisit();
        },

        checkIfResetOnRevisit: function() {
            var isResetOnRevisit = this.model.get('_isResetOnRevisit');

            // If reset is enabled set defaults
            if (isResetOnRevisit) {
                this.model.reset(isResetOnRevisit);
            }
        },

        postRender: function() {
            var that = this;
            this.$('.resizableIframe-iframe').ready(function() {
                jQuery('.resizableIframe-iframe-holder iframe').iFrameResize({log:false, checkOrigin: false});
                that.setReadyStatus();
            });
        },

        inview: function(event, visible) {
            if (visible) {
                this.setCompletionStatus();
            }
        }

    });

    Adapt.register("resizableIframe", ResizableIframe);

});

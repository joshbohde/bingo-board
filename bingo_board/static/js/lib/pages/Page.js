/**
 *  @file       Page.js
 *  
 *  @author     Colin Sullivan <colinsul [at] gmail.com>
 **/
 
/**
 *  A page object, which contains views and data for each page
 *  @class
 *  @extends    Backbone.View
 **/
bingo.pages.Page = Backbone.View.extend({
    
    initialize: function() {
        Backbone.View.prototype.initialize.call(this);

        var params = this.options;
        
        /* Create new modal alert box object for alerting the user */
        this.notifier = new ModalNotifier({});

        /* A boolean in case we have lost connection to the server */
        this.CONNECTION_ERROR = false;
        
        /* The data to populate the boards with */
        var userdata = params.userdata;
        if(typeof(userdata) == 'undefined') {
            throw new Error('params.userdata is undefined');
        }
        this.userdata = userdata;
        
        /* The div to display messages to the user in */
        var messagesContainer = $('#page_message');
        if(typeof(messagesContainer) == 'undefined') {
            throw new Error('messagesContainer is undefined');
        }
        else if(messagesContainer.length == 0) {
            throw new Error('messagesContainer not found');
        }
        this.messagesContainer = messagesContainer;
        
        /* The initial message to display to the user */
        var initialMessage = params.message;
        if(typeof(initialMessage) != 'undefined' && initialMessage != '') {
            this.notify(initialMessage);
        }
        

        
        
        /* Any text fields that are class autoclear should be autocleared */
        $('input.autoclear').each(function() {
            var field = new bingo.helpers.AutoClearField({
                inputElement: $(this), 
            });
        });
        
        
        _.bindAll(this, "render");
    },
    render: function() {
        Backbone.View.prototype.render.call(this);
        
        return this;
    },
    /**
     *  Should be called when user is to be notified of something.
     *
     *  @param  {String}    message    The message to display to the user
     **/
    notify: function(message) {
        if(typeof(message) != 'string' || message == '') {
            throw new Error('Message must be a valid string');
        }
        
        this.messagesContainer.html(message);
    }, 
});

if (!this.CustomEvent) {
    if (!this.Event || typeof this.Event == "object") {
        this.Event = document.createEvent('Event').constructor;
    }
    this.CustomEvent = function(type, parameters) {
        parameters = parameters || {};
        var event = document.createEvent('Event'); //using most simple event type to ensure most backward compatible
        event.initEvent(type, parameters.bubbles || false, parameters.cancelable || false);
        event.type = type;
        if (parameters.detail) {
            event.detail = parameters.detail;
        }
        return event;
    }
    CustomEvent.prototype = Object.create(Event.prototype);
}
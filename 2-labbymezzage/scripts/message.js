function Message(message, time) {

    if ( typeof message != "string" || message.trim() === 0) {
        throw new Error("ERROR! The message must contain a text!");
    }

    Object.defineProperties(this, {
        "text": {
            get: function() {
                return message;
            },
            set: function(newMessage) {
                if(newMessage.trim().length === 0 || typeof newMessage != "string") {
                }
                else {
                    message = newMessage;
                }
            }
        },
        "date": {
            get: function() {
                return time.toLocaleString();
            },
            set: function(newTime) {
                newTime = Date.parse(newTime);
                if (isNaN(newTime) || (Date.getTime() - newTime) <= 0) {
                    // Empty!
                }
                else {
                    time = newTime;
                }
            }
        }
    });

    time = Date.parse(time);
    if (isNaN(time) || (Date.getTime() - time) <= 0) {
        time = new Date();
    }

    this.message = message;
    this.date = time;
}

Message.prototype.toString = function () {
    return this.text + " (" + this.date + ")";
}

Message.prototype.toHTMLText = function () {
    
}
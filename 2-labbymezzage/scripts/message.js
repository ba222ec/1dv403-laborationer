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
                return time;
            },
            set: function (newTime) {
                if (!newTime instanceof Date) {
                    newTime = Date.parse(newTime);
                } 
                if (isNaN(newTime) || (Date.now() - newTime) <= 0) {
                    time = Date.now();
                } else {
                    time = newTime;
                }
            }
        }
    });

    this.message = message;
    this.date = time;
}

Message.prototype.toString = function () {
    return this.text + " (" + this.date.toLocaleString() + ")";
}

Message.prototype.getHTMLText = function () {
    var HTMLText = "", i, temp;

    // Replacing "\n" with "<br />"
    for (i = 0; i < this.message.length; i += 1) {
        temp = this.message.charAt(i);
        HTMLText += (function (temp) {
            if (temp === "\n") {
                return "<br />";
            } else {
                return temp;
            }
        })();
    }

    return HTMLText;
}

Message.prototype.getDateText = function () {
    return this.date.toLocaleString();
}
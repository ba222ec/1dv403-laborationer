function Message(text, time) {

    if ( typeof text != "string" || text.trim() === 0) {
        throw new Error("ERROR! The message must contain a text!");
    }

    Object.defineProperties(this, {
        "message": {
            get: function() {
                return text;
            },
            set: function(newText) {
                if (typeof newText !== "string" || newText.trim().length === 0) {
                    // Empty!
                } else {
                    text = newText;
                }
            }
        },
        "date": {
            get: function() {
                return time;
            },
            set: function (newTime) {
                // If newTime isn't a Date-object, a invalid Date-object or a
                // date in the future, nothing will happend.
                if (typeof newTime !== "object" || !newTime instanceof Date ||
                        isNaN(newTime) || (Date.now() - newTime.getTime()) <= 0) {
                    // Empty!
                } else {
                    time = newTime;
                }
            }
        }
    });

    this.message = text;
    this.date = time;
}

Message.prototype.toString = function () {
    return this.message + " (" + this.getDateText() + ")";
};

Message.prototype.getHTMLText = function () {
    var HTMLText = "", i;

    function analyzeChar(char) {
        if (char === "\n") {
            return "<br />";
        } else {
            return char;
        }
    }
    
    // Replacing "\n" with "<br />"
    for (i = 0; i < this.message.length; i += 1) {
        HTMLText += analyzeChar(this.message.charAt(i));
    }

    return HTMLText;
};

Message.prototype.getDateText = function () {
    return this.date.toLocaleString();
};
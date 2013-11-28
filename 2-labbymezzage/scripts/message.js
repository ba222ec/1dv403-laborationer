"use strict";

function Message(text, time) {
    if (typeof text != "string" || text.trim() === 0) {
        return;
    }

    Object.defineProperties(this, {
        "message": {
            get: function () {
                return text;
            },
            set: function (newText) {
                if (typeof newText !== "string" || newText.trim().length === 0) {
                    // Empty!
                } else {
                    text = newText;
                }
            }
        },
        "date": {
            get: function () {
                return time;
            },
            set: function (newTime) {
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
    return this.message.replace(/\n/g, "<br />");
};

Message.prototype.getDateText = function () {
    return this.date.toLocaleTimeString();
};

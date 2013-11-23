function Message(text) {
    
    if (text.trim() === 0) {
        throw new Error("ERROR! The message must contain a text!");
    }
    var timeOfCreation = new Date();
    
    Object.defineProperties(this, {
        "text": {
            get: function() {
                return text;
            },
            set: function(newText) {
                if(newText.trim().length === 0) {
                    text = text;
                }
                else {
                    text = newText;
                }
            }
        },
        "date": {
            get: function() {
                return timeOfCreation.toLocaleString();
            },
            set: function(newDateString) {
                var newDate = Date.parse(newDateString);
                if (isNaN(newDate) || (Date.getTime() - newDate) <= 0) {
                    timeOfCreation = timeOfCreation;
                }
                else {
                    timeOfCreation = newDate;
                }
            }
        }
    });

    this.text = text;
    // create a message object

}
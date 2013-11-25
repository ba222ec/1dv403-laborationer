(function () {
    var messageBoard = {
        // The array should store all the messages
        messages: [],
        init: function (message) {
            try {
                this.messages.push(new Message(message, new Date()));
                return this.messages;
            }
            catch (e) {
                // Empty!
            }
        }
    };

    var htmlMessageBoard = document.getElementById("message-board"),
        submit = document.getElementById("submit-button"),
        input = document.getElementById("message-area"),
        nbrOfMessages = document.getElementById("nbr");

    submit.addEventListener("click", function (e) {
        var output, i;

        e.preventDefault();
        if ((input.value).trim().length === 0) {
            return;
        }

        output = messageBoard.init(input.value);
        htmlMessageBoard.innerHTML = "";
        for (i = 0; i < output.length; i += 1) {
            htmlMessageBoard.innerHTML += output[i] + "<br />";
        }

        nbrOfMessages.innerHTML = "";
        nbrOfMessages.innerHTML = "Antal meddelanden: " + output.length;
        input.value = "";
    });
}());
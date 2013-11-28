(function () {
    // Nodes from DOM used in the functions. 
    var htmlMessageBoard = document.querySelector("#message-board"),
        submit = document.querySelector("#submit-button"),
        nbrOfMessages = document.querySelector("#nbr"),
        textarea = document.querySelector("form textarea");

    // This is the object with the message-board properties.
    var messageBoard = {

        // Saves all the messages
        messages: [],

        // Create a new message.
        createMessage: function (text) {
            this.messages.push(new Message(text, new Date()));
            return this.messages;
        },

        // Create the htmlcode for one message
        renderMessage: function (messageIndex) {
            var div0 = document.createElement("div"),
                div1 = document.createElement("div"),
                p1 = document.createElement("p"),
                div2 = document.createElement("div"),
                linkButton1 = document.createElement("a"),
                linkButton2 = document.createElement("a"),
                img1 = document.createElement("img"),
                img2 = document.createElement("img"),
                footer = document.createElement("footer"),
                p2 = document.createElement("p");

            div0.setAttribute("class", "row");
            div0.setAttribute("id", messageIndex.toString());
            div1.setAttribute("class", "small-11 columns");
            div2.setAttribute("class", "small-1 columns");
            linkButton1.setAttribute("class", "eraseMessage");
            linkButton1.setAttribute("href", "#");
            linkButton2.setAttribute("class", "showTime");
            linkButton2.setAttribute("href", "#");
            img1.setAttribute("src", "img/clock.png");
            img2.setAttribute("src", "img/erase.png");
            footer.setAttribute("class", "small-12 columns");

            htmlMessageBoard.appendChild(div0);
            div0.appendChild(div1);
            div1.appendChild(p1);
            div0.appendChild(div2);
            div2.appendChild(linkButton1);
            div2.appendChild(linkButton2);
            linkButton1.appendChild(img1);
            linkButton1.appendChild(img2);
            div0.appendChild(footer);
            footer.appendChild(p2);

            // Adds the text content
            p1.innerHTML = this.messages[messageIndex].getHTMLText();
            p2.innerHTML = this.messages[messageIndex].getDateText();
        },

        // Views all the messages.
        renderMessages: function () {
            var index;
            htmlMessageBoard.innerHTML = "";
            for (index = this.messages.length - 1; index >= 0; index -= 1) {
                messageBoard.renderMessage(index);
            }
            nbrOfMessages.innerHTML = "Antal meddelanden: " + this.messages.length;
            messageBoard.emptyTextarea();
        },

        // Erase the message with the given index and rewrites all the remaining massages.
        eraseMessage: function (index) {
            this.messages.splice(index, 1);
            this.renderMessages();
        },

        // Show the time when the given message was created.
        alertTimeMessage: function (index) {
            alert("Meddelandet skapades " + this.messages[index].date.toLocaleString());
        },

        // Emptying the textarea
        emptyTextarea: function () {
            textarea.value = "";
        }
    };

    // Click on "Skicka"
    submit.addEventListener("click", function (e) {
        e = e || window.event; // IE-fix
        e.preventDefault();
        if ((textarea.value).trim().length === 0) {
            return;
        }
        messageBoard.createMessage(textarea.value.trim());
        messageBoard.renderMessages();
    }, false);

    // Send message by pressing enter
    textarea.addEventListener("keypress", function (e) {
        e = e || window.event; // IE-fix
        var code = e.keyCode;
        if (code !== 13/*Enter*/ || e.shiftKey === true) {
            return;
        } else {
            e.preventDefault();
            if (textarea.value.trim().length === 0) {
                messageBoard.emptyTextarea();
                return;
            }
            messageBoard.createMessage(textarea.value.trim());
            messageBoard.renderMessages();
        }
    }, false);

    // Click on the Icons on the messages.
    htmlMessageBoard.addEventListener("click", function (e) {
        e = e || window.event; // IE-fix

        e.preventDefault();

        var hit = e.target,
            index,
            answer;

        console.log(hit);

        if (hit.hasAttribute("src")) {
            index = hit.parentNode.parentNode.parentNode.getAttribute("id");
            // Click on delete.
            if (hit.getAttribute("src") === "img/erase.png") {
                answer = window.confirm("Vill du verkligen radera meddelandet?")
                if (answer === false) {
                    return;
                } else {
                    messageBoard.eraseMessage(index);
                }
            }
            // Click on time.
            else {
                messageBoard.alertTimeMessage(index);
            }
        }

        if (hit.hasAttribute("href")) {
            index = hit.parentNode.parentNode.getAttribute("id");
            // Click on delete.
            if (hit.getAttribute("class") === "eraseMessage") {
                answer = window.confirm("Vill du verkligen radera meddelandet?")
                if (answer === false) {
                    return;
                } else {
                    messageBoard.eraseMessage(index);
                }
            }
            // Click on time.
            else {
                messageBoard.alertTimeMessage(index);
            }
        }

    }, false);

}());
(function () {
    // Create and get nodes from DOM used in the functions 
    var htmlMessageBoard = document.querySelector("#message-board"),
        submit = document.querySelector("#submit-button"),
        input = document.querySelector("#message-area"),
        nbrOfMessages = document.querySelector("#nbr");

    // This is the object with the message-board properties.
    var messageBoard = {
        
        messages: [],

        init: function (message) {
            this.messages.push(new Message(message, new Date()));
            return this.messages;
        },

        RenderMessage: function (messageID) {
            // Creates the message...
            var article = document.createElement("article"),
                div1 = document.createElement("div"),
                p1 = document.createElement("p"),
                div2 = document.createElement("div"),
                linkButton1 = document.createElement("a"),
                linkButton2 = document.createElement("a"),
                img1 = document.createElement("img"),
                img2 = document.createElement("img"),
                footer = document.createElement("footer"),
                p2 = document.createElement("p");

            article.setAttribute("class", "row");
            div1.setAttribute("class", "small-11 columns");
            div2.setAttribute("class", "small-1 columns");
            linkButton1.setAttribute("class", "deleteMessage");
            linkButton1.setAttribute("href", "#");
            linkButton2.setAttribute("class", "changeTime");
            linkButton2.setAttribute("href", "#");
            img2.setAttribute("src", "img/clock.png");
            img1.setAttribute("src", "img/erase.png");
            footer.setAttribute("class", "small-12 columns");

            htmlMessageBoard.appendChild(article);
            article.appendChild(div1);
            div1.appendChild(p1);
            article.appendChild(div2);
            div2.appendChild(linkButton1);
            div2.appendChild(linkButton2);
            linkButton1.appendChild(img1);
            linkButton1.appendChild(img2);
            article.appendChild(footer);
            footer.appendChild(p2);

            p1.innerHTML = messageID.getHTMLText();
            p2.innerHTML = messageID.getDateText();
        },

        RenderMessages: function (allMessages) {
            var i;

            htmlMessageBoard.innerHTML = "";

            for (i = allMessages.length - 1; i >= 0; i -= 1) {
                this.RenderMessage(allMessages[i]);
            }

            nbrOfMessages.innerHTML = "Antal meddelanden: " + allMessages.length;
            input.value = "";
        }
    };

    submit.addEventListener("click", function (e) {
        e.preventDefault();

        var allMessages;

        if ((input.value).trim().length === 0) {
            return;
        }

        allMessages = messageBoard.init(input.value.trim());
        messageBoard.RenderMessages(allMessages);

    });
}());
"use strict";

function MessageBoard(appID) {

    this.init = function () {
        var formContainer = document.querySelector("#" + appID + "Form"),
            div0 = document.createElement("div"),
            p = document.createElement("p"),
            form = document.createElement("form"),
            div1 = document.createElement("div"),
            textarea = document.createElement("textarea"),
            div2 = document.createElement("div"),
            input = document.createElement("input"),
            that = this,
            messageBoard = document.querySelector("#" + appID);

        div0.setAttribute("class", "small-12 columns");
        p.setAttribute("class", "nbr");
        p.innerHTML = "Antal meddelanden: 0";
        div1.setAttribute("class", "small-12 columns");
        textarea.setAttribute("name", "message");
        textarea.setAttribute("spellcheck", "false");
        div2.setAttribute("class", "small-2 small-offset-10 columns");
        input.setAttribute("class", "button tiny round");
        input.setAttribute("type", "submit");
        input.setAttribute("value", "Skicka");

        div2.appendChild(input);
        div1.appendChild(textarea);
        div0.appendChild(p);
        form.appendChild(div1);
        form.appendChild(div2);
        formContainer.appendChild(div0);
        formContainer.appendChild(form);

        // Click on "Skicka"
        input.addEventListener("click", function (e) {
            e = e || window.event; // IE-fix
            e.preventDefault();
            if ((textarea.value).trim().length === 0) {
                return;
            }
            that.createMessage(textarea.value.trim());
            that.renderMessages();
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
                    that.emptyTextarea();
                    return;
                }
                that.createMessage(textarea.value.trim());
                that.renderMessages();
            }
        }, false);

        // Click on the Icons on the messages.
        messageBoard.addEventListener("click", function (e) {
            e = e || window.event; // IE-fix
            e.preventDefault();
            var hit = e.target,
                index,
                answer;
            if (hit.hasAttribute("src")) {
                index = parseInt(hit.parentNode.parentNode.parentNode.getAttribute("id"), 10);
                // Click on delete.
                if (hit.getAttribute("src") === "img/erase.png") {
                    answer = window.confirm("Vill du verkligen radera meddelandet?");
                    if (answer === false) {
                        return;
                    } else {
                        that.eraseMessage(index);
                    }
                }
                    // Click on time.
                else {
                    that.alertTimeMessage(index);
                }
            }
            if (hit.hasAttribute("href")) {
                index = parseInt(hit.parentNode.parentNode.getAttribute("id"), 10);
                // Click on delete.
                if (hit.getAttribute("class") === "eraseMessage") {
                    answer = window.confirm("Vill du verkligen radera meddelandet?");
                    if (answer === false) {
                        return;
                    } else {
                        that.eraseMessage(index);
                    }
                }
                    // Click on time.
                else {
                    that.alertTimeMessage(index);
                }
            }
        }, false);
    };

    // Saves all the messages
    this.messages = [];

    // Create a new message.
    this.createMessage = function (text) {
        this.messages.push(new Message(text, new Date()));
        return this.messages;
    };

    // Create the htmlcode for one message
    this.renderMessage = function (messageIndex) {
        var div0 = document.createElement("div"),
            div1 = document.createElement("div"),
            p1 = document.createElement("p"),
            div2 = document.createElement("div"),
            linkButton1 = document.createElement("a"),
            linkButton2 = document.createElement("a"),
            img1 = document.createElement("img"),
            img2 = document.createElement("img"),
            footer = document.createElement("footer"),
            p2 = document.createElement("p"),
            messageBoard = document.querySelector("#" + appID);

        div0.setAttribute("class", "row");
        div0.setAttribute("id", messageIndex.toString() + appID);
        div1.setAttribute("class", "small-10 columns");
        div2.setAttribute("class", "small-2 columns");
        linkButton1.setAttribute("class", "eraseMessage");
        linkButton1.setAttribute("href", "#");
        linkButton2.setAttribute("class", "showTime");
        linkButton2.setAttribute("href", "#");
        img1.setAttribute("src", "img/erase.png");
        img2.setAttribute("src", "img/clock.png");
        footer.setAttribute("class", "small-12 columns");
       
        div0.appendChild(div1);
        div1.appendChild(p1);
        div0.appendChild(div2);
        div2.appendChild(linkButton1);
        div2.appendChild(linkButton2);
        linkButton1.appendChild(img1);
        linkButton2.appendChild(img2);
        div0.appendChild(footer);
        footer.appendChild(p2);
        messageBoard.appendChild(div0);

        // Adds the text content
        p1.innerHTML = this.messages[messageIndex].getHTMLText();
        p2.innerHTML = this.messages[messageIndex].getDateText();
    };

    // Views all the messages.
    this.renderMessages = function () {
        var index,
            messageBoard = document.querySelector("#" + appID),
            nbrOfMessages = document.querySelector("#" + appID + "Form p.nbr");

        messageBoard.innerHTML = "";

        for (index = this.messages.length - 1; index >= 0; index -= 1) {
            this.renderMessage(index);
        }

        nbrOfMessages.innerHTML = "Antal meddelanden: " + this.messages.length;
        this.emptyTextarea();
    };

    // Erase the message with the given index and rewrites all the remaining massages.
    this.eraseMessage = function (index) {
        this.messages.splice(index, 1);
        this.renderMessages();
    };

    // Show the time when the given message was created.
    this.alertTimeMessage = function (index) {
        alert("Meddelandet skapades " + this.messages[index].date.toLocaleString());
    };

    // Emptying the textarea
    this.emptyTextarea = function () {
        var textarea = document.querySelector("#" + appID + "Form textarea");
        textarea.value = "";
    };
}

window.onload = function () {
    new MessageBoard("messageBoard1").init();
    new MessageBoard("messageBoard2").init();
};
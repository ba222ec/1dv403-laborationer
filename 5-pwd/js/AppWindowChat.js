"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowChat = function (sStatus, iWidth, iHeight, iX, iY) {
    SVANTE.constructors.AppWindow.call(this, "AppWindowChat", sStatus,
        iWidth, iHeight, iX, iY);

    var iIntervalID;

    this.messages = null;

    // Changable...
    this.interval = 10000;

    this.stopTimer = function () {
        clearInterval(iIntervalID);
    };

    this.init = function () {
        var doc = document,
            that = this,
            // Change when menu-bar!!!
            eContentArea = this.windowHTML.children[1],
            // The area where messages is shown.
            eOutputarea = (function () {
                var eDivOutputarea = doc.createElement("div");
                eDivOutputarea.className = "chat-outputarea";

                return eDivOutputarea;
            }()),
            // The form area.
            eInputarea = (function () {
                var eDivInputarea = doc.createElement("div"),
                    eForm = doc.createElement("form"),
                    eTextarea = doc.createElement("textarea"),
                    eInputSubmit = doc.createElement("input"),
                    sendMessage = null,
                    sURL;

                eDivInputarea.className = "chat-inputarea";
                eTextarea.name = "inputmessage";
                eInputSubmit.type = "submit";
                eInputSubmit.value = "Skicka";

                sendMessage = function () {
                    // Changable...
                    var username = "Svante",
                        text = eTextarea.value.trim();

                    if (typeof XDomainRequest !== "undefined") {
                        // Buggie woggie...
                        sURL = "http://homepage.lnu.se/staff/tstjo/labbyserver/setMessage.php?text=" + text + "&username=" + username;
                        xdr = new XDomainRequest();
                        // Handle the request-result when it arrives.
                        xdr.onload = function () {
                            that.messages = $.parseXML(xdr.responseText);
                            that.renderMessages();
                        };
                        // Handle the result if an error occurs.
                        xdr.onerror = function () {
                            that.messages = (function () {
                                var eP = doc.createElement("p");
                                eP.innerHTML = "Det inträffade ett fel. Data kunde inte skickas till servern.";
                                return eP;
                            }());
                            that.windowHTML.children[1].children[0].innerHTML = "";
                            that.windowHTML.children[1].children[0].appendChild(that.messages);
                        };
                        xdr.open("post", encodeURI(sURL));
                        xdr.send(null);
                        // All other browsers.
                    } else {
                        $.ajax({
                            url: "http://homepage.lnu.se/staff/tstjo/labbyserver/setMessage.php",
                            data: "text=" + text + "&username=" + username,
                            type: "POST",
                            crossDomain: true,
                            complete: function () {
                                that.update();
                            }
                        });
                    }
                    eTextarea.value = "";
                };

                // Add Event Listeners
                // On click.
                eInputSubmit.addEventListener("click", function (e) {
                    e.preventDefault();
                    // If the massagearea is empty.
                    if (eTextarea.value.trim() === "") {
                        eTextarea.value = "";
                        return;
                    } else {
                        sendMessage(e);
                    }
                }, false);
                // On ENTER being pressed.
                eTextarea.addEventListener("keypress", function (e) {
                    var code = e.keyCode;
                    // If only ENTER where pressed.
                    if (code === 13/*Enter*/ && e.shiftKey !== true) {
                        e.preventDefault();
                        if (eTextarea.value.trim() === "") {
                            eTextarea.value = "";
                            return;
                        } else {
                            sendMessage(e);
                        }
                    }
                }, false);

                eForm.appendChild(eTextarea);
                eForm.appendChild(eInputSubmit);
                eDivInputarea.appendChild(eForm);

                return eDivInputarea;
            }());

        eContentArea.appendChild(eOutputarea);
        eContentArea.appendChild(eInputarea);

        this.update();

        // Make sure that to update the window at most each 10th second.
        iIntervalID = setInterval(function () {
            that.update();
        }, that.interval);
    };
};

SVANTE.constructors.AppWindowChat.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);

SVANTE.constructors.AppWindowChat.prototype.constructor = SVANTE.constructors.AppWindowChat;

SVANTE.constructors.AppWindowChat.prototype.renderMessage = function (xmlNode) {
    var doc = document,
        // Change when menu-bar!!!
        eMessageContainer = this.windowHTML.children[1].children[0],
        eDivMessage = doc.createElement("div"),
        ePAuthor = doc.createElement("p"),
        ePTime = doc.createElement("p"),
        ePText = doc.createElement("p"),
        date;

    eDivMessage.className = "message";
    ePAuthor.className = "author";
    ePTime.className = "time";
    ePText.className = "text";

    try {
        ePAuthor.innerHTML = xmlNode.getElementsByTagName("author")[0].childNodes[0].nodeValue;
    } catch (error) {
        ePAuthor.innerHTML = "Anonymus";
    }

    try {
        date = new Date(+(xmlNode.getElementsByTagName("time")[0].childNodes[0].nodeValue));
        ePTime.innerHTML = date.toLocaleString();
    } catch (error) {
        ePTime.innerHTML = "";
    }

    try {
        ePText.innerHTML = xmlNode.getElementsByTagName("text")[0].childNodes[0].nodeValue;
    } catch (error) {
        ePText.innerHTML = "";
    }

    eDivMessage.appendChild(ePAuthor);
    eDivMessage.appendChild(ePTime);
    eDivMessage.appendChild(ePText);
    eMessageContainer.appendChild(eDivMessage);
};

SVANTE.constructors.AppWindowChat.prototype.renderMessages = function () {
    var xmlNodeList = this.messages.getElementsByTagName("message"),
        i,
        p = xmlNodeList.length;

    // Temporary!!! Change when menu bar is added!!!
    this.windowHTML.children[1].children[0].innerHTML = "";

    for (i = 0; i < p; i += 1) {
        this.renderMessage(xmlNodeList[i]);
    }
};

SVANTE.constructors.AppWindowChat.prototype.update = function () {
    var that = this,
        iTimeoutID,
        sURL;

    iTimeoutID = setTimeout(function () {
        that.createLoadAnimation();
    }, 100);

    if (typeof XDomainRequest !== "undefined") {
        sURL = "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php?history=" + 25;
        console.log(sURL);
        xdr = new XDomainRequest();
        xdr.contentType = "text/plain";
        // Handle the request-result when it arrives.
        xdr.onload = function () {
            that.messages = $.parseXML(xdr.responseText);
            that.renderMessages();
            clearTimeout(iTimeoutID);
            that.windowHTML.children[2].children[0].innerHTML = "Senast uppdaterad klockan " + new Date().toLocaleTimeString();
        };
        // Handle the result if an error occurs.
        xdr.onerror = function () {
            that.messages = (function () {
                var eP = document.createElement("p");
                eP.innerHTML = "Det inträffade ett fel. Data kunde inte hämtas från servern.";
                return eP;
            }());
            that.windowHTML.children[1].children[0].innerHTML = "";
            that.windowHTML.children[1].children[0].appendChild(that.messages);
            clearTimeout(iTimeoutID);
            that.windowHTML.children[2].children[0].innerHTML = "Senast uppdaterad klockan " + new Date().toLocaleTimeString();
        };
        xdr.open("get", encodeURI(sURL));
        xdr.send(null);
        // All other browsers.
    } else {
        $.ajax({
            url: "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php",
            // Temporary hard-coded...
            data: "history=25",
            type: "get",
            crossdomain: true,
            // handle the request-result when it arrives.
            success: function (result) {
                that.messages = $.parseXML(result);
                that.renderMessages();
            },
            // handle the result if an error occurs.
            error: function () {
                that.messages = (function () {
                    var eP = document.createElement("p");
                    eP.innerHTML = "Det inträffade ett fel. Data kunde inte hämtas.";
                    return eP;
                }());
                that.windowHTML.children[1].children[0].innerHTML = "";
                that.windowHTML.children[1].children[0].appendChild(that.messages);
            },
            complete: function () {
                clearTimeout(iTimeoutID);
                that.windowHTML.children[2].children[0].innerHTML = "Senast uppdaterad klockan " + new Date().toLocaleTimeString();
            }
        });
    }
};

SVANTE.constructors.AppWindowChat.prototype.createLoadAnimation = function () {
    // Change when menu-bar!!!
    var eStatus = this.windowHTML.childNodes[2].childNodes[0],
        eImg = document.createElement("img");

    eImg.src = "img/ajax-loader.gif";
    eStatus.innerHTML = "";
    eStatus.appendChild(eImg);
};
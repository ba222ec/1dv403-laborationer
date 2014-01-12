"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowChat = function (iWidth, iHeight, iX, iY) {
    SVANTE.constructors.AppWindow.call(this, iWidth, iHeight, iX, iY, true, "Chat", "content chat", "img/creative_writing_32x32.png", "");

    this.iIntervalID = 0;

    this.messages = null;

    // Changable...
    this.updateInterval = (function () {
        var temp = null;
        if (localStorage.chatUpdateInterval && typeof localStorage.chatUpdateInterval === "number") {
            temp = localStorage.chatUpdateInterval;
        } else {
            localStorage.chatUpdateInterval = 10000;
            temp = localStorage.chatUpdateInterval;
        }
        return temp;
    }());

    // Changable...
    this.username = (function () {
        var temp = null;
        if (localStorage.chatUsername && typeof localStorage.chatUsername === "string") {
            temp = localStorage.chatUsername;
        } else {
            localStorage.chatUsername = "Anonymus";
            temp = localStorage.chatUsername;
        }
        return temp;
    }());

    // Changable...
    this.nbrOfMessages = (function () {
        var temp = null;
        if (localStorage.chatNbrOfMessages && !(isNaN(localStorage.chatNbrOfMessages))) {
            temp = localStorage.chatNbrOfMessages;
        } else {
            localStorage.chatNbrOfMessages = 25;
            temp = localStorage.chatNbrOfMessages;
        }
        return temp;
    }());

    this.init = function () {
        var doc = document,
            that = this,
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
                    sURL = null,
                    sData = null;

                eDivInputarea.className = "chat-inputarea";
                eTextarea.name = "inputmessage";
                eInputSubmit.type = "submit";
                eInputSubmit.value = "Skicka";

                sendMessage = function () {
                    // Changable...
                    var text = eTextarea.value.trim();

                    // Nothing works properly in IE9. I hav absolutely no Ide of what to do next, 
                    // and the stupid error messages from IE9 is completely impossible to understand!
                    if (typeof XDomainRequest !== "undefined") {
                        // Buggie woggie...
                        sURL = encodeURI("http://homepage.lnu.se/staff/tstjo/labbyserver/setMessage.php");
                        sData = encodeURIComponent("text") + "=" + encodeURIComponent(text) + "&" + encodeURIComponent("username") + "=" + encodeURIComponent(that.username);
                        xdr = new XDomainRequest();
                        // Handle the request-result when it arrives.
                        xdr.onload = function () {
                            that.update();
                        };
                        // Handle the result if an error occurs.
                        xdr.onerror = function () {
                            that.messages = (function () {
                                var eP = doc.createElement("p");
                                eP.innerHTML = "Det inträffade ett fel. Data kunde inte skickas till servern.";
                                return eP;
                            }());
                            that.windowHTML.children[2].children[0].innerHTML = "";
                            that.windowHTML.children[2].children[0].appendChild(that.messages);
                        };
                        xdr.open("post", sURL + "?" + sData);
                        xdr.send();
                        // All other browsers.
                    } else {
                        $.ajax({
                            url: "http://homepage.lnu.se/staff/tstjo/labbyserver/setMessage.php",
                            data: "text=" + text + "&username=" + that.username,
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
            }()),
            // The Archive drodown menu.
            eDropdownMenuArchive = (function () {
                var eArchiveMenu = doc.createElement("div"),
                    eUl = doc.createElement("ul"),
                    eLi1 = doc.createElement("li"),
                    eLi2 = doc.createElement("li"),
                    eAUpdateNow = doc.createElement("a"),
                    eAClose = doc.createElement("a"),
                    eTextUpdateNow = doc.createTextNode("Uppdatera nu"),
                    eTextClose = doc.createTextNode("Stäng");

                // Add attributes.
                eAUpdateNow.href = "#";
                eAClose.href = "#";
                eArchiveMenu.className = "archive hidden";

                // Click on "Update Now".
                eAUpdateNow.addEventListener("click", function (e) {
                    e.preventDefault();
                    that.update();
                }, false);

                // Click on "Close".
                eAClose.addEventListener("click", function (e) {
                    e.preventDefault();
                    var sThisWindowID = that.windowHTML.id;
                    $("div#" + sThisWindowID + " div.top-bar a.close-icon img").trigger("click");
                }, false);

                // Hides the menu.
                eArchiveMenu.addEventListener("mouseleave", function (e) {
                    e.preventDefault();
                    eMenubar.children[0].children[0].children[0].className = "";
                    eMenubar.children[1].className += " hidden";
                }, false);

                eAClose.appendChild(eTextClose);
                eAUpdateNow.appendChild(eTextUpdateNow);
                eLi2.appendChild(eAClose);
                eLi1.appendChild(eAUpdateNow);
                eUl.appendChild(eLi1);
                eUl.appendChild(eLi2);
                eArchiveMenu.appendChild(eUl);

                // The function return the value of the variable.
                return eArchiveMenu;
            }()),
            // The Properties drodown menu.
            eDropdownMenuProperties = (function () {
                var ePropertiesMenu = doc.createElement("div"),
                    eUl = doc.createElement("ul"),
                    eLi1 = doc.createElement("li"),
                    eLi2 = doc.createElement("li"),
                    eLi3 = doc.createElement("li"),
                    eAChoseUsername = doc.createElement("a"),
                    eAChoseNbrOfMessanges = doc.createElement("a"),
                    eAUpdateInterval = doc.createElement("a"),
                    eTextChoseUsername = doc.createTextNode("Välj användarnamn"),
                    eTextChoseNbrOfMessanges = doc.createTextNode("Välj antal visade meddelanden"),
                    eTextUpdateInterval = doc.createTextNode("Välj uppdateringsintervall");

                // Add attributes.
                eAChoseUsername.href = "#";
                eAUpdateInterval.href = "#";
                ePropertiesMenu.className = "properties hidden";

                // Click on "Chose username"
                eAChoseUsername.addEventListener("click", function (e) {
                    e.preventDefault();
                    // Create the Modal Popup window.
                    var oModalPopup = new SVANTE.constructors.ModalPopup((function () {
                        var doc = document,
                            eForm = doc.createElement("form"),
                            eFieldset = doc.createElement("fieldset"),
                            eLegend = doc.createElement("legend"),
                            eInputText = doc.createElement("input"),
                            eInputSubmit = doc.createElement("input");

                        // Attributes and event listeners.
                        eLegend.innerHTML = "Välj användarnamn";
                        eInputText.className = "chose-username";
                        eInputText.type = "text";
                        eInputText.name = "chose-username";
                        eInputSubmit.type = "submit";
                        eInputSubmit.value = "Välj";
                        eInputSubmit.className = "submit-button";

                        // Change username.
                        eInputSubmit.addEventListener("click", function (e) {
                            e.preventDefault();
                            if (eInputText.value.trim() === "") {
                                oModalPopup.closeDialog();
                            } else {
                                localStorage.chatUsername = eInputText.value.trim();
                                that.username = localStorage.chatUsername;
                                that.update();
                                oModalPopup.closeDialog();
                            }
                        }, false);

                        // Collect fieldset.
                        eFieldset.appendChild(eLegend);
                        eFieldset.appendChild(eInputText);
                        eFieldset.appendChild(eInputSubmit);

                        eForm.appendChild(eFieldset);

                        return eForm;
                    }()));
                    // Shows the modal popup.
                    oModalPopup.open();
                }, false);

                // Click on "Chose NbrOfMessages"
                eAChoseNbrOfMessanges.addEventListener("click", function (e) {
                    e.preventDefault();
                    // Create the Modal Popup window.
                    var oModalPopup = new SVANTE.constructors.ModalPopup((function () {
                        var doc = document,
                            eForm = doc.createElement("form"),
                            eFieldset = doc.createElement("fieldset"),
                            eLegend = doc.createElement("legend"),
                            eInputText = doc.createElement("input"),
                            eInputSubmit = doc.createElement("input");

                        // Attributes and event listeners.
                        eLegend.innerHTML = "Välj antal visade meddelanden";
                        eInputText.className = "chose-nbrOfMessanges";
                        eInputText.type = "number";
                        eInputText.name = "chose-nbrOfMessanges";
                        eInputSubmit.type = "submit";
                        eInputSubmit.value = "Välj";
                        eInputSubmit.className = "submit-button";

                        // Change nbrOfMessages.
                        eInputSubmit.addEventListener("click", function (e) {
                            e.preventDefault();
                            if (eInputText.value.trim() === "" || isNaN(Number(eInputText.value.trim())) || Number(eInputText.value.trim()) > 500 || Number(eInputText.value.trim()) < 10) {
                                oModalPopup.closeDialog();
                            } else {
                                localStorage.chatNbrOfMessages = Number(eInputText.value.trim());
                                that.nbrOfMessages = localStorage.chatNbrOfMessages;
                                that.update();
                                oModalPopup.closeDialog();
                            }
                        }, false);

                        // Collect fieldset.
                        eFieldset.appendChild(eLegend);
                        eFieldset.appendChild(eInputText);
                        eFieldset.appendChild(eInputSubmit);

                        eForm.appendChild(eFieldset);

                        return eForm;
                    }()));
                    // Shows the modal popup.
                    oModalPopup.open();
                }, false);

                // Click on "UpdateInterval"
                eAUpdateInterval.addEventListener("click", function (e) {
                    e.preventDefault();
                    // Create the Modal Popup window.
                    var oModalPopup = new SVANTE.constructors.ModalPopup((function () {
                        var doc = document,
                            eForm = doc.createElement("form"),
                            eFieldset = doc.createElement("fieldset"),
                            eLegend = doc.createElement("legend"),
                            eSelect = doc.createElement("select"),
                            eOption1 = doc.createElement("option"),
                            eOption2 = doc.createElement("option"),
                            eOption3 = doc.createElement("option"),
                            eOption4 = doc.createElement("option"),
                            eInputSubmit = doc.createElement("input");

                        // The Oprions in the select box.
                        eLegend.innerHTML = "Välj Uppdateringsintervall"
                        eSelect.name = "interval";
                        eOption1.value = "10000";
                        eOption1.innerHTML = "10 sekunder";
                        eOption2.value = "15000";
                        eOption2.innerHTML = "15 sekunder";
                        eOption3.value = "30000";
                        eOption3.innerHTML = "30 sekunder";
                        eOption4.value = "60000";
                        eOption4.innerHTML = "1 minut";
                        eInputSubmit.type = "submit";
                        eInputSubmit.value = "Välj";
                        eInputSubmit.className = "sumbit-button"

                        // Change update interval.
                        eForm.addEventListener("submit", function (e) {
                            e.preventDefault();
                            localStorage.chatUpdateInterval = eSelect.value;
                            that.updateInterval = localStorage.chatUpdateInterval;
                            that.startUpdateInterval();
                            oModalPopup.closeDialog();
                        }, false);

                        eSelect.appendChild(eOption1);
                        eSelect.appendChild(eOption2);
                        eSelect.appendChild(eOption3);
                        eSelect.appendChild(eOption4);

                        eFieldset.appendChild(eLegend);
                        eFieldset.appendChild(eSelect);
                        eFieldset.appendChild(eInputSubmit);
                        eForm.appendChild(eFieldset)

                        return eForm;
                    }()));
                    // Shows the modal window.
                    oModalPopup.open();
                }, false);

                // Hides the menu.
                ePropertiesMenu.addEventListener("mouseleave", function (e) {
                    e.preventDefault();
                    eMenubar.children[0].children[1].children[0].className = "";
                    eMenubar.children[2].className += " hidden";
                }, false);

                // Collect the Properties dropdown menu.
                eAChoseUsername.appendChild(eTextChoseUsername);
                eAChoseNbrOfMessanges.appendChild(eTextChoseNbrOfMessanges);
                eAUpdateInterval.appendChild(eTextUpdateInterval);
                eLi1.appendChild(eAChoseUsername);
                eLi2.appendChild(eAChoseNbrOfMessanges);
                eLi3.appendChild(eAUpdateInterval);
                eUl.appendChild(eLi1);
                eUl.appendChild(eLi2);
                eUl.appendChild(eLi3);
                ePropertiesMenu.appendChild(eUl);

                return ePropertiesMenu;
            }()),

            // Creates the menu bar for the window.
            eMenubar = (function () {
                var eDivMenubar = doc.createElement("div"),
                    eUl = doc.createElement("ul"),
                    eLi1 = doc.createElement("li"),
                    eLi2 = doc.createElement("li"),
                    eAArchive = doc.createElement("a"),
                    eAProperties = doc.createElement("a"),
                    eTextArchive = doc.createTextNode("Arkiv"),
                    eTextProperties = doc.createTextNode("Inställningar");

                // Add attributes.
                eAArchive.href = "#";
                eAProperties.href = "#";
                eDivMenubar.className = "menu-bar";

                // Mouseover over Archive.
                eAArchive.addEventListener("mouseover", function (e) {
                    e.preventDefault();
                    eAProperties.className = eAProperties.className.replace(/ active/g, "");
                    eAProperties.className += " hidden";
                    eAArchive.className += " active";
                    eDropdownMenuProperties.className += " hidden";
                    eDropdownMenuArchive.className = eDropdownMenuArchive.className.replace(/ hidden/g, "");
                }, false);

                // Mouseover over Properties.
                eAProperties.addEventListener("mouseover", function (e) {
                    e.preventDefault();
                    eAArchive.className = eAProperties.className.replace(/ active/g, "");
                    eAArchive.className += " hidden";
                    eAProperties.className += " active";
                    eDropdownMenuArchive.className += " hidden";
                    eDropdownMenuProperties.className = eDropdownMenuProperties.className.replace(/ hidden/g, "");
                }, false);

                // A click hides the drowdown menues.
                eDivMenubar.addEventListener("click", function (e) {
                    e = e || window.event;
                    var hit = e.target;
                    if (hit === eAArchive) {
                        e.preventDefault();
                        eAArchive.className = eAArchive.className.replace(/ active/g, "");
                        eMenubar.children[1].className += " hidden";
                    } else {
                        e.preventDefault();
                        eAProperties.className = eAArchive.className.replace(/ active/g, "");
                        eMenubar.children[2].className += " hidden";
                    }
                }, false);

                // If the mouse leaves the window, all dropdown menues are hidden.
                that.windowHTML.addEventListener("mouseleave", function (e) {
                    e.preventDefault();
                    eMenubar.children[0].children[0].children[0].className = "";
                    eMenubar.children[1].className += " hidden";
                    eMenubar.children[0].children[1].children[0].className = "";
                    eMenubar.children[2].className += " hidden";
                }, false);

                // Collect the menu bar.
                eAProperties.appendChild(eTextProperties);
                eAArchive.appendChild(eTextArchive);
                eLi2.appendChild(eAProperties);
                eLi1.appendChild(eAArchive);
                eUl.appendChild(eLi1);
                eUl.appendChild(eLi2);
                eDivMenubar.appendChild(eUl);

                return eDivMenubar;
            }());

        // Adds menu-bar to window.
        eContentArea.parentNode.insertBefore(eMenubar, eContentArea);
        eMenubar.appendChild(eDropdownMenuArchive);
        eMenubar.appendChild(eDropdownMenuProperties);

        // Adds content to content area.
        eContentArea.appendChild(eOutputarea);
        eContentArea.appendChild(eInputarea);

        this.startUpdateInterval();
    };
};

SVANTE.constructors.AppWindowChat.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);

SVANTE.constructors.AppWindowChat.prototype.constructor = SVANTE.constructors.AppWindowChat;

SVANTE.constructors.AppWindowChat.prototype.renderMessage = function (xmlNode) {
    var doc = document,
        eMessageContainer = this.windowHTML.children[2].children[0],
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

    this.windowHTML.children[2].children[0].innerHTML = "";

    for (i = 0; i < p; i += 1) {
        this.renderMessage(xmlNodeList[i]);
    }
};

// Starts a new update interval.
SVANTE.constructors.AppWindowChat.prototype.startUpdateInterval = function () {
    var that = this;

    // Stops the old interval.
    if (this.iTimerUpdateID) {
        clearInterval(this.iTimerUpdateID);
    }

    this.update();

    this.iTimerUpdateID = setInterval(function () {
        that.update();
    }, this.updateInterval);
};

// Stops the updating of the feed. Called before canceling the window.
SVANTE.constructors.AppWindowChat.prototype.stopTimer = function () {
    clearInterval(this.iTimerUpdateID);
};

SVANTE.constructors.AppWindowChat.prototype.update = function () {
    var that = this,
        iTimeoutID,
        sURL;

    iTimeoutID = setTimeout(function () {
        that.createLoadAnimation();
    }, 100);

    if (typeof XDomainRequest !== "undefined") {
        sURL = "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php?history=" + that.nbrOfMessages;
        xdr = new XDomainRequest();
        xdr.contentType = "text/plain";
        // Handle the request-result when it arrives.
        xdr.onload = function () {
            that.messages = $.parseXML(xdr.responseText);
            that.renderMessages();
            clearTimeout(iTimeoutID);
            that.windowHTML.children[3].children[0].innerHTML = "Senast uppdaterad klockan " + new Date().toLocaleTimeString();
        };
        // Handle the result if an error occurs.
        xdr.onerror = function () {
            that.messages = (function () {
                var eP = document.createElement("p");
                eP.innerHTML = "Det inträffade ett fel. Data kunde inte hämtas från servern.";
                return eP;
            }());
            that.windowHTML.children[2].children[0].innerHTML = "";
            that.windowHTML.children[2].children[0].appendChild(that.messages);
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
            data: "history=" + that.nbrOfMessages,
            type: "get",
            crossdomain: true,
            // handle the request-result when it arrives.
            success: function (result) {
                var outputArea = that.windowHTML.children[2].children[0];
                that.messages = $.parseXML(result);
                that.renderMessages();
                // Scrolls to the bottom af the page.
                outputArea.scrollTop = outputArea.scrollHeight - outputArea.clientHeight;
            },
            // handle the result if an error occurs.
            error: function () {
                that.messages = (function () {
                    var eP = document.createElement("p");
                    eP.innerHTML = "Det inträffade ett fel. Data kunde inte hämtas från servern.";
                    return eP;
                }());
                that.windowHTML.children[2].children[0].innerHTML = "";
                that.windowHTML.children[2].children[0].appendChild(that.messages);
            },
            complete: function () {
                clearTimeout(iTimeoutID);
                that.windowHTML.children[3].children[0].innerHTML = "Senast uppdaterad klockan " + new Date().toLocaleTimeString();
            }
        });
    }
};

SVANTE.constructors.AppWindowChat.prototype.createLoadAnimation = function () {
    var eStatus = this.windowHTML.childNodes[3].childNodes[0],
        eImg = document.createElement("img");

    eImg.src = "img/ajax-loader.gif";
    eStatus.innerHTML = "";
    eStatus.appendChild(eImg);
};
"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowRSS = function (sStatus, iWidth, iHeight, iX, iY, sURL) {
	SVANTE.constructors.AppWindow.call(this, "AppWindowRSS", sStatus,
        iWidth, iHeight, iX, iY);

    // The Timer ID for the update interval.
	this.iTimerUpdateID = 0;

    // The HTML-code with the request result.
	this.rssHTML = null;

    // The URL the request is send to.
	this.URL = sURL;

    // The update interval in ms.
	this.interval = 60000;

    // Initiates the RSS-reader.
	this.init = function () {
	    var that = this,
	        eContentDiv = this.windowHTML.children[1],
	        doc = document,
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
	            eAUpdateNow.addEventListener("click", function () {
	                that.updateRSS();
	            }, false);

	            // Click on "Close".
	            eAClose.addEventListener("click", function () {
	                var sThisWindowID = that.windowHTML.id;
	                $("div#" + sThisWindowID + " div.top-bar a.close-icon img").trigger("click");
	            }, false);

	            // Hides the menu.
	            eArchiveMenu.addEventListener("mouseleave", function () {
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
                    eAUpdateInterval = doc.createElement("a"),
                    eAChoseSource = doc.createElement("a"),
                    eTextUpdateInterval = doc.createTextNode("Välj uppdateringsintervall"),
                    eTextChoseSource = doc.createTextNode("Välj RSS-källa");

	            // Add attributes.
	            eAChoseSource.href = "#";
	            eAUpdateInterval.href = "#";
	            ePropertiesMenu.className = "properties hidden";

	            // Click on "UpdateInterval"
	            eAUpdateInterval.addEventListener("click", function () {
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
	                    eOption1.value = "60000";
	                    eOption1.innerHTML = "1 minut";
	                    eOption2.value = "120000";
	                    eOption2.innerHTML = "2 minuter";
	                    eOption3.value = "300000";
	                    eOption3.innerHTML = "5 minuter";
	                    eOption4.value = "600000";
	                    eOption4.innerHTML = "10 minuter";
	                    eInputSubmit.type = "submit";
	                    eInputSubmit.value = "Välj";
                        eInputSubmit.className = "sumbit-button"

                        // On click on Submit.
	                    eForm.addEventListener("submit", function (e) {
	                        e.preventDefault();
	                        that.interval = eSelect.value;
	                        oModalPopup.closeDialog();
	                        that.startUpdateInterval();
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

	            // Click on "Chose source"
	            eAChoseSource.addEventListener("click", function () {
	                // Create the Modal Popup window.
	                var oModalPopup = new SVANTE.constructors.ModalPopup((function () {
	                    var doc = document,
                            eForm = doc.createElement("form"),
                            eFieldset1 = doc.createElement("fieldset"),
                            eLegend1 = doc.createElement("legend"),
                            eInputRadio1 = doc.createElement("input"),
                            eLabel1 = doc.createElement("label"),
                            eInputRadio2 = doc.createElement("input"),
                            eLabel2 = doc.createElement("label"),
                            eInputRadio3 = doc.createElement("input"),
                            eLabel3 = doc.createElement("label"),
                            eInputSubmit1 = doc.createElement("input"),
                            eFieldset2 = doc.createElement("fieldset"),
                            eLegend2 = doc.createElement("legend"),
                            eInputText = doc.createElement("input"),
                            eInputSubmit2 = doc.createElement("input");

                        // Attributes and event listeners in fieldset 1.
	                    eLegend1.innerHTML = "Välj ett RSS-flöde";
	                    eInputRadio1.className = "RSS-source";
	                    eInputRadio1.type = "radio";
	                    eInputRadio1.id = "Aftonbladet";
	                    eInputRadio1.name = "RSS-source";
	                    eInputRadio1.value = encodeURI("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=http://www.aftonbladet.se/rss.xml");
	                    eLabel1.innerHTML = "Aftonbladet<br />";
	                    eLabel1.setAttribute("for", "Aftonbladet");
	                    eInputRadio2.className = "RSS-source";
	                    eInputRadio2.type = "radio";
	                    eInputRadio2.id = "Dagens-Nyheter";
	                    eInputRadio2.name = "RSS-source";
	                    eInputRadio2.checked = true;
	                    eInputRadio2.value = encodeURI("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=http://www.dn.se/m/rss/senaste-nytt");
	                    eLabel2.innerHTML = "Dagens Nyheter<br />";
	                    eLabel2.setAttribute("for", "Dagens-Nyheter");
	                    eInputRadio3.className = "RSS-source";
	                    eInputRadio3.type = "radio";
	                    eInputRadio3.id = "Helsinki-Times";
	                    eInputRadio3.name = "RSS-source";
	                    eInputRadio3.value = encodeURI("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=http://www.helsinkitimes.fi/?format=feed&type=rss");
	                    eLabel3.innerHTML = "Helsinki Times";
	                    eLabel3.setAttribute("for", "Helsinki-Times");
	                    eInputSubmit1.type = "submit";
	                    eInputSubmit1.value = "Välj";
	                    eInputSubmit1.className = "submit-button";

                        // Chose predefined RSS-scources.
	                    eInputSubmit1.addEventListener("click", function (e) {
	                        e.preventDefault();
	                        that.URL = $("div#modalPopup form fieldset input[name=RSS-source]:checked").val();
	                        that.updateRSS();
	                        oModalPopup.closeDialog();
	                    }, false);

	                    // Attributes and event listeners in fieldset 2.
	                    eLegend2.innerHTML = "Välj ett eget RSS-flöde";
	                    eInputText.className = "own-defined-RSS-source";
	                    eInputText.type = "text";
	                    eInputText.name = "own-defined-RSS-source";
	                    eInputSubmit2.type = "submit";
	                    eInputSubmit2.value = "Välj";
	                    eInputSubmit2.className = "submit-button";

                        // If user wrote an own RSS-url.
	                    eInputSubmit2.addEventListener("click", function (e) {
	                        e.preventDefault();
	                        if (eInputText.value.trim() === "") {
	                            oModalPopup.closeDialog();
	                        } else {
	                            that.URL = encodeURI("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + eInputText.value.trim());
	                            console.log(that.URL);
	                            that.updateRSS();
	                            oModalPopup.closeDialog();
	                        }
	                    }, false);

                        // Collect fieldset 1.
	                    eFieldset1.appendChild(eLegend1);
	                    eFieldset1.appendChild(eInputRadio1);
	                    eFieldset1.appendChild(eLabel1);
	                    eFieldset1.appendChild(eInputRadio2);
	                    eFieldset1.appendChild(eLabel2);
	                    eFieldset1.appendChild(eInputRadio3);
	                    eFieldset1.appendChild(eLabel3);
	                    eFieldset1.appendChild(eInputSubmit1);

	                    // Collect fieldset 2.
	                    eFieldset2.appendChild(eLegend2);
	                    eFieldset2.appendChild(eInputText);
	                    eFieldset2.appendChild(eInputSubmit2);

	                    eForm.appendChild(eFieldset1);
	                    eForm.appendChild(eFieldset2);

	                    return eForm;
	                }()));
                    // Shows the modal popup.
	                oModalPopup.open();
	            }, false);

	            // Hides the menu.
	            ePropertiesMenu.addEventListener("mouseleave", function () {
	                eMenubar.children[0].children[1].children[0].className = "";
	                eMenubar.children[2].className += " hidden";
	            }, false);

                // Collect the Properties dropdown menu.
	            eAUpdateInterval.appendChild(eTextUpdateInterval);
	            eAChoseSource.appendChild(eTextChoseSource);
	            eLi2.appendChild(eAUpdateInterval);
	            eLi1.appendChild(eAChoseSource);
	            eUl.appendChild(eLi1);
	            eUl.appendChild(eLi2);
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
	            eAArchive.addEventListener("mouseover", function () {
	                eAProperties.className = eAProperties.className.replace(/ active/g, "");
	                eAProperties.className += " hidden";
	                eAArchive.className += " active";
	                eDropdownMenuProperties.className += " hidden";
	                eDropdownMenuArchive.className = eDropdownMenuArchive.className.replace(/ hidden/g, "");
	            }, false);

	            // Mouseover over Properties.
	            eAProperties.addEventListener("mouseover", function () {
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
	                    eAArchive.className = eAArchive.className.replace(/ active/g, "");
	                    eMenubar.children[1].className += " hidden";
	                } else {
	                    eAProperties.className = eAArchive.className.replace(/ active/g, "");
	                    eMenubar.children[2].className += " hidden";
	                }
	            }, false);

                // If the mouse leaves the window, all dropdown menues are hidden.
	            that.windowHTML.addEventListener("mouseleave", function () {
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
	    eContentDiv.parentNode.insertBefore(eMenubar, eContentDiv);
	    eMenubar.appendChild(eDropdownMenuArchive);
	    eMenubar.appendChild(eDropdownMenuProperties);

	    this.startUpdateInterval();

	};
};

SVANTE.constructors.AppWindowRSS.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowRSS.prototype.constructor = SVANTE.constructors.AppWindowRSS;

// Starts a new update interval.
SVANTE.constructors.AppWindowRSS.prototype.startUpdateInterval = function () {
    var that = this;

    // Stops the old interval.
    if (this.iTimerUpdateID) {
        clearInterval(this.iTimerUpdateID);
    }

    this.updateRSS();

    this.iTimerUpdateID = setInterval(function () {
        that.updateRSS();
    }, this.interval);
};

// Stops the updating of the feed. Called before canceling the window.
SVANTE.constructors.AppWindowRSS.prototype.stopTimer = function () {
    clearInterval(this.iTimerUpdateID);
};

// Sends a request to the server and shows the result in the window.
SVANTE.constructors.AppWindowRSS.prototype.updateRSS = function () {
    var that = this,
		iTimerID,
		date = new Date(),
		xdr;

    // Shows a load animation in the window frame.
    function createLoadAnimation() {
        var eStatus = that.windowHTML.childNodes[3].childNodes[0],
            eImg = document.createElement("img");

        eImg.src = "img/ajax-loader.gif";
        eStatus.appendChild(eImg);
    }

    // The animation is interupted or replaced when the axaj-request is ready.
    iTimerID = setTimeout(function () {
        createLoadAnimation();
    }, 100);

    // Calls and handle the ajax-request.
    // If IE9.
    if (typeof XDomainRequest !== "undefined") {
        xdr = new XDomainRequest();
        xdr.contentType = "text/plain";
        // Handle the request-result when it arrives.
        xdr.onload = function () {
            that.rssHTML = xdr.responseText;
            that.windowHTML.childNodes[2].innerHTML = that.rssHTML;
            clearTimeout(iTimerID);
            that.windowHTML.children[3].children[0].innerHTML = "Senast uppdaterad klockan " + date.toLocaleTimeString();
        };
        // Handle the result if an error occurs.
        xdr.onerror = function () {
            that.galleryHTML = (function () {
                var ep = doc.createElement("p");
                ep.innerHTML = "Det inträffade ett fel. Data kunde inte hämtas från servern.";
                return ep;
            }());
            that.windowHTML.childNodes[2].appendChild(that.galleryHTML);
            clearTimeout(iTimerID);
            that.windowHTML.children[3].children[0].innerHTML = "Senast uppdaterad klockan " + date.toLocaleTimeString();
        };
        xdr.open("get", that.URL);
        xdr.send(null);
        // All other browsers.
    } else {
        $.ajax({
            url: that.URL,
            crossDomain: true,
            // Handle the request-result when it arrives.
            success: function (result) {
                that.rssHTML = result;
                that.windowHTML.children[2].innerHTML = that.rssHTML;
            },
            // Handle the result if an error occurs.
            error: function () {
                that.rssHTML = (function () {
                    var eP = document.createElement("p");
                    eP.innerHTML = "Det inträffade ett fel. Data kunde inte hämtas.";
                    return eP;
                }());
                that.windowHTML.children[2].appendChild(that.rssHTML);
            },
            complete: function () {
                clearTimeout(iTimerID);
                that.windowHTML.children[3].children[0].innerHTML = "Senast uppdaterad klockan " + date.toLocaleTimeString();
            }
        });
    }
};
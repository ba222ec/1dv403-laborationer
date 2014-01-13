"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowMemory = function (iWidth, iHeight, iX, iY, iNumberOfMemorys) {
    SVANTE.constructors.AppWindow.call(this, iWidth, iHeight, iX, iY, false,  "Memory", "content memory", "img/theater_32x32.png", "");

    // Deletes all eventhandelers. Called before erasing the Memory-game. Prevent memory-leakage.
    this.deleteEventHandelers = function () {
        var aATags = this.windowHTML.getElementsByTagName("a"),
	        i;
        for (i = aATags.length - 1; i >= 0; i -= 1) {
            aATags[i].onclick = null;
        }
    };

    this.init = function (sSize) {
        var eContentDiv = this.windowHTML.children[1],
	        doc = document,
            sLatestSize = sSize,
            that = this,

            // Creates the archive dropdown menu.
	        eDropdownMenuArchive = (function () {
	            var eArchiveMenu = doc.createElement("div"),
                    eUl = doc.createElement("ul"),
                    eLi1 = doc.createElement("li"),
                    eLi2 = doc.createElement("li"),
                    eANewGame = doc.createElement("a"),
                    eAClose = doc.createElement("a"),
                    eTextNewGame = doc.createTextNode("Nytt spel"),
                    eTextClose = doc.createTextNode("Stäng");

	            // Add attributes.
	            eANewGame.href = "#";
	            eAClose.href = "#";
	            eArchiveMenu.className = "archive hidden";

                // Click on "New Game".
	            eANewGame.addEventListener("click", function () {
	                that.deleteEventHandelers();
	                eContentDiv.innerHTML = "";
	                eMenubar.parentNode.removeChild(eMenubar);
	                that.init(sLatestSize);
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
	            eANewGame.appendChild(eTextNewGame);
	            eLi2.appendChild(eAClose);
	            eLi1.appendChild(eANewGame);
	            eUl.appendChild(eLi1);
	            eUl.appendChild(eLi2);
	            eArchiveMenu.appendChild(eUl);

	            return eArchiveMenu;
	        }()),

            // Creates the properties dropdown menu.
            eDropdownMenuProperties = (function () {
                var ePropertiesMenu = doc.createElement("div"),
                    eUl = doc.createElement("ul"),
                    eLi1 = doc.createElement("li"),
                    eLi2 = doc.createElement("li"),
                    eLi3 = doc.createElement("li"),
                    eABigBoard = doc.createElement("a"),
                    eAMediumBoard = doc.createElement("a"),
                    eASmallBoard = doc.createElement("a"),
                    eTextBigBoard = doc.createTextNode("Stort spelbräde (4x4)"),
                    eTextmediumBoard = doc.createTextNode("Mellanstort bräde (3x4)"),
                    eTextSmallBoard = doc.createTextNode("Litet spelbräde (2x4)");

                // Add attributes.
                eABigBoard.href = "#";
                eAMediumBoard.href = "#";
                eASmallBoard.href = "#";
                ePropertiesMenu.className = "properties hidden";

                // Click on "Big Board"
                eABigBoard.addEventListener("click", function (e) {
                    e.preventDefault();
                    that.deleteEventHandelers();
                    eContentDiv.innerHTML = "";
                    eMenubar.parentNode.removeChild(eMenubar);
                    that.init("big");
                }, false);

                // Click on "Medium Board"
                eAMediumBoard.addEventListener("click", function (e) {
                    e.preventDefault();
                    that.deleteEventHandelers();
                    eContentDiv.innerHTML = "";
                    eMenubar.parentNode.removeChild(eMenubar);
                    that.init("medium");
                }, false);

                // Click on "Small Board"
                eASmallBoard.addEventListener("click", function (e) {
                    e.preventDefault();
                    that.deleteEventHandelers();
                    eContentDiv.innerHTML = "";
                    eMenubar.parentNode.removeChild(eMenubar);
                    that.init("small");
                }, false);

                // Hides the menu.
                ePropertiesMenu.addEventListener("mouseleave", function (e) {
                    e.preventDefault();
                    eMenubar.children[0].children[1].children[0].className = "";
                    eMenubar.children[2].className += " hidden";
                }, false);

                eABigBoard.appendChild(eTextBigBoard);
                eAMediumBoard.appendChild(eTextmediumBoard);
                eASmallBoard.appendChild(eTextSmallBoard);
                eLi3.appendChild(eABigBoard);
                eLi2.appendChild(eAMediumBoard);
                eLi1.appendChild(eASmallBoard);
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

                that.windowHTML.addEventListener("mouseleave", function (e) {
                    e.preventDefault();
                    eMenubar.children[0].children[0].children[0].className = "";
                    eMenubar.children[1].className += " hidden";
                    eMenubar.children[0].children[1].children[0].className = "";
                    eMenubar.children[2].className += " hidden";
                }, false);

                // Collect the structure.
                eAProperties.appendChild(eTextProperties);
                eAArchive.appendChild(eTextArchive);
                eLi2.appendChild(eAProperties);
                eLi1.appendChild(eAArchive);
                eUl.appendChild(eLi1);
                eUl.appendChild(eLi2);
                eDivMenubar.appendChild(eUl);

                return eDivMenubar;
            }());

        eContentDiv.id = "memoryBoard" + iNumberOfMemorys;
        eContentDiv.parentNode.insertBefore(eMenubar, eContentDiv);
        if (sSize === "big") {
            new SVANTE.constructors.Memory(eContentDiv.id, 4, 4, this).init();
        } else if (sSize === "medium") {
            new SVANTE.constructors.Memory(eContentDiv.id, 3, 4, this).init();
        } else if (sSize === "small") {
            new SVANTE.constructors.Memory(eContentDiv.id, 2, 4, this).init();
        }
        // Adds a event listener on the "start again"-button.
        eContentDiv.children[2].addEventListener("click", function () {
            that.deleteEventHandelers();
            eContentDiv.innerHTML = "";
            eMenubar.parentNode.removeChild(eMenubar);
            that.init(sLatestSize);
        }, false);

        eMenubar.appendChild(eDropdownMenuArchive);
        eMenubar.appendChild(eDropdownMenuProperties);
    };
};

SVANTE.constructors.AppWindowMemory.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowMemory.prototype.constructor = SVANTE.constructors.AppWindowMemory;
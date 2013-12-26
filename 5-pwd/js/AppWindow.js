"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindow = function (sWindowType, sName, iWidth, iHeight, iX, iY, sStatus) {

    var createBasicWindow = function (sName, sIconURL, sStatus, iWidth, iHeight, iX, iY) {
        var doc = document,
		    eDivWindow = doc.createElement("div"),
		    eDivTopBar = doc.createElement("div"),
		    eImgIcon = doc.createElement("img"),
		    ePName = doc.createElement("p"),
            ePText = doc.createTextNode(sName),
		    eAClose = doc.createElement("a"),
		    eImgCloseIcon = doc.createElement("img"),
		    eDivContent = doc.createElement("div"),
		    eDivBottomBar = doc.createElement("div"),
		    eStatus = doc.createElement("small"),
            eStatusText = doc.createTextNode(sStatus);

        // Add common classnames
        eDivWindow.className = "window";
        eDivWindow.style.top = iY + "px";
        eDivWindow.style.left = iX + "px";
        eDivWindow.style.width = iWidth + "px";
        eDivWindow.style.height = iHeight + "px";
        eDivTopBar.className = "top-bar";
        eImgIcon.src = sIconURL;
        eImgIcon.alt = sName;
        eAClose.href = "#";
        eAClose.title = "Stäng fönstret";
        eAClose.className = "close-icon";
        eImgCloseIcon.src = "img/close_32x32.png";
        eImgCloseIcon.alt = "Stäng fönstret";
        eDivContent.className = "content";
        eDivBottomBar.className = "bottom-bar";

        // Add to fragment
        ePName.appendChild(ePText);
        eAClose.appendChild(eImgCloseIcon);
        eDivTopBar.appendChild(eImgIcon);
        eDivTopBar.appendChild(ePName);
        eDivTopBar.appendChild(eAClose);
        eStatus.appendChild(eStatusText);
        eDivBottomBar.appendChild(eStatus);

        eDivWindow.appendChild(eDivTopBar);
        eDivWindow.appendChild(eDivContent);
        eDivWindow.appendChild(eDivBottomBar);

        return eDivWindow;
    };

    var createWindow = function (sWindowType, iWidth, iHeight, iX, iY) {
        switch (sWindowType) {
            case "AppWindowGallery":
                var window = createBasicWindow("Galleri",
                    "img/photography_32x32.png", "Skapades klockan 14:51", iWidth, iHeight, iX, iY);
                return window;
        }
    };

    this.name = sName;
    this.status = sStatus;
    this.height = iHeight;
    this.width = iWidth;
    this.windowHTML = createWindow(sWindowType, iWidth, iHeight, iX, iY);
};

SVANTE.constructors.AppWindow.prototype.testMethod = function () {
    console.log("Fönstret har storleken " + this.height + "x" + this.width);
};
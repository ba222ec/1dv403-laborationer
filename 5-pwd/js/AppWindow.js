"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindow = function (sWindowType, sStatus, iWidth, iHeight, iX, iY) {

    function createBasicWindow(sName, divContentClassname, sIconURL, sStatus, iWidth, iHeight, iX, iY) {
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
            eDivResize = doc.createElement("div");

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
        eDivContent.className = divContentClassname;
        eDivBottomBar.className = "bottom-bar";
        eStatus.innerHTML = sStatus;
        eDivResize.className = "resize";

        // Add to fragment
        ePName.appendChild(ePText);
        eAClose.appendChild(eImgCloseIcon);
        eDivTopBar.appendChild(eImgIcon);
        eDivTopBar.appendChild(ePName);
        eDivTopBar.appendChild(eAClose);
        eDivBottomBar.appendChild(eStatus);
        eDivBottomBar.appendChild(eDivResize);

        eDivWindow.appendChild(eDivTopBar);
        eDivWindow.appendChild(eDivContent);
        eDivWindow.appendChild(eDivBottomBar);

        return eDivWindow;
    }

    function createWindow(sStatus, sWindowType, iWidth, iHeight, iX, iY) {
        var eWindow = null;
        switch (sWindowType) {
            case "AppWindowGallery":
                eWindow = createBasicWindow("Galleri", "content gallery", "img/photography_32x32.png", sStatus, iWidth, iHeight, iX, iY);
                break;
            case "AppWindowPicture":
                eWindow = createBasicWindow("Bild", "content image", "img/photography_32x32.png", sStatus, iWidth, iHeight, iX, iY);
                break;
            case "AppWindowMemory":
                eWindow = createBasicWindow("Memory", "content memory", "img/theater_48x48.png", sStatus, iWidth, iHeight, iX, iY);
                break;
            case "AppWindowRSS":
                eWindow = createBasicWindow("RSS-läsare", "content rss", "img/publishing_48x48.png", sStatus, iWidth, iHeight, iX, iY);
                break;
        }
        return eWindow;
    }

    this.windowHTML = createWindow(sStatus, sWindowType, iWidth, iHeight, iX, iY);
};

SVANTE.constructors.AppWindow.prototype.testMethod = function () {
    console.log("Fönstret har storleken " + this.height + "x" + this.width);
};
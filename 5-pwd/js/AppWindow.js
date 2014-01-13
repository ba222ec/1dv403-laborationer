"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindow = function (iWidth, iHeight, iX, iY, bResizable, sName, divContentClassname, sIconURL, sStatus) {

    this.windowHTML = createWindow(iWidth, iHeight, iX, iY, bResizable, sName, divContentClassname, sIconURL, sStatus);
    // Creates the window.
    function createWindow(iWidth, iHeight, iX, iY, bResizable, sName, divContentClassname, sIconURL, sStatus) {
        var doc = document,
		    eDivWindow = doc.createElement("div"),
		    eDivTopBar = doc.createElement("div"),
		    eImgIcon = doc.createElement("img"),
		    ePName = doc.createElement("p"),
            ePText = doc.createTextNode(sName),
            eAFullscreen = null,
            eAImgFullscreenIcon = null,
		    eAClose = doc.createElement("a"),
		    eImgCloseIcon = doc.createElement("img"),
		    eDivContent = doc.createElement("div"),
		    eDivBottomBar = doc.createElement("div"),
		    eStatus = doc.createElement("small"),
            eDivResize = null;

        // Add common classnames
        eDivWindow.className = "window";
        eDivWindow.style.top = iY + "px";
        eDivWindow.style.left = iX + "px";
        eDivWindow.style.width = iWidth + "px";
        eDivWindow.style.height = iHeight + "px";
        eDivTopBar.className = "top-bar";
        eDivTopBar.style.cursor = "pointer";
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



        // Add to eDivWindow.
        ePName.appendChild(ePText);
        eAClose.appendChild(eImgCloseIcon);
        eDivTopBar.appendChild(eImgIcon);
        eDivTopBar.appendChild(ePName);
        eDivTopBar.appendChild(eAClose);
        eDivBottomBar.appendChild(eStatus);

        // If resizable.
        if (bResizable === true) {
            eAFullscreen = doc.createElement("a");
            eAImgFullscreenIcon = doc.createElement("img");
            eAFullscreen.href = "#";
            eAFullscreen.title = "Maximera fönstret";
            eAFullscreen.className = "maximize-icon";
            eAImgFullscreenIcon.src = "img/maximize-icon.png";
            eAImgFullscreenIcon.alt = "Maximera fönstret";
            eAFullscreen.appendChild(eAImgFullscreenIcon);
            eDivTopBar.appendChild(eAFullscreen);

            eDivResize = doc.createElement("div");
            eDivResize.className = "resize";
            eDivBottomBar.appendChild(eDivResize);
        }

        eDivWindow.appendChild(eDivTopBar);
        eDivWindow.appendChild(eDivContent);
        eDivWindow.appendChild(eDivBottomBar);

        return eDivWindow;
    }
};
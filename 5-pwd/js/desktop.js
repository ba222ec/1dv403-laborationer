// Creates all events in the application.

var SVANTE = SVANTE || {};

(function () {
    "use strict";

    var doc = document,
        win = window,
        desktopDiv = doc.getElementById("desktop"),
        iconbarDiv = doc.getElementById("iconbar"),
        // The first window get this positions.
        iStartX = 100,
        iStartY = 100,
        oDragging = null,
        oResizeing = null,
        iDiffX = 0,
        iDiffY = 0,
        iBrowserWidth = win.innerWidth,
        iBrowserHeight = win.innerHeight,
        iWindowMaxWidth = 200,
        iWindowMaxHeight = 200,

        // In this array all the windows are stored. Some methods to handle the windows are added here.
        aWindows = [];

    // Take away all windows from the desktop.
    function clearDesktop() {
        document.getElementById("desktop").innerHTML = "";
    }

    // Gives the given index in the aWindow-array focus (by adding a className) . 
    function giveFocus(iIndex) {
        var i,
            p = aWindows.length;
        for (i = 0; i < p; i += 1) {
            aWindows[i].windowHTML.className = aWindows[i].windowHTML.className.replace(" ontop", "");
        }
        aWindows[iIndex].windowHTML.className += " ontop";
    }

    // Show the given windowstructure on the desktop.
    function showWindow(oWindow) {
        var desktop = document.getElementById("desktop");
        desktop.appendChild(oWindow.windowHTML);
    }

    // Shows all the windows in the given array.
    function showWindows(aWindows) {
        var i,
            p = aWindows.length,
            setID = function (oWindow, sID) {
                oWindow.windowHTML.id = sID;
            };
        for (i = 0; i < p; i += 1) {
            // Before printing the window gets an unique ID.
            setID(aWindows[i], i + "window");
            showWindow(aWindows[i]);
        }
    }

    // All click events on the icon-bar.
    iconbarDiv.addEventListener("click", function (e) {
        e = e || window.event;
        e.preventDefault();

        var hit = e.target;

        // If user clicked on the camera icon.
        if (hit.parentNode.id === "open-gallery") {
            aWindows[aWindows.length] = new SVANTE.constructors.AppWindowGallery(350, 350, iStartX + aWindows.length * 20, iStartY + aWindows.length * 20);
            giveFocus(aWindows.length - 1);
            clearDesktop();
            // Show all windows.
            showWindows(aWindows);
        }
    }, false);

    // All click events on the desktopDiv.
    desktopDiv.addEventListener("click", function (e) {
        e = e || window.event;
        e.preventDefault();

        var hit = e.target,
            iIndex;

        // If user wants to close a window.
        if (hit.parentNode.className === "close-icon") {
            iIndex = parseInt(hit.parentNode.parentNode.parentNode.id, 10);
            aWindows.splice(iIndex, 1);
            clearDesktop();
            showWindows(aWindows);
            // If user wants to give a window focus and hits TopBar, Content or BottomBar.
        } else if (hit.className === "top-bar" || hit.className === "content" || hit.className === "bottom-bar") {
            iIndex = parseInt(hit.parentNode.id, 10);
            giveFocus(iIndex);
            // If user wants to give a window focus and hits icon or status.
        } else if (hit.parentNode.className === "top-bar" || hit.parentNode.className === "bottom-bar") {
            iIndex = parseInt(hit.parentNode.parentNode.id, 10);
            giveFocus(iIndex);
        }
    });

    // A part of the Drag and Drop.
    desktopDiv.addEventListener("mousedown", function (e) {
        e = e || window.event;
        e.preventDefault();
        var hit = e.target,
            iIndex;

        // If user holds the cursor over the top-bar.
        if (hit.className === "top-bar") {
            iIndex = parseInt(hit.parentNode.id, 10);
            giveFocus(iIndex);
            oDragging = hit.parentNode;
            iDiffX = e.clientX - oDragging.offsetLeft;
            iDiffY = e.clientY - oDragging.offsetTop;
            // If user holds the cursor over the name or the icon in the top-bar.
        } else if (hit.parentNode.className === "top-bar") {
            iIndex = parseInt(hit.parentNode.parentNode.id, 10);
            giveFocus(iIndex);
            oDragging = hit.parentNode.parentNode;
            iDiffX = e.clientX - oDragging.offsetLeft;
            iDiffY = e.clientY - oDragging.offsetTop;

            // If user hold the cursor over the south/east corner.
        } else if (hit.className === "resize") {
            iIndex = parseInt(hit.parentNode.parentNode.id, 10);
            giveFocus(iIndex);
            oResizeing = hit.parentNode.parentNode;
        }

    }, false);

    // A part of the Drag and Drop.
    desktopDiv.addEventListener("mousemove", function (e) {
        e = e || window.event;
        e.preventDefault();

        // Drag the window.
        if (oDragging !== null) {
            if (e.clientX - iDiffX <= 0 || e.clientX - iDiffX + oDragging.offsetWidth > iBrowserWidth) {
                // Empty!
            } else {
                oDragging.style.left = (e.clientX - iDiffX) + "px";
            }
            if (e.clientY - iDiffY <= 0 || e.clientY - iDiffY + oDragging.offsetHeight > iBrowserHeight) {
                // Empty!
            } else {
                oDragging.style.top = (e.clientY - iDiffY) + "px";
            }

            // Resize the window.
        } else if (oResizeing !== null) {
            if (e.clientX - oResizeing.offsetLeft < iWindowMaxWidth) {
                // Empty!
            } else {
                oResizeing.style.width = (e.clientX - oResizeing.offsetLeft) + "px";
            }
            if (e.clientY - oResizeing.offsetTop < iWindowMaxHeight) {
                // Empty!
            } else {
                oResizeing.style.height = (e.clientY - oResizeing.offsetTop) + "px";
            }
        }
    }, false);

    // A part of the Drag and Drop.
    desktopDiv.addEventListener("mouseup", function (e) {
        e = e || window.event;
        e.preventDefault();

        oResizeing = null;
        oDragging = null;
        iDiffX = 0;
        iDiffY = 0;
    }, false);

    // A part of the Drag and Drop.
    desktopDiv.addEventListener("mouseleave", function (e) {
        e = e || window.event;
        e.preventDefault();

        oResizeing = null;
        oDragging = null;
        iDiffX = 0;
        iDiffY = 0;
    }, false);
}());
// Creates all events in the application.
(function () {
    "use strict";

    var desktopDiv = document.getElementById("desktop"),
        iconbarDiv = document.getElementById("iconbar"),
        // The first window get this positions.
        iStartX = 100,
        iStartY = 100,
        dragging = null,
        diffX = 0,
        diffY = 0,
        // In this array all the windows are stored. Some methods to handle the windows are added here.
        oWindows = {
            aWindows: [],
            giveFocus: function (iIndex) {
                var i,
                p = this.aWindows.length;
                for (i = 0; i < p; i += 1) {
                    this.aWindows[i].windowHTML.className = this.aWindows[i].windowHTML.className.replace(" ontop", "");
                }
                this.aWindows[iIndex].windowHTML.className += " ontop";
            }
        };

    // All click events on the icon-bar.
    iconbarDiv.addEventListener("click", function (e) {
        e = e || window.event;
        e.preventDefault();

        var hit = e.target;

        // If user clicked on the camera icon.
        if (hit.parentNode.id === "open-gallery") {
            oWindows.aWindows[oWindows.aWindows.length] = new SVANTE.constructors.AppWindowGallery
                (350, 350, iStartX + oWindows.aWindows.length * 20, iStartY + oWindows.aWindows.length * 20);
            oWindows.giveFocus(oWindows.aWindows.length - 1);
            SVANTE.methods.desktopMethods.clearDesktop();
            // Show all windows.
            SVANTE.methods.desktopMethods.showWindows(oWindows.aWindows);
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
            oWindows.aWindows.splice(iIndex, 1);
            SVANTE.methods.desktopMethods.clearDesktop();
            SVANTE.methods.desktopMethods.showWindows(oWindows.aWindows);
        // If user wants to give a window focus and hits TopBar, Content or BottomBar.
        } else if (hit.className === "top-bar" || hit.className === "content" || hit.className === "bottom-bar") {
            iIndex = parseInt(hit.parentNode.id, 10);
            oWindows.giveFocus(iIndex);
        // If user wants to give a window focus and hits icon or status.
        } else if (hit.parentNode.className === "top-bar" || hit.parentNode.className === "bottom-bar") {
            iIndex = parseInt(hit.parentNode.parentNode.id, 10);
            oWindows.giveFocus(iIndex);
        }
    });

    // A part of the Drag and Drop.
    desktopDiv.addEventListener("mousedown", function (e) {
        e = e || window.event;
        e.preventDefault();
        var hit = e.target,
            iIndex;

        if (hit.className === "top-bar") {
            dragging = hit.parentNode;
            diffX = e.clientX - dragging.offsetLeft;
            diffY = e.clientY - dragging.offsetTop;
            iIndex = parseInt(dragging.id, 10);
            oWindows.giveFocus(iIndex);
        } else if (hit.parentNode.className === "top-bar") {
            dragging = hit.parentNode.parentNode;
            diffX = e.clientX - dragging.offsetLeft;
            diffY = e.clientY - dragging.offsetTop;
            iIndex = parseInt(dragging.id, 10);
            SVANTE.methods.desktopMethods.giveFocus(oWindows.aWindows, iIndex);
        }

    }, false);

    // A part of the Drag and Drop.
    desktopDiv.addEventListener("mousemove", function (e) {
        e = e || window.event;
        e.preventDefault();

        var hit = e.target;

        if (dragging !== null) {
            dragging.style.left = (e.clientX - diffX) + "px";
            dragging.style.top = (e.clientY - diffY) + "px";
        }
    }, false);

    // A part of the Drag and Drop.
    desktopDiv.addEventListener("mouseup", function (e) {
        e = e || window.event;
        e.preventDefault();

        dragging = null;
        diffX = 0;
        diffY = 0;

    }, false);
}());
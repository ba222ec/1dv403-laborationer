"use strict";

// Contains all methods used by the eventListeners.

var SVANTE = window.SVANTE || {};
SVANTE.methods = SVANTE.methods || {};

SVANTE.methods.desktopMethods = {

    // Take away all windows from the desktop.
    clearDesktop: function () {
        document.getElementById("desktop").innerHTML = "";
    },

    // Show the given windowstructure on the desktop.
    showWindow: function (oWindow) {
        var desktop = document.getElementById("desktop");
        desktop.appendChild(oWindow.windowHTML);
    },

    // Shows all the windows in the given array.
    showWindows: function (aWindows) {
        var i,
            p = aWindows.length,
            setID = function (oWindow, sID) {
                oWindow.windowHTML.id = sID;
            };
        for (i = 0; i < p; i += 1) {
            // Before printing the window gets an unique ID.
            setID(aWindows[i], i + "window");
            this.showWindow(aWindows[i]);
        }
    }
};
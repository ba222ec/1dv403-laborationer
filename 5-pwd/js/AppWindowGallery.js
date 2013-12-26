"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowGallery = function (iWidth, iHeight, iX, iY) {
    SVANTE.constructors.AppWindow.call(this, "AppWindowGallery", "Galleri",
        iWidth, iHeight, iX, iY, "Fönstret skapades klo 14:26");
};

SVANTE.constructors.AppWindowGallery.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowGallery.prototype.constructor = SVANTE.constructors.AppWindowGallery;
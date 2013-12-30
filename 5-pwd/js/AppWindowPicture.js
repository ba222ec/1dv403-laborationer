"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowPicture = function (sURL, iWidth, iHeight, iX, iY) {
    SVANTE.constructors.AppWindow.call(this, "AppWindowPicture", sURL,
        iWidth, iHeight, iX, iY);

    this.pictureHTML = function () {
        var eImg = document.createElement("img");
        eImg.src = sURL
        return eImg;
    }();

    this.init = function () {
        this.windowHTML.children[1].appendChild(this.pictureHTML);
    }
};

SVANTE.constructors.AppWindowPicture.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowPicture.prototype.constructor = SVANTE.constructors.AppWindowPicture;
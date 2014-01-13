"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowPicture = function (sURL, iWidth, iHeight, iX, iY) {
    var sStatus = sURL;

    SVANTE.constructors.AppWindow.call(this, iWidth, iHeight, iX, iY, false, "Bild", "content image", "img/photography_32x32.png", sStatus);

    this.init = function () {
        this.windowHTML.children[1].appendChild(this.pictureHTML);
    };

    this.pictureHTML = (function () {
        var eImg = document.createElement("img");
        eImg.src = sURL;
        return eImg;
    }());
};

SVANTE.constructors.AppWindowPicture.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowPicture.prototype.constructor = SVANTE.constructors.AppWindowPicture;
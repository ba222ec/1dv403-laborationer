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
        var that = this;
        that.windowHTML.children[1].appendChild(that.pictureHTML);
    }
};
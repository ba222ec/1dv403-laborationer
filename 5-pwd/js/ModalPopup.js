"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

// Creates a modal popupwindow. 
SVANTE.constructors.ModalPopup = function (eForm) {
    var doc = document,
        eBody = doc.body,
        that = this;

    // The HTML code for the popup window.
    this.dialogHTML = (function () {
        var eDiv = doc.createElement("div"),
            eDivOverlay = doc.createElement("div"),
            eDivModalPopup = doc.createElement("div"),
            eAClose = doc.createElement("a"),
            eCloseImg = doc.createElement("img");

        eDivOverlay.id = "overlay";
        eDivModalPopup.id = "modalPopup";
        eAClose.href = "#";
        eCloseImg.src = "img/close-icon.png";

        // Add event listener
        eAClose.addEventListener("click", function (e) {
            e.preventDefault();
            that.closeDialog();
        }, false);

        eAClose.appendChild(eCloseImg);
        eDivModalPopup.appendChild(eAClose);
        eDivModalPopup.appendChild(eForm);

        eDiv.appendChild(eDivOverlay);
        eDiv.appendChild(eDivModalPopup);

        return eDiv;
    }());

    // Shows the popup window.
    this.open = function () {
        eBody.insertBefore(this.dialogHTML, eBody.firstChild)
    };

    // Closes the popup window.
    this.closeDialog = function () {
        eBody.removeChild(eBody.firstChild);
    };
};
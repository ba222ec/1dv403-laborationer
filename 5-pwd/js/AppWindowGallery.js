"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowGallery = function (iWidth, iHeight, iX, iY) {
    // Initiates the superObject.
    SVANTE.constructors.AppWindow.call(this, "AppWindowGallery", "Galleri",
        iWidth, iHeight, iX, iY, "Fönstret skapades klo 14:26");

    // Add "gallery" to content-element
    this.windowHTML.childNodes[1].className += " gallery";

    var that = this,
        createGallery;

    /* These are created inside the function $.ajax().
    this.aPictures --> An array with pictures, from a distance server.
    this.galleryHTML --> The DOM structure for the Gallery. */

    // Creates the DOM structure for the Gallery.
    createGallery = function () {
        var doc = document,
			iHeight = 0,
			iWidth = 0,
			i,
			p = that.aPictures.length,
			galleryHTML = doc.createElement("ul"),
			li,
			a,
			img;

        // Get max height and width.
        for (i = 0; i < p; i += 1) {
            if (that.aPictures[i].thumbHeight > iHeight) {
                iHeight = that.aPictures[i].thumbHeight;
            }
            if (that.aPictures[i].thumbWidth > iWidth) {
                iWidth = that.aPictures[i].thumbWidth;
            }
        }

        // Creates and append the nodes.
        for (i = 0; i < p; i += 1) {
            // Creates DOM element.
            li = doc.createElement("li");
            a = doc.createElement("a");
            img = doc.createElement("img");

            // Creates attributes.
            li.style.height = iHeight + "px";
            li.style.width = iWidth + "px";
            a.href = "#";
            img.src = that.aPictures[i].thumbURL;

            // Append the elements.
            a.appendChild(img);
            li.appendChild(a);
            galleryHTML.appendChild(li);
        }

        // galleryHTML is the DOM structure.
        return galleryHTML;
    };

    // Calls and handle the ajax-request.
    $.ajax({
        url: "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/",
        success: function (result) {
            // Handle the request-result when it arrives.
            that.aPictures = JSON.parse(result);
            that.galleryHTML = createGallery();
            console.log(that.galleryHTML);
            that.windowHTML.childNodes[1].appendChild(that.galleryHTML);
        }
    });

};

SVANTE.constructors.AppWindowGallery.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowGallery.prototype.constructor = SVANTE.constructors.AppWindowGallery;
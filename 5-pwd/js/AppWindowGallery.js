"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowGallery = function (iWidth, iHeight, iX, iY) {
    // Initiates the superObject.
    SVANTE.constructors.AppWindow.call(this, iWidth, iHeight, iX, iY, true, "Galleri", "content gallery", "img/photography_32x32.png", "");

    // An array with all picture-objects. Ajax-request callback function assign the value.
    this.aPictures = null;

    // The HTML structure for the Gallery. Ajaxrequest callback function assign the value.
    this.galleryHTML = null;

    // A method that initiates the AppWindowGallery.
    this.init = function () {
        var that = this,
            doc = document,
            iTimerID;

        // Creates the DOM structure for the Gallery.
        function createGallery() {
            var iHeight = 0,
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
                li.className = "galleryPic";
                a.href = "#";
                img.src = that.aPictures[i].thumbURL;

                // Append the elements.
                a.appendChild(img);
                li.appendChild(a);
                galleryHTML.appendChild(li);
            }

            // galleryHTML is the DOM structure.
            return galleryHTML;
        }

        // Shows a load animation in the window frame.
        function createLoadAnimation() {
            var eStatus = that.windowHTML.childNodes[2].childNodes[0],
                eImg = doc.createElement("img");

            eImg.src = "img/ajax-loader.gif";
            eStatus.appendChild(eImg);
        }

        // The animation is interupted or replaced when the axaj-request is ready.
        iTimerID = setTimeout(function () {
            createLoadAnimation();
        }, 100);

        // Calls and handle the ajax-request.
        if (typeof XDomainRequest !== "undefined") {
            var xdr = new XDomainRequest();
            xdr.contentType = "text/plain";
            xdr.onload = function () {
                // Handle the request-result when it arrives.
                that.aPictures = JSON.parse(xdr.responseText);
                that.galleryHTML = createGallery();
                that.windowHTML.childNodes[1].appendChild(that.galleryHTML);
                clearTimeout(iTimerID);
                that.windowHTML.childNodes[2].childNodes[0].innerHTML = "";
            };
            xdr.onerror = function () {
                that.galleryHTML = (function () {
                    var eP = doc.createElement("p");
                    eP.innerHTML = "Det inträffade ett fel. Data kunde inte hämtas från servern.";
                    return eP;
                })();
                that.windowHTML.childNodes[1].appendChild(that.galleryHTML);
                clearTimeout(iTimerID);
                that.windowHTML.childNodes[2].childNodes[0].innerHTML = "";
            }
            xdr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/");
            xdr.send(null);
        } else {
            $.ajax({
                url: "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/",
                crossDomain: true,
                success: function (result) {
                    // Handle the request-result when it arrives.
                    that.aPictures = JSON.parse(result);
                    that.galleryHTML = createGallery();
                },
                error: function () {
                    that.galleryHTML = function () {
                        var eP = doc.createElement("p");
                        eP.innerHTML = "Det inträffade ett fel. Data kunde inte hämtas från servern.";
                        return eP;
                    }();
                },
                complete: function () {
                    that.windowHTML.childNodes[1].appendChild(that.galleryHTML);
                    clearTimeout(iTimerID);
                    that.windowHTML.children[2].children[0].innerHTML = "";

                    that.windowHTML.addEventListener("mouseover", function (e) {
                        var hit = e.target,
                            sBigPictureURL = null;

                        if (hit.parentNode.parentNode.className === "galleryPic" || hit.parentNode.className === "galleryPic") {
                            e.preventDefault();
                            if (hit.parentNode.parentNode.className === "galleryPic") {
                                sBigPictureURL = that.matchPicture(hit.src).URL;
                            } else {
                                sBigPictureURL = that.matchPicture(hit.children[0].src).URL;
                            }
                            that.windowHTML.children[2].children[0].innerHTML = sBigPictureURL;
                        } else {
                            that.windowHTML.children[2].children[0].innerHTML = "";
                        }
                    }, false);
                }
            });
        }

        // If right click on a thumbnail, context-menu isn't showed.
        this.windowHTML.addEventListener("contextmenu", function (e) {
            var hit = e.target;

            if (hit.parentNode.parentNode.className === "galleryPic") {
                e.preventDefault();
            }
        }, false);

        // If right click on a thumbnail, background picture is changed.
        this.windowHTML.addEventListener("mousedown", function (e) {
            var hit = e.target,
                sBigPictureURL = null;

            if (hit.parentNode.parentNode.className === "galleryPic") {
                e.preventDefault();
                if (e.which === 3) {
                    e.preventDefault();
                    sBigPictureURL = that.matchPicture(hit.src).URL;
                    doc.body.style.backgroundImage = "url(" + sBigPictureURL + ")";
                }
            }
        }, false);

        

    };
};

SVANTE.constructors.AppWindowGallery.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowGallery.prototype.constructor = SVANTE.constructors.AppWindowGallery;

// Returns the URL for the fullsize picture matching the thumbnail picture.
SVANTE.constructors.AppWindowGallery.prototype.matchPicture = function (sThumbURL) {
    var that = this;
    var iterations = Math.floor(this.aPictures.length / 8),
        leftover = this.aPictures.length % 8,
        i = 0,
        oPicture = null;

    // A faster way to loop through a big array.
    function process(i) {
        if (that.aPictures[i].thumbURL === sThumbURL) {
            oPicture = that.aPictures[i];
        }
    }
    if (leftover > 0) {
        do {
            process(i++);
            if (oPicture) {
                return oPicture;
            }
        } while (--leftover > 0);
    }
    do {
        process(i++);
        process(i++);
        process(i++);
        process(i++);
        process(i++);
        process(i++);
        process(i++);
        process(i++);
        if (oPicture) {
            return oPicture;
        }
    } while (--iterations > 0);
}
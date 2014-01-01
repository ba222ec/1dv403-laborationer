"use strict";
var SVANTE = SVANTE || {};

// Creates most of the events in the application.
SVANTE.Desktop = function () {

    // In this array all the windows are stored. Some methods to handle the windows are added here.
    this.aWindows = [];

    this.init = function () {
        var doc = document,
            win = window,
            desktopDiv = doc.getElementById("desktop"),
            iconbarDiv = doc.getElementById("iconbar"),
            // The first window get this positions.
            iWindowDefaultWidth = 350,
            iWindowDefaultHeight = 350,
            iStartX = 20,
            iStartY = 20,
            iNextX = iStartX,
            iNextY = iStartY,
            // Variables for Drag and Drop/Resizing.
            oDragging = null,
            oResizeing = null,
            iDiffX = 0,
            iDiffY = 0,
            iBrowserWidth = win.innerWidth,
            iBrowserHeight = win.innerHeight,
            iWindowMaxWidth = 200,
            iWindowMaxHeight = 200,
            // To "this"
            that = this,
            iNbrOfMemoryGames = 0;

        // Gives the given index in the aWindow-array focus (by adding a className) . 
        function giveFocus(iIndex) {
            var i,
                p = that.aWindows.length;
            for (i = 0; i < p; i += 1) {
                that.aWindows[i].windowHTML.className = that.aWindows[i].windowHTML.className.replace(" ontop", "");
            }
            that.aWindows[iIndex].windowHTML.className += " ontop";
        }

        // Returns the URL for the fullsize picture matching the thumbnail picture.
        function matchPicture(aPictures, sThumbURL) {
            var iterations = Math.floor(aPictures.length / 8),
                leftover = aPictures.length % 8,
                i = 0,
                oPicture = null;

            // A faster way to loop through a big array.
            function process(i) {
                if (aPictures[i].thumbURL === sThumbURL) {
                    oPicture = aPictures[i];
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

        // Deletes a given index from the window-array. 
        function removeWindow(iIndex) {
            that.aWindows[iIndex].windowHTML.parentNode.removeChild(that.aWindows[iIndex].windowHTML);
        }

        // Called my eventhandler "mouseup" and "mouseleave" to reset the used variables.
        function resetODraggingAndOResizeing() {
            oDragging = null;
            oResizeing = null;
            iDiffX = 0;
            iDiffY = 0;
        }

        // Sets the ID-attribute to a given window.
        function setID(oWindow, sID) {
            oWindow.windowHTML.id = sID;
        }

        // Sets cordinates for the next window.
        function setNextCordinates() {
            // Next windows X-cordinate.
            iNextX += 20;
            if (iNextX + iWindowDefaultWidth > iBrowserWidth) {
                iNextX = iStartX;
            }
            // Next windows Y-cordinate.
            iNextY += 20;
            if (iNextY + iWindowDefaultHeight > iBrowserHeight) {
                iNextY = iStartY;
            }
        }

        // Show the given window-structure on the desktop.
        function showWindow(oWindow) {
            // OBS!!!
            desktopDiv.appendChild(oWindow.windowHTML);
        }

        // All click events on the icon-bar.
        iconbarDiv.addEventListener("click", function (e) {
            e = e || window.event;
            e.preventDefault();

            var hit = e.target;

            if (hit.parentNode.className === "icons") {
                // If user clicked on the camera icon.
                if (hit.parentNode.id === "open-gallery") {
                    that.aWindows[that.aWindows.length] = new SVANTE.constructors.AppWindowGallery("", iWindowDefaultWidth, iWindowDefaultHeight, iNextX, iNextY);
                    that.aWindows[that.aWindows.length - 1].init();
                } else if (hit.parentNode.id === "open-memory") {
                    that.aWindows[that.aWindows.length] = new SVANTE.constructors.AppWindowMemory("", iWindowDefaultWidth, /*Special-size for memory.*/280, iNextX, iNextY, iNbrOfMemoryGames);
                    that.aWindows[that.aWindows.length - 1].init();
                    iNbrOfMemoryGames += 1;
                } else if (hit.parentNode.id === "open-rssfeed") {
                    that.aWindows[that.aWindows.length] = new SVANTE.constructors.AppWindowRSS("", iWindowDefaultWidth, iWindowDefaultHeight, iNextX, iNextY, "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url="+escape("http://www.dn.se/m/rss/senaste-nytt"));
                    that.aWindows[that.aWindows.length - 1].init();
                }
                setNextCordinates();
                setID(that.aWindows[that.aWindows.length - 1], that.aWindows.length - 1 + "window");
                giveFocus(that.aWindows.length - 1);
                // Show window.
                showWindow(that.aWindows[that.aWindows.length - 1]);
            }

        }, false);

        // All click events on the desktopDiv.
        desktopDiv.addEventListener("click", function (e) {
            e = e || window.event;
            e.preventDefault();

            var hit = e.target,
                iIndex,
                i = 0,
                p = 0,
                sImgSrc,
                sBigImgSrc,
                iWidth,
                iHeight,
                temp,
                temp2;

            // It user clicks on a thumbnail picture in a gallery window.
            if (hit.parentNode.parentNode.className === "galleryPic") {
                sImgSrc = hit.src;
                // If ctrlKey is pressed, the backgroundImage is changed.
                if (e.ctrlKey) {
                    iIndex = parseInt(hit.parentNode.parentNode.parentNode.parentNode.parentNode.id, 10);
                    giveFocus(iIndex);
                    sBigImgSrc = matchPicture(that.aWindows[iIndex].aPictures, sImgSrc).URL;
                    doc.body.style.backgroundImage = "url(" + sBigImgSrc + ")";
                } else {
                    iIndex = parseInt(hit.parentNode.parentNode.parentNode.parentNode.parentNode.id, 10);
                    temp = matchPicture(that.aWindows[iIndex].aPictures, sImgSrc);
                    sBigImgSrc = temp.URL;
                    
                    iWidth = temp.width + 24;
                    iHeight = temp.height + 65;

                    if (iHeight + iNextY > iBrowserHeight) {
                        temp = iNextY;
                        iNextY = 0;
                        if (iHeight > iBrowserHeight) {
                            iHeight = iBrowserHeight;
                        }
                    }
                    if (iWidth + iNextX > iBrowserWidth) {
                        temp2 = iNextX;
                        iNextX = 0;
                        if (iWidth > iBrowserWidth) {
                            iWidth = iBrowserWidth;
                        }
                    }
                    that.aWindows[that.aWindows.length] = new SVANTE.constructors.AppWindowPicture(sBigImgSrc, iWidth, iHeight, iNextX, iNextY);
                    that.aWindows[that.aWindows.length - 1].init();
                    if (iNextY === 0) {
                        iNextY = temp;
                    }
                    if (iNextX === 0) {
                        iNextX = temp2;
                    }
                    setNextCordinates();
                    setID(that.aWindows[that.aWindows.length - 1], that.aWindows.length - 1 + "window");
                    giveFocus(that.aWindows.length - 1);
                    // Show window.
                    showWindow(that.aWindows[that.aWindows.length - 1]);

                }
            // If user wants to close a window.
            } else if (hit.parentNode.className === "close-icon") {
                iIndex = parseInt(hit.parentNode.parentNode.parentNode.id, 10);
                if (typeof that.aWindows[iIndex].stopTimer !== "undefined") {
                    that.aWindows[iIndex].stopTimer();
                }
                removeWindow(iIndex);
                that.aWindows.splice(iIndex, 1);
                for (i = 0, p = that.aWindows.length; i < p; i += 1) {
                    setID(that.aWindows[i], i + "window");
                }
                // If user wants to give a window focus and hits TopBar, Content or BottomBar. If user wants to give a window focus and hits icon or status.
            } else if (hit.className === "top-bar" || hit.className === "content" || hit.className === "bottom-bar" || hit.parentNode.className === "top-bar" || hit.parentNode.className === "bottom-bar") {
                if (hit.className === "top-bar" || hit.className === "content" || hit.className === "bottom-bar") {
                    iIndex = parseInt(hit.parentNode.id, 10);
                } else {
                    iIndex = parseInt(hit.parentNode.parentNode.id, 10);
                }
                giveFocus(iIndex);
            }
        });

        // A part of the Drag and Drop and Resize.
        desktopDiv.addEventListener("mousedown", function (e) {
            e = e || window.event;
            e.preventDefault();
            var hit = e.target,
                iIndex;

            // If user holds the cursor over the top-bar.
            if (hit.className === "top-bar" || hit.parentNode.className === "top-bar") {
                if (hit.className === "top-bar") {
                    iIndex = parseInt(hit.parentNode.id, 10);
                    oDragging = hit.parentNode;
                } else {
                    iIndex = parseInt(hit.parentNode.parentNode.id, 10);
                    oDragging = hit.parentNode.parentNode;
                }
                giveFocus(iIndex);
                iDiffX = e.clientX - oDragging.offsetLeft;
                iDiffY = e.clientY - oDragging.offsetTop;
                // If user hold the cursor over the south/east corner.
            } else if (hit.className === "resize") {
                iIndex = parseInt(hit.parentNode.parentNode.id, 10);
                giveFocus(iIndex);
                oResizeing = hit.parentNode.parentNode;
            }
        }, false);

        // A part of the Drag and Drop and Resize.
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
                iDiffX = e.clientX - oDragging.offsetLeft;
                iDiffY = e.clientY - oDragging.offsetTop;
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

        // A part of the Drag and Drop and Resize.
        desktopDiv.addEventListener("mouseup", function (e) {
            e = e || window.event;
            e.preventDefault();

            resetODraggingAndOResizeing();
        }, false);

        // A part of the Drag and Drop and Resize.
        desktopDiv.addEventListener("mouseleave", function (e) {
            e = e || window.event;
            e.preventDefault();

            resetODraggingAndOResizeing();
        }, false);
    };
};

// The last statement to be executed before user interaction.
window.onload = function () {
    new SVANTE.Desktop().init();
};
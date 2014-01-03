"use strict";

var SVANTE = window.SVANTE || {};
SVANTE.constructors = SVANTE.constructors || {};

SVANTE.constructors.AppWindowRSS = function (sStatus, iWidth, iHeight, iX, iY, sURL) {
	SVANTE.constructors.AppWindow.call(this, "AppWindowRSS", sStatus,
        iWidth, iHeight, iX, iY);

	var iTimerUpdateID;

	this.rssHTML = null;

	this.URL = sURL;

	this.interval = 300000;

    // Stops the updating of the feed. Called before canceling the window.
	this.stopTimer = function () {
		clearTimeout(iTimerUpdateID);
	};

	this.init = function () {
		var that = this,
			iTimerID,
			date = new Date(),
			xdr;

		// Shows a load animation in the window frame.
		function createLoadAnimation() {
			var eStatus = that.windowHTML.childNodes[2].childNodes[0],
                eImg = document.createElement("img");

			eImg.src = "img/ajax-loader.gif";
			eStatus.appendChild(eImg);
		}

		// The animation is interupted or replaced when the axaj-request is ready.
		iTimerID = setTimeout(function () {
			createLoadAnimation();
		}, 100);

		// Calls and handle the ajax-request.
		// If IE9.
		if (typeof XDomainrequest !== "undefined") {
			xdr = new XDomainrequest();
			xdr.contenttype = "text/plain";
		    // Handle the request-result when it arrives.
			xdr.onload = function () {
				that.rssHTML = xdr.responsetext;
				that.windowhtml.childnodes[1].innerhtml = that.rssHTML;
				cleartimeout(iTimerID);
				that.windowHTML.children[2].children[0].innerHTML = "Senast uppdaterad klockan " + date.toLocaleTimeString();
			};
            // Handle the result if an error occurs.
			xdr.onerror = function () {
				that.galleryhtml = (function () {
					var ep = doc.createelement("p");
					ep.innerhtml = "Det inträffade ett fel. data kunde inte hämtas från servern.";
					return ep;
				}());
				that.windowHTML.childnodes[1].appendChild(that.galleryhtml);
				clearTimeout(iTimerID);
				that.windowHTML.children[2].children[0].innerHTML = "Senast uppdaterad klockan " + date.toLocaleTimeString();
			};
			xdr.open("get", sURL);
			xdr.send(null);
			// All other browsers.
		} else {
			$.ajax({
				url: sURL,
				crossDomain: true,
			    // Handle the request-result when it arrives.
				success: function (result) {
					that.rssHTML = result;
					that.windowHTML.children[1].innerHTML = that.rssHTML;
				},
			    // Handle the result if an error occurs.
				error: function () {
					that.rssHTML = (function () {
						var eP = document.createElement("p");
						eP.innerHTML = "Det inträffade ett fel. Data kunde inte hämtas.";
						return eP;
					}());
					that.windowHTML.children[1].appendChild(that.rssHTML);
				},
				complete: function () {
					clearTimeout(iTimerID);
					that.windowHTML.children[2].children[0].innerHTML = "Senast uppdaterad klockan " + date.toLocaleTimeString();
				}
			});
		}

		// A interval, updates the rss-feed. Stoped by stopTimer-method on the object.
		iTimerUpdateID = setTimeout(function () {
			that.init();
		}, that.interval);
	};
};

SVANTE.constructors.AppWindowRSS.prototype = Object.create(SVANTE.constructors.AppWindow.prototype);
SVANTE.constructors.AppWindowRSS.prototype.constructor = SVANTE.constructors.AppWindowRSS;